import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({ handleAddClick, handleCardClick, clothingItems }) {
  return (
    <div className="clothes-section">
      <div className="clothes__button">
        <p className="clothes-section__text">Your Items</p>
        <button
          className="clothes-section__add-button"
          onClick={handleAddClick}
          type="button"
        >
          + Add New
        </button>
      </div>
      <ul className="clothes-section__items">
        {clothingItems.map((item) => {
            return (
                <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
                />
            )
        })}
      </ul>
    </div>
  );
}
export default ClothesSection;
