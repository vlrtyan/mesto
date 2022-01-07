import { nameField, descriptionField } from '../utils/constants.js';

export default class UserInfo {
    constructor({ userNameSelector, profileDescriptionSelector, avatarSelector }){
        this._userNameSelector = userNameSelector;
        this._profileDescriptionSelector = profileDescriptionSelector;
        this._avatarSelector = avatarSelector;
    }

    getUserInfo(){
        const userInfo = {name:'name', description:'description'};
        userInfo[userInfo.name] = nameField.value;
        userInfo[userInfo.description] = descriptionField.value;
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

    updateUserInfo(data){
        this._userNameSelector.textContent = data.name;
        this._profileDescriptionSelector.textContent = data.about;
        this._avatarSelector.setAttribute('src', data.avatar);
    }
}