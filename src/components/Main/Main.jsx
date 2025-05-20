import React, { useState, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Card from "../Main/components/Card/Card";
import avatarPlaceholder from "../../images/avatar.png";
import editAvatarIcon from "../../images/edit-avatar.png";
import editIcon from "../../images/editar.png";
import addIcon from "../../images/agregar.png";

import EditProfilePopup from "./components/forms/EditProfile/EditProfile";
import AddCardPopup from "./components/forms/NewCard/NewCard";
import EditAvatarPopup from "./components/forms/Avatar/EditAvatar";
import ImagePopup from "./components/forms/ImagePopup/ImagePopup";
import ConfirmDeletePopup from "./components/forms/RemoveCard/RemoveCard";

import api from "../../utils/Api";

function Main({ cards, setCards }) {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isAddCardOpen, setIsAddCardOpen] = useState(false);
  const [isEditAvatarOpen, setIsEditAvatarOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);
  const [cardToDelete, setCardToDelete] = useState(null);

  const openEditProfilePopup = () => setIsEditProfileOpen(true);
  const openAddCardPopup = () => setIsAddCardOpen(true);
  const openEditAvatarPopup = () => setIsEditAvatarOpen(true);
  const openImagePopup = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  };
  const openConfirmDeletePopup = (card) => {
    setCardToDelete(card);
    setIsConfirmDeleteOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditProfileOpen(false);
    setIsAddCardOpen(false);
    setIsEditAvatarOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmDeleteOpen(false);
    setSelectedCard(null);
    setCardToDelete(null);
  };

  const handleUpdateUser = (userInfo) => {
    setIsLoading(true);
    api.updateUserInfo(userInfo)
      .then(updatedUser => {
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const handleUpdateAvatar = (data) => {
    setIsLoading(true);
    api.updateAvatar(data.avatar)
      .then(updatedUser => {
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const handleAddCard = (newCardData) => {
    setIsLoading(true);
    api.addCard(newCardData)
      .then(card => {
        setCards([card, ...cards]);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const handleCardDelete = () => {
    if (!cardToDelete) return;

    setIsLoading(true);
    api.deleteCard(cardToDelete._id)
      .then(() => {
        setCards(cards.filter(c => c._id !== cardToDelete._id));
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const handleCardLike = (card) => {
    const isLiked = !!card.isLiked;

    api.changeLikeCardStatus(card._id, !isLiked)
      .then(updatedCard => {
        setCards(cards.map(c => c._id === card._id ? updatedCard : c));
      })
      .catch(console.error);
  };

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img
            src={currentUser.avatar || avatarPlaceholder}
            alt="foto de perfil"
            className="profile__avatar"
            id="avatar"
            loading="lazy"
          />
          <button className="profile__avatar-edit-icon" onClick={openEditAvatarPopup}>
            <img src={editAvatarIcon} alt="Icono editar" />
          </button>
        </div>

        <div className="profile__info">
          <div>
            <p className="profile__info-name" id="name">{currentUser.name}</p>
            <img
              className="profile__edit-button"
              src={editIcon}
              alt="Icono editar perfil"
              id="edit-button"
              onClick={openEditProfilePopup}
            />
          </div>
          <p className="profile__info-ocupation" id="about">{currentUser.about}</p>
          <img
            src={addIcon}
            alt="icono adicionar informacion"
            className="profile__add-button"
            onClick={openAddCardPopup}
          />
        </div>
      </section>

      <section className="cards">
        <ul className="cards__container">
          {cards.map(card => (
            <Card
              key={card._id}
              card={card}
              onClick={() => openImagePopup(card)}
              onDelete={() => openConfirmDeletePopup(card)}
              onLike={() => handleCardLike(card)}
              currentUserId={currentUser._id}
            />
          ))}
        </ul>
      </section>

      {/* Popups */}
      <EditProfilePopup
        isOpen={isEditProfileOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        isLoading={isLoading}
        user={currentUser}
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
        onConfirmDelete={handleCardDelete}
        isLoading={isLoading}
      />
    </main>
  );
}

export default Main;