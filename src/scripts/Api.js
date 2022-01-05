import { data } from "autoprefixer";

class Api{
    constructor({url, token}){
        this.url = url;
        this.token = token;
    }

    getUserData(){
        return fetch(`${this.url}/users/me`, {
            headers: {
                authorization: this.token
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
        return fetch(`${this.url}/cards/`, {
            headers: {
                authorization: this.token
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

    editUserData(data){
        return fetch(`${this.url}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                about: data.about
              })
        })
        .then(res => {
            if (res.ok){
                return res.json();
            } else {
                return Promise.reject(`Ошибка: ${res.status}`);
            }
        }) 
    }

    addNewItem(data){
        return fetch(`${this.url}/cards`, {
            method: 'POST',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
        .then(res => {
            if (res.ok){
                return res.json();
            } else {
                return Promise.reject(`Ошибка: ${res.status}`);
            }
        })
    }

    deleteCard(data){
        return fetch(`${this.url}/cards/${data._id}`, {
            method: 'DELETE',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
              },
        })
        .then(res => {
            if (res.ok){
                return res.json();
            } else {
                return Promise.reject(`Ошибка: ${res.status}`);
            }
        })
    }
    
}

export default Api