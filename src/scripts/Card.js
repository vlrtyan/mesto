export default class Card {
    constructor(data, templateSelector, {handleCardClick, handleCardDelete, handleCardLike}, userID){
        this._handleCardClick = handleCardClick;
        this._handleCardDelete = handleCardDelete;
        this._handleCardLike = handleCardLike;
        this._templateSelector = templateSelector;
        this._name = data.name;
        this._link = data.link;
        this._likeCounter = data.likes;
        this.delete = this.delete.bind(this);
        this.like = this.like.bind(this);
        this._handleDeleteButtonVisibility = this._handleDeleteButtonVisibility.bind(this);
        this._userID = userID;
        this._cardOwner = data.owner._id;
    }

    _getTemplate() {
        const cardElement = document
          .querySelector(this._templateSelector)
          .content
          .querySelector('.element')
          .cloneNode(true);

        return cardElement;
      }

    _setEventListeners(){
        this._element.querySelector('.element__like-button').addEventListener('click', this._handleCardLike);
        this._image.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link)});
    }

    _handleDeleteButtonVisibility(){
        this._deleteButton = this._element.querySelector('.element__delete-button');
        if (this._userID != this._cardOwner) {
            // НЕ МОЯ КАРТА
            this._deleteButton.remove();
            this._deleteButton.removeEventListener('click', this.delete);
        } else {
            // МОЯ КАРТА
            this._element.querySelector('.element__delete-button').addEventListener('click', this._handleCardDelete);
        }
    }

    _likeButtonStatus(){
        if (this._likeCounter.some(like => like._id === this._userID)) {
            this._element.querySelector('.element__like-button').classList.add('element__like-button_clicked');
        }
    }

    like(){
        this._element.querySelector('.element__like-button').classList.toggle('element__like-button_clicked');
    }

    delete(){
        this._element.remove();
    }

    updateNumberOfLikes(newData){
        this._likeCounter = newData.likes;
        this._element.querySelector('.element__like-counter').innerText = this._likeCounter.length;
    }
    
    generateCard(){
        this._element = this._getTemplate();
        this._image = this._element.querySelector('.element__image');
        this._setEventListeners();
        this._element.querySelector('.element__title').innerText = this._name;
        this._image.setAttribute('src', this._link);
        this._image.setAttribute('alt', this._name);
        this._element.querySelector('.element__like-counter').innerText = this._likeCounter.length;
        this._handleDeleteButtonVisibility();
        this._likeButtonStatus();
        
        return this._element;
    }
}


