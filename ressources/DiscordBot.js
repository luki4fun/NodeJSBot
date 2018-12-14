'use strict';
const Bot = require('./Bot.js');
const Discord = require('discord.io');      // https://izy521.gitbooks.io/discord-io/content/
const prefix = ("[Discord] [%s] ").blue;

const sprintf = require('sprintf-js').sprintf,
    vsprintf = require('sprintf-js').vsprintf;
const in_array = require('in_array');
const request = require('request');

class DiscordBot extends Bot{
    /**
     *
     * @param ADMIN
     * @param token
     */
    constructor (ADMIN, token){
        super();
        this.ADMIN = ADMIN;    // potential hardcoded SUPER ADMIN User
        this.token = token;
        this._bot = {};
    }
    /**
     *
     */
    connect(){
        this.setLogin(this._bot.username);
        console.log(sprintf(prefix, this.login) + "Bot connected");
    }
    /**
     *
     * @param channel
     * @param user
     * @param message
     * @param userObj
     */
    chat(channel, user, message, userObj){
        if(message === "!ping") {
            this._bot.sendMessage({ to: channel, message: 'Pong!' });
        }
        if(message === "!login"){
            this._bot.sendMessage({ to: channel, message: 'Login as: ' + this.login });
        }
    }
    /**
     *
     * @returns {Promise<void>}
     */
    async run(){
        let _self = this;
        this._bot = new Discord.Client({
            token: this.token,
            autorun: true
        });
        this._bot.connect();
        this._bot.on('ready', function (evt) {
            _self.connect();
        });
        this._bot.on('message', function (user, userID, channelID, message, evt) {
            _self.chat(channelID, userID, message, user);
        });
    }

}
module.exports = DiscordBot;
