import { nameField, descriptionField } from '../utils/constants.js';

export default class UserInfo {
    constructor({ userNameSelector, profileDescriptionSelector, avatarSelector }){
        this._userNameSelector = userNameSelector;
        this._profileDescriptionSelector = profileDescriptionSelector;
        this._avatarSelector = avatarSelector;
    }

    getUserInfo(){
        const userInfo = {name:'name', description:'description'};
        userInfo[userInfo.name] = this._userNameSelector.textContent; 
        userInfo[userInfo.description] = this._profileDescriptionSelector.textContent;
        return userInfo;
    }

    setUserInfo(data){
        this._userNameSelector.textContent = data.name;
        this._profileDescriptionSelector.textContent = data.about;
    }

    setUserAvatar(data){
        this._avatarSelector.setAttribute('src', data.avatar);
    }
}