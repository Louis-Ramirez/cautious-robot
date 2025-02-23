import { useState } from 'react';
import PropTypes from 'prop-types';
import RankItems from './RankItems';
import '../custom.css'

const RankItemsContainer = ({ dataType, imgArr }) => {
    const albumLocalStorageKey = "albums";
    const movieLocalStorageKey = "movies";

    let localStorageKey = "";

    const [albumItems, setAlbumItems] = useState(JSON.parse(localStorage.getItem(albumLocalStorageKey)));
    const [movieItems, setMovieItems] = useState(JSON.parse(localStorage.getItem(movieLocalStorageKey)));

    let data = [];
    let setFunc = null;

    if (dataType === 1) {
        data = movieItems;
        setFunc = setMovieItems;
        localStorageKey = movieLocalStorageKey;
    } else if (dataType === 2) {
        data = albumItems;
        setFunc = setAlbumItems;
        localStorageKey = albumLocalStorageKey;
    }

    return (
        <RankItems items={data} setItems={setFunc} dataType={dataType} imgArr={imgArr} localStorageKey={localStorageKey} />
    );
};

RankItemsContainer.propTypes = {
    dataType: PropTypes.oneOf([1, 2]).isRequired,
    imgArr: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        src: PropTypes.string.isRequired,
    })).isRequired,
};

export default RankItemsContainer;
