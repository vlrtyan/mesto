import { nameField, descriptionField } from '../utils/constants.js';

export default class UserInfo {
    constructor({ userNameSelector, profileDescriptionSelector }){
        this._userNameSelector = userNameSelector;
        this._profileDescriptionSelector = profileDescriptionSelector;
    }

    getUserInfo(){
        const userInfo = {name:'name', description:'description'};
        userInfo[userInfo.name] = this._userNameSelector.textContent;
        userInfo[userInfo.description] = this._profileDescriptionSelector.textContent;
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
}