class Api{
    constructor({url, token}){
        this.url = url;
        this.token = token;
    }

    getUserData(){
        return fetch(`${this.url}/users/me`, {
            headers: {
                authorization: this.token;
            }
        })
        .then(res => {
            if (res.ok){
                return res.json();
            } else {
                return Promise.reject(`Ошибка: ${res.status}`);
            }
        }) 
    }

    getInitialCards(){
        
    }
}

export default Api