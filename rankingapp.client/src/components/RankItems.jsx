import { useEffect, useState } from 'react';
import MovieImageArr from './MovieImages.js';
import '../custom.css'
import RankingGrid from './RankingGrid';


const RankItems = () => {

    const [items, setItems] = useState([]);
    const dataType = 1; 

    //function Reload() {
    //    setReload(true);
    //}

    function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }

    function allowDrop(ev) {
        ev.preventDefault();
    }

    function drop(ev) {

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

    useEffect(() => {
        fetch(`item/${dataType}`).then((results) => {
            return results.json();
        }).then(data => {
            setItems(data);
        });

    }, []);

    //console.log(MovieImageArr, "logging MovieImaages Arer");

    return (
        <main>
            <RankingGrid items={items} imgArr={MovieImageArr} drag={drag} allowDrop={allowDrop} drop={drop} />
            <div className="items-not-ranked">
                {
                    //(items !== null) ? items.map((item) => <h3 key={item.id}>{item.title}</h3>) : <div>Loading..</div>                    
                    items.length > 0 ? (
                        items.map((item) => (
                            <div className="unranked-cell" key={`item-${item.id}`}>
                                <img
                                    id={`item-${item.id}`}
                                    src={MovieImageArr.find((o) => o.id === item.imageId)?.image}
                                    alt={item.name}
                                    style={{ cursor: "pointer" }}
                                    draggable="true"
                                    onDragStart={drag}
                                />
                            </div>
                        ))
                    ) : (
                        <div>Loading...</div>
                    )
                }
            </div>

        </main>

    )

}
export default RankItems;