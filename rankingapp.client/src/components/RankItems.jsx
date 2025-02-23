import { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import RankingGrid from "./RankingGrid";
import ItemCollection from "./ItemCollection";

const RankItems = ({ items, setItems, dataType, imgArr, localStorageKey }) => {

    const [reload, setReload] = useState(false);

    const Reload = () => {
        setReload(true);
    }

    const drag = (ev) => {
        ev.dataTransfer.setData("text", ev.target.id);
    }

    const allowDrop = (ev) => {
        ev.preventDefault();
    }

    const drop = (ev) => {
        ev.preventDefault();
        const targetElm = ev.target;
        if (targetElm.nodeName === "IMG") {
            return false;
        }
        if (targetElm.childNodes.length === 0) {
            var data = parseInt(ev.dataTransfer.getData("text").substring(5));
            const transformedCollection = items.map((item) => (item.id === parseInt(data)) ?
                { ...item, ranking: parseInt(targetElm.id.substring(5)) } : { ...item, ranking: item.ranking });
            setItems(transformedCollection);
        }
    }

    const getDataFromApi = useCallback(() => {
        fetch(`item/${dataType}`)
            .then((results) => {
                return results.json();
            })
            .then(data => {
                setItems(data);
            })
    }, [dataType, setItems]);

    useEffect(() => {
        if (items == null) {
            getDataFromApi();
        }
    }, [dataType, getDataFromApi, items]);

    useEffect(() => {
        if (items != null) {
            localStorage.setItem(localStorageKey, JSON.stringify(items));
        }
        setReload(false);
    }, [items, localStorageKey]);

    useEffect(() => {
        if (reload === true) {
            getDataFromApi();
        }
    }, [reload, getDataFromApi]);

    return (
        (items != null) ?
            <main>
                <RankingGrid items={items} imgArr={imgArr} drag={drag} allowDrop={allowDrop} drop={drop} />
                <ItemCollection items={items} drag={drag} imgArr={imgArr} />
                <button onClick={Reload} className="reload" style={{ "marginTop": "10px" }}> <span className="text" >Reload</span > </button>
            </main>
            : <main>Loading...</main>
    )
}

RankItems.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        name: PropTypes.string.isRequired,
        ranking: PropTypes.number.isRequired,
        imageId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    })).isRequired,
    setItems: PropTypes.func.isRequired,
    dataType: PropTypes.string.isRequired,
    imgArr: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        src: PropTypes.string.isRequired,
    })).isRequired,
    localStorageKey: PropTypes.string.isRequired,
};

export default RankItems;
