export default class UserID{
    constructor(){

    }

    getUserID(){
        return {
            id: this.userID,
            name: this.userName,
            about: this.userAbout
        }
    }

    setUserID(data){
        if (data){
            this.userID = data._id;
            this.userName = data.name;
            this.userAbout = data.about;
        }
    }
}