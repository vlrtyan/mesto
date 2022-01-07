import { nameField, descriptionField, avatarLinkField } from '../utils/constants.js';

export default class UserInfo {
    constructor({ userNameSelector, profileDescriptionSelector, avatarSelector }){
        this._userNameSelector = userNameSelector;
        this._profileDescriptionSelector = profileDescriptionSelector;
        this._avatarSelector = avatarSelector;
    }

    getUserInfo(data){
        const userInfo = {name:'name', description:'description', avatar: '#'};
        userInfo[userInfo.name] = data.name;
        userInfo[userInfo.description] = data.about;
        userInfo[userInfo.avatar] = data.avatar;
        return userInfo;
    }

    setUserInfo(newUserInfo){
        newUserInfo = {
            name: nameField.value,
            description: descriptionField.value
        };
        this._userNameSelector.textContent = newUserInfo.name
        this._profileDescriptionSelector.textContent = newUserInfo.description;
    }

    setNewAvatar(data){
        this._avatarSelector.setAttribute('src', data.avatar);
    }

    updateUserInfo(data){
        this._userNameSelector.textContent = data.name;
        this._profileDescriptionSelector.textContent = data.about;
        this._avatarSelector.setAttribute('src', data.avatar);
    }
}