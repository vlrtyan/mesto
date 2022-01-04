export default class UserID{
    constructor(){

    }

    getUserID(){
        return {
            userID: this._userID
        }
    }

    setUserID(data){
        if (data){
            this._userID = data._id;
            this._userName = data.name;
        }
    }
}