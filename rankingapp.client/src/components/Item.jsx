import PropTypes from 'prop-types';

const Item = ({ item, drag, itemImgObj }) => {


    return (
        <div className="unranked-cell" key={`item-${item.id}`}>
            <img
                id={`item-${item.id}`}
                src={itemImgObj.image}
                alt={item.name}
                style={{ cursor: "pointer" }}
                draggable="true"
                onDragStart={drag}
            />
        </div>
    );
};

Item.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
    drag: PropTypes.func.isRequired,
    itemImgObj: PropTypes.string.isRequired,
};

export default Item;
