'use strict'

class Bot {
    /**
     *
     * @param login
     */
    constructor(login = "none"){
        this.login = login;
    }

    /**
     *
     * @param login
     */
    setLogin(login){
        this.login = login;
    }

    /**
     *
     * @returns {string}
     */
    getLogin(){
        return this.login;
    }

    /**
     *
     * @returns {number}
     */
    getCurTime(){
        return Math.floor(new Date() / 1000);
    }
}
module.exports = Bot;
