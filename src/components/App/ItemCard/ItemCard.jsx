import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(item);
  }
  return (
    <div className="card">
      <p className="card__name">{item.name}</p>
      <img
        onClick={handleCardClick}
        src={item.imageUrl}
        alt={item.name}
        className="card__img"
      />
    </div>
  );
}

export default ItemCard;
