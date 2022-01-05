export default class Card {
    constructor(data, templateSelector, {handleCardClick, handleCardDelete}, userID){
        this._handleCardClick = handleCardClick;
        this._handleCardDelete = handleCardDelete;
        this._templateSelector = templateSelector;
        this._name = data.name;
        this._link = data.link;
        this._likeCouner = data.likes;
        this.delete = this.delete.bind(this);
        this._like = this._like.bind(this);
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

    delete(){
        this._element.remove();
    }
    _like(){
        this._element.querySelector('.element__like-button').classList.toggle('element__like-button_clicked');
    }

    _setEventListeners(){
        this._element.querySelector('.element__like-button').addEventListener('click', this._like);
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
    
    generateCard(){
        this._element = this._getTemplate();
        this._image = this._element.querySelector('.element__image');
        this._setEventListeners();
        this._element.querySelector('.element__title').innerText = this._name;
        this._image.setAttribute('src', this._link);
        this._image.setAttribute('alt', this._name);
        this._element.querySelector('.element__like-counter').innerText = this._likeCouner.length;
        this._handleDeleteButtonVisibility();
        
        return this._element;
    }
}


