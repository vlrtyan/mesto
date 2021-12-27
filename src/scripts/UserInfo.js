export default class UserInfo {
    constructor({ userNameSelector, profileDescriptionSelector }){
        this._userNameSelector = userNameSelector;
        this._profileDescriptionSelector = profileDescriptionSelector;
    }

    check(){
        console.log(this._userNameSelector, this._profileDescriptionSelector);
    }

    getUserInfo(){
        const userInfo = {};
        userInfo[0] = this._userNameSelector.value;
        userInfo[1] = this._profileDescriptionSelector.textContent;
        return userInfo;
    }

    setUserInfo(newUserInfo){
        newUserInfo = {
            name: document.querySelector('.name-popup__input_type_name').value,
            description: document.querySelector('.name-popup__input_type_description').value
        };
        // this._userNameSelector.textContent = newUserInfo[0].value;
        // this._contentInfoSelector.textContent = newUserInfo[1].value;
        document.querySelector('.profile__name').textContent = newUserInfo.name
        document.querySelector('.profile__description').textContent = newUserInfo.description;
    }
}