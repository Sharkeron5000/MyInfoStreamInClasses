const getRandomNumber = (min, max) => Math.round(Math.random() * (max - min) + min);

// class Game {
//     /** @type {Set<Streamer>} - Игры в которые играют стримеры*/
//     _streamerList = new Set();
//     /** @type {Set<User>} - Игры, которые смотрят зрители*/
//     _userList = new Set();

//     constructor(params) {
//         this.name = params.name;
//         this.info = params.info;
//         this._streamerList = params.streamerList || this._streamerList;
//         this._userList = params._userList || this._userList;
//     }

//     get streamerList() { return Array.from(this._streamerList) };
//     get userList() { return Array.from(this._userList) };

//     /** 
//     Добавить стримера в список игр
//     @param {Streamer} streamer - стример
//     */
//     addStreamerOnline(streamer) {
//         this._streamerList.add(streamer);
//     }
//     /** 
//     Удалить стримера, из списка игр
//     @param {Streamer} streamer - стример
//     */
//     deleteStreamerOnline(streamer) {
//         this._streamerList.delete(streamer);
//     }

//     /** 
//     Добавить зрителя, в список игр
//     @param {User} user - юзер
//     */
//     addUserViewGame(user) {
//         this._userList.add(user);
//     }
//     /** 
//     Удалить зрителя, из списка игр
//     @param {User} user - юзер
//     */
//     deleteUserViewGame(user) {
//         this._userList.delete(user);
//     }
// }

class Stream {
    constructor (params) {
        this.gameName = params.gameName;
        // this.time = new Date();
        this.streamer = params.streamer;
        this.game = params.game;
    }
}

//  

class StreamPlatform {
    /** @type {Set<Streamer>} - Список запущенных стримов*/
    _listOnline = new Set();
    /** @type {Set<Game} - Список игр которые есть на платформе*/
    _gameList = new Set();

    constructor(param) {
        this.name = param.name;
        this._url = `${param.url}/`;
        this.game = '';
        this._listOnline = param.listOnline || this._listOnline;
        this._gameList = param.gameList || this._gameList;
    };

    get listOnline() { return Array.from(this._listOnline) }
    get gameList() { return Array.from(this._gameList) }

    /** 
    выводит ссылку на главную страницу платформы
    @param url - ссылка платформы
     */
    get url() { return this._url; }
    set url(value) { this._url = `${value}/` }

    /** 
    Добавить стримера в список
    @param {Streamer} streamer - стример
    */
    OnStream(streamer) {
        this._listOnline.add(streamer);

    }
    /** 
    Удалить стримера из списка
    @param {Streamer} streamer - стример 
    */
    OffStream(streamer) {
        this._listOnline.delete(streamer);
    }

    /** 
    Добавить игру в список
    @param {Game} gameName - название игры
    */
    addGame(gameName) {
        if (!this.gameList.map(key => key.name).includes(gameName.name)) { this._gameList.add(gameName); }
    }
    /**
    Удалить игру из списка
    @param {Game} gameName - название игры
    */
    deleteGame(gameName) {
        this._gameList.delete(gameName);
    }
}

class User {
    /** @type {Set<Streamer>} список на кого зафолловлен юзер*/
    _followerList = new Set();
    /** @type {Set<Streamer>} список на кого подписан юзер*/
    _subscriberList = new Set();
    /** @type {Set<StreamPlatform>} платформы на которых зарегистрирован юзер*/
    _platformList = new Set();

    constructor(param) {
        this.name = param.name;
        this._view = '';
        this._followerList = param.followerList || this._followerList;
        this._subscriberList = param.subscriberList || this._subscriberList;
        this._platformList = param.platformList || this._platformList;
        this.game = '';
    }

    get followerList() { return Array.from(this._followerList) }
    get subscriberList() { return Array.from(this._subscriberList) }
    get platformList() { return Array.from(this._platformList) }

    /** 
    Вывести фразу от юзера
    @param word - Фраза*/
    sayWord(word) {
        console.log(word);
    }

