class Card {
    constructor(name, link){
        this._name = name;
        this._link = link;
        this._view = document.querySelector('.template').content.querySelector('.element').cloneNode(true);
        this._delete = this._delete.bind(this);
        this._like = this._like.bind(this)
    }

    _delete(){
        this._view.remove();
    }
    _like(){
        this._view.querySelector('.element__like-button').classList.toggle('element__like-button_clicked');
    }   
    
    generateCard(){
        //this._item = this._getTemplate();
        this._view.querySelector('.element__title').innerText = this._name;
        this._view.querySelector('.element__image').setAttribute('src', this._link);
        this._view.querySelector('.element__image').setAttribute('alt', this._name);
        this._view.querySelector('.element__like-button').addEventListener('click', this._like);
        this._view.querySelector('.element__delete-button').addEventListener('click', this._delete);
        //this._view.querySelector('.element__image').addEventListener('click', openImagePopup);
        return this._view;
    }
}

export default Card;