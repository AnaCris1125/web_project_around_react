import React from "react";
// import trashIcon from "../../../../images/trash.svg";
// import likeIcon from "../../../../images/group.svg";
// import activeLike from "../../../../images/active.png";


function Card({ name, link, liked, onDelete, onLike, onClick }) {
    return (
        <li className="cards__item">
            <button className="cards__item-delete" onClick={onDelete}>
            </button>
            <img className="cards__item-img" src={link} alt={name} onClick={onClick} />
            <div className="cards__item-info">
                <p className="cards__item-name">{name}</p>
                <button
                    className={`cards__item-like ${liked ? 'cards__item-like_active' : ''}`}
                    onClick={onLike}
                ></button>
            </div>
        </li>
    );
}

export default Card;