    /** 
    Добавить платформу, в которой присутствует юзер
    @param {StreamPlatform} platform - платформа
    */
    addPlatform(platform) {
        this._platformList.add(platform);
    }
    /** 
    Удалить платформу, на которой присутствует юзер
    @param {StreamPlatform} platform - платформа
    */
    deletePlatform(platform) {
        this._platformList.delete(platform);
    }

    /** Кого смотрит зритель*/
    get watch() { return this._view; }
    /** @param {Streamer} streamer - стример*/
    set watch(streamer) {
        if (!streamer) {
            streamer.deleteView(this)
            this._view = '';
        } else {
            streamer.addView(this)
            this._view = streamer.name;
        }
    }

    /**
    Вывести ссылку на юзера
    @param {StreamPlatform} platform 
    */
    urlChannel(platform) {
        if (!this.platformList.has) return undefined;
        if (platform.name === 'youtube') return `${platform.url}c/${this.name}`;
        return `${platform.url}${this.name}`;
    }

    /**
    Зафоловится 
    @param {Streamer} streamer - стример
    */
    follow(streamer) {
        this._followerList.add(streamer);
        streamer.addFollow(this);
    }
    /** 
    Отфоловится
    @param {Streamer} streamer - стримера
    */
    unFollow(streamer) {
        this._followerList.delete(streamer);
        streamer.deleteFollow(this);
    }

    /** 
    Подписаться платно
    @param {Streamer} streamer - стример 
    */
    subscribe(streamer) {
        this._subscriberList.add(streamer);
        streamer.addSubscribe(this);
    }
    /**
    Отписаться от платной подписки
    @param {Streamer} streamer - стример
    */
    unSubscribe(streamer) {
        this._subscriberList.delete(streamer);
        streamer.deleteSubscribe(this);
    }
}

class Streamer extends User {
    /** @type {Set<User>} Список фолловеров*/
    _followList = new Set();
    /** @type {Set<User>} Список подписчиков*/
    _subList = new Set();
    /** @type {Set<User>} Список смотрящих*/
    _viewList = new Set();

    constructor(param) {
        super(param);
        this.stream = false;
        this._followList = param.followList || this._followList;
        this._subList = param.subList || this._subList;
        this._viewList = param.viewList || this._viewList;
    }

    get followList() { return Array.from(this._followList) };
    get subList() { return Array.from(this._subList) };
    get viewList() { return Array.from(this._viewList) };

    /** 
    Начать стрим
    @param {StreamPlatform} platform - платформа
    */
    online(platform) {
        this.stream = true;
        // platform.
        platform.OnStream(this);
    }
    /** 
    Закончить стрим
    @param {StreamPlatform} platform - платформа
    */
    offline(platform) {
        this.stream = false;
        platform.OffStream(this)
    }

    /**
    Добавить фолловера
    @param {User} user - юзер
    */
    addFollow(user) {
        this._followList.add(user);
    }
    /**
    Удалить фолловера
    @param {User} user - юзер
    */
    deleteFollow(user) {
        this._followList.delete(user);
    }

    /**
    Добавить платного подписчика
    @param {User} user - юзер
    */
    addSubscribe(user) {
        this._subList.add(user);
    }
    /**
    Удалить платного подписчика
    @param {User} user - юзер
    */
    deleteSubscribe(user) {
        this._subList.delete(user);
    }

    /**
    Добавить зрителя
    @param {User} user - юзер
    */
    addView(user) {
        this._viewList.add(user);
    }
    /**
    Удалить зрителя
    @param {User} user - юзер
    */
    deleteView(user) {
        this._viewList.delete(user);
    }
}

const streamer = new Streamer({ name: 'AqVadPlay' });
const user = new User({ name: 'Hallbat' });
const user2 = new User({ name: 'LolkaFoxy' });
user.follow(streamer);
user2.follow(streamer);
console.log(streamer);
console.log(streamer.followList.map(key => key.name));
// console.log(Array.from(streamer));