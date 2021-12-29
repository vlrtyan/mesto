export default class Card {
    constructor(name, link, templateSelector, handleCardClick){
        this._handleCardClick = handleCardClick;
        this._templateSelector = templateSelector;
        this._name = name;
        this._link = link;
        this._image = this._element.querySelector('.element__image');
        this._delete = this._delete.bind(this);
        this._like = this._like.bind(this);
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
    
    generateCard(){
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.element__title').innerText = this._name;
        this._image.setAttribute('src', this._link);
        this._image.setAttribute('alt', this._name);
        
        return this._element;
    }
}


