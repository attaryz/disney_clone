const Card = ({ thumbnail }) => {
  return (
    <div>
      <img className="card" src={thumbnail.url} />
    </div>
  );
};
export default Card;
