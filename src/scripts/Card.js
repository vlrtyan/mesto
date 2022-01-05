export default class Card {
    constructor(data, templateSelector, handleCardClick, userID){
        this._handleCardClick = handleCardClick;
        //this._handleDeleteCard = handleDeleteCard;
        this._templateSelector = templateSelector;
        this._name = data.name;
        this._link = data.link;
        this._likeCouner = data.likes;
        this._delete = this._delete.bind(this);
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

    _delete(){
        this._element.remove();
    }
    _like(){
        this._element.querySelector('.element__like-button').classList.toggle('element__like-button_clicked');
    }

    _setEventListeners(){
        this._element.querySelector('.element__like-button').addEventListener('click', this._like);
        this._element.querySelector('.element__delete-button').addEventListener('click', this._delete);
        this._image.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link)});
    }

    _handleDeleteButtonVisibility(){
        this._deleteButton = this._element.querySelector('.element__delete-button');
        if (this._userID === this._cardOwner) {
            console.log('Моя карта');
        } else {
            this._deleteButton.remove();
            this._deleteButton.removeEventListener('click', this._delete);
            console.log ('Не моя карта');
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
        //console.log(this._userID, this._cardOwner)
        
        return this._element;
    }
}


