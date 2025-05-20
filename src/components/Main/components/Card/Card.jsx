import React from "react";

function Card({ card, onDelete, onLike, onClick }) {
    const isLiked = card.isLiked;
   

    return (
        <li className="cards__item">
            <button className="cards__item-delete" onClick={() => onDelete(card)} />

            <img
                className="cards__item-img"
                src={card.link}
                alt={card.name}
                onClick={() => onClick(card)}
            />

            <div className="cards__item-info">
                <p className="cards__item-name">{card.name}</p>
                <button
                    className={`cards__item-like ${isLiked ? "cards__item-like_active" : ""}`}
                    onClick={() => onLike(card)}
                ></button>
            </div>
        </li>
    );
}

export default Card;
