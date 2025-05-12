import React, { useState } from "react";
import Card from "../Main/components/Card/Card";
import avatar from "../../images/avatar.png";
import editavatar from "../../images/edit-avatar.png";
import edit from "../../images/editar.png";
import agregar from "../../images/agregar.png";
import EditProfilePopup from "./components/forms/EditProfile/EditProfile";
import AddCardPopup from "./components/forms/NewCard/NewCard";
import EditAvatarPopup from "./components/forms/Avatar/EditAvatar";
import ImagePopup from "./components/forms/ImagePopup/ImagePopup";
import ConfirmDeletePopup from "./components/forms/RemoveCard/RemoveCard";

function Main() {
  const [cards, setCards] = useState([
    {
      name: "Valle de Yosemite",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
      liked: false
    },
    {
      name: "Lago Louise",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
      liked: false
    },
    {
      name: "Montañas Calvas",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/bald-mountains.jpg",
      liked: false
    },
    {
      name: "Latemar",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/latemar.jpg",
      liked: false
    },
    {
      name: "Parque Nacional de la Vanoise",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/vanoise.jpg",
      liked: false
    },
    {
      name: "Lago di Braies",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/lago.jpg",
      liked: false
    }
  ]);

  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false); // Estado para EditProfile
  const [isAddCardOpen, setIsAddCardOpen] = useState(false); // Estado para AddCard
  const [isEditAvatarOpen, setIsEditAvatarOpen] = useState(false); // Estado para EditAvatar
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false); // Estado para ImagePopup
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false); // Estado para ConfirmDeletePopup
  const [isLoading, setIsLoading] = useState(false); // Estado para isLoading

  const [selectedCard, setSelectedCard] = useState(null); // Para pasar la tarjeta seleccionada al ImagePopup

  const openEditProfilePopup = () => {
    console.log("Abriendo EditProfilePopup");
    setIsEditProfileOpen(true);
  }
   
  const openAddCardPopup = () => setIsAddCardOpen(true);
  const openEditAvatarPopup = () => setIsEditAvatarOpen(true);
  const openImagePopup = () => setIsImagePopupOpen(true);
  const openConfirmDeletePopup = () => setIsConfirmDeleteOpen(true);

  const closeAllPopups = () => {
    setIsEditProfileOpen(false);
    setIsAddCardOpen(false);
    setIsEditAvatarOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmDeleteOpen(false);
  };

  const handleAddCard = (newCard) => {
    setIsLoading(true);
    setTimeout(() => {
      setCards([newCard, ...cards]);
      setIsLoading(false);
      closeAllPopups();
    }, 1000);
  };

  const handleUpdateUser = (userInfo) => {
    setIsLoading(true);
    setTimeout(() => {
      setUser({ ...user, name: userInfo.name, about: userInfo.about });
      setIsLoading(false);
      closeAllPopups();
    }, 1000);
  };

  const handleUpdateAvatar = (avatarLink) => {
    setIsLoading(true);
    setTimeout(() => {
      setUser({ ...user, avatar: avatarLink });
      setIsLoading(false);
      closeAllPopups();
    }, 1000);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  };

  const handleConfirmDelete = () => {
    const updatedCards = [...cards];
    updatedCards.splice(selectedCard, 1); 
    setCards(updatedCards);
    closeAllPopups(); 
  };

  const [user, setUser] = useState({
    name: "Jacques Costeau",
    about: "Explorador",
    avatar: ""
  });
  

  const handleDelete = (index) => {
    setSelectedCard(index); 
    setIsConfirmDeleteOpen(true); 
  };

  const handleLike = (index) => {
    const updatedCards = [...cards];
    updatedCards[index].liked = !updatedCards[index].liked; 
    setCards(updatedCards);
  };

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img
            src={user.avatar || avatar} 
            alt="foto de perfil"
            className="profile__avatar"
            id="avatar"
            loading="lazy"
          />
          <button className="profile__avatar-edit-icon">
            <img src={editavatar} alt="Icono editar" onClick={openEditAvatarPopup} />
          </button>
        </div>

        <div className="profile__info">
          <div>
            <p className="profile__info-name" id="name">{user.name}</p>
            <img
              className="profile__edit-button"
              src={edit}
              alt="Icono editar perfil"
              id="edit-button"
              onClick={openEditProfilePopup}
            />
          </div>
          <p className="profile__info-ocupation" id="about">{user.about}</p>
          <img
            src={agregar}
            alt="icono adicionar informacion"
            className="profile__add-button"
            onClick={openAddCardPopup}
          />
        </div>
      </section>

      <section className="cards">
        <ul className="cards__container">
            {cards.map((card, index) => (
              <Card
                key={index}
                name={card.name}
                link={card.link}
                liked={card.liked}
                onDelete={() => handleDelete(index)}
                onLike={() => handleLike(index)}
                onClick={() => handleCardClick(card)} 
              />
            ))}
          </ul>
      </section>

      <EditProfilePopup
      isOpen={isEditProfileOpen}
      onClose={closeAllPopups}
      onUpdateUser={handleUpdateUser}
      isLoading={isLoading}
      user={user}
    />

    <AddCardPopup
      isOpen={isAddCardOpen}
      onClose={closeAllPopups}
      onAddCard={handleAddCard}
      isLoading={isLoading}
    />

    <EditAvatarPopup
      isOpen={isEditAvatarOpen}
      onClose={closeAllPopups}
      onUpdateAvatar={handleUpdateAvatar}
      isLoading={isLoading}
    />

    <ImagePopup
      isOpen={isImagePopupOpen}
      onClose={closeAllPopups}
      card={selectedCard}
    />

    <ConfirmDeletePopup
      isOpen={isConfirmDeleteOpen}
      onClose={closeAllPopups}
      onConfirmDelete={handleConfirmDelete}
      isLoading={isLoading}
    />
    </main>
  );
}

export default Main;