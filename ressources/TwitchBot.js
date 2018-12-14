'use strict';
const Bot = require('./Bot.js');
const tmi = require('tmi.js');              // http://tmi.twitch.tv/group/user/finalbosstv/chatters
const Twitch = require('twitch-js');        // https://twitch-devs.github.io/twitch-js/docs/getting-started
const prefix = ("[Twitch]  [%s] ").magenta;

const sprintf = require('sprintf-js').sprintf,
    vsprintf = require('sprintf-js').vsprintf;
const in_array = require('in_array');
const request = require('request');

class TwitchBot extends Bot{
    /**
     *
     * @param ADMIN
     * @param login
     * @param oAuthKey
     * @param channels
     * @param twitchAPI
     * @param isMaster
     */
    constructor (ADMIN, login, oAuthKey, channels, twitchAPI, isMaster = false){
        super(login);
        this.ADMIN = ADMIN;             // potential hardcoded SUPER ADMIN User
        this.oAuthKey = oAuthKey;
        this.channels = channels;
        this.isMaster = isMaster;       // can used to handle master & slave bots when multiple bots are located in one channel
        this.twitchAPI = twitchAPI;
        this._bot = {};
    }

    /**
     *
     */
    connect(){
        console.log(sprintf(prefix, this._bot.username) + "Bot connected");
    }

    /**
     *
     * @param channel
     * @param user
     * @param message
     */
    chat(channel, user, message){
        let _channel = channel.substr(1, channel.length); // removing the '#' from channel name
        if(message === "!ping") {
            this._bot.say(channel, "pong!");
        }
        if(message === "!login"){
            this._bot.say(channel, 'Login as: ' + this.login);
        }
    }

    /**
     *
     * @returns {Promise<void>}
     */
    async run(){
        let _self = this;
        this._bot = new Twitch.client({
             options: { debug: false, clientId: this.login },
             connection: { cluster: "aws", reconnect: true },
             identity: { username: this.login, password: this.oAuthKey },
             channels: this.channels
        });
        this._bot.connect();
        this._bot.on('connected', function (address, port) {
            _self.connect();
        });
        this._bot.on('chat', function (channel, user, message, self) {
            _self.chat(channel, user, message);
        });
    }

}
module.exports = TwitchBot;
