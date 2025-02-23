
import PropTypes from 'prop-types';
import Item from './Item';

const ItemCollection = ({ items, drag, imgArr }) => {

    return (
        <div className="items-not-ranked">
            {
                items.map((item) => (item.ranking === 0)
                    ? <Item key={`item-${item.id}`} item={item} drag={drag}
                        itemImgObj={imgArr.find(o => o.id === item.imageId)} />
                    : null)
            }
        </div>
    )
};

ItemCollection.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        name: PropTypes.string.isRequired,
        ranking: PropTypes.number.isRequired,
        imageId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    })).isRequired,
    drag: PropTypes.func.isRequired,
    imgArr: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        src: PropTypes.string.isRequired,
    })).isRequired,
};

export default ItemCollection;
