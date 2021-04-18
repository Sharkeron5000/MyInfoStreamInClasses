class StreamPlatform {

    /** Список созданых платформ через данный класс */
    static _namePlatform = [];
    /** 
     *  список соз0данных платформ */
    static getPlatform() {
        return StreamPlatform._namePlatform;
    }

    /** @type {Set<User>} - Список запущенных стримов*/
    _listOnline = new Set();
    /** @type {Set<string>} - Список игр которые есть на платформе*/
    _gameNameList = new Set();

    /**
    Платформа для стримов
    @param {object} params
    @param {string} params.name - Название платформы
    @param {string} params.url - ссылка на главную страницу
    */
    constructor(params) {
        this.name = params.name;
        this._url = `${params.url}/`;
        this.game = [];
        this._gameNameList = params.gameNameList || this._gameNameList;
        this._listOnline = params.listOnline || this._listOnline;
        StreamPlatform._namePlatform.push(params.name);
    };

    get listOnline() { return Array.from(this._listOnline) }
    get gameNameList() { return Array.from(this._gameNameList) }

    /** выводит ссылку на главную страницу платформы*/
    get url() { return this._url; }
    /** @param {string} value - ссылка платформу */
    set url(value) { this._url = `${value}/` }

    /**
    Вывод стримов по определенной игре
    @param {string} gameName - название игры
    @return {Set<User>} список стримеров
     */
    showStreamOfGame(gameName) {
        const index = this.game.findIndex(item => item.name === streamer.stream[gameName])
        return Array.from(this.game[index].stream)
    }

    /** 
    Добавить стримера в список стримящих и его стрим в список игр
    @param {User} streamer - стример
    */
    onStream(streamer) {
        this._listOnline.add(streamer);
        const index = this.game.findIndex(item => item.name === streamer.stream.gameName)
        this.game[index].stream.add(streamer.stream)
    }
    /** 
    Удалить стримера из списка и его стрим из списка игр
    @param {User} streamer - стример 
    */
    offStream(streamer) {
        this._listOnline.delete(streamer);
        const index = this.game.findIndex(item => item.name === streamer.stream.gameName);
        this.game[index].stream.delete(streamer.stream);
    }
    /** 
    Добавить игру в список
    @param {object} gameOfStriming - объект с игрой {name, info, picture, game}
    @param {string} gameOfStriming.name - Название игры
    @param {string} gameOfStriming.info - информация об игре
    @param {string} gameOfStriming.picture - ссылка на картинку с игрой
    @param {Set<Stream>} gameOfStriming.game - Список стримов по данной игре
    */
    addGame(gameOfStriming) {
        if (!this._gameNameList.has(gameOfStriming.name)) {
            this._gameNameList.add(gameOfStriming.name);
            const { name, info = 'Нет информации об игре', picture = 'Нет изображения', stream = new Set() } = gameOfStriming;
            this.game.push({ name, info, picture, stream });
        } else {
            console.warn('Такая игра уже была добавлена');
        }
    }
    /**
    Удалить игру из списка
    @param {string} gameName - название игры
    */
    deleteGame(gameName) {
        if (this._gameNameList.has(gameName)) {
            this._gameNameList.delete(gameName);
            const index = this.game.findIndex(item => item.name === gameName);
            this.game.splice(index, 1);
        } else {
            console.warn('Данной игры не было в списке');
        }
    }
    /**
    Изменение данных об игре
    @param {object} gameOfStriming - объект с новой информацией об игре {name, info, picture}
    @param {string} gameOfStriming.name - название игры по которой искать
    @param {string} gameOfStriming.info - Новая информация об игре
    @param {string} gameOfStriming.picture - новая ссылка на картинку
    */
    editGame(gameOfStriming) {
        if (this._gameNameList.has(gameOfStriming.name)) {
            const index = this.game.findIndex(item => item.name === gameOfStriming.name);
            const streamOnline = Array.from(this.game[index].stream);
            const { name, info = 'Нет информации об игре', picture = 'Нет изображения', stream = new Set() } = gameOfStriming;
            if (streamOnline.length !== 0) streamOnline.forEach(value => stream.add(value));
            this.game[index] = { name, info, picture, stream };
        } else {
            console.warn('Данная игра не найдена для редактирования');
        }
    }
}

class User {
    /** @type {Set<User>} список на кого зафолловлен пользователь*/
    _followerList = new Set();
    /** @type {Set<User>} список на кого платно подписан пользователь*/
    _subscribeList = new Set();
    /** @type {Set<User>} Список, кто зафоловлен на стримера */
    _follList = new Set();
    /** @type {Set<User>} Список кто платно подписан */
    _subList = new Set();

    /** Список созданых пользователей через данный класс */
    static _nameUser = [];
    /** список созданных платформ */
    static getUser() {
        return User._nameUser;
    }

    /**
    Пользователь
    @param {Object} params информация о пользователе
    @param {string} params.name - Ник зрителя
    @param {StreamPlatform} params.platform - Платформа на которой зарегистрирован зритель
    */
    constructor(params) {
        this.name = params.name;
        this.streamBoolean = false;
        this._stream = '';
        this._follList = params.follList || this._follList;
        this._subList = params.subList || this._subList;
        this._watch = '';
        this._followerList = params.followerList || this._followerList;
        this._subscribeList = params.subscriberList || this._subscribeList;
        this.platform = params.platform;
        User._nameUser.push(params.name);
    }

    /** Список на кого зафоловлен зритель */
    get followList() { return Array.from(this._followerList) };
    /** Список на кого платно подписан зритель */
    get subscribeList() { return Array.from(this._subscribeList) };
    /** Список, кто зафоловлен на стримера */
    get follList() { return Array.from(this._follList) };
    /** Список, кто платно подписан на стримера */
    get subList() { return Array.from(this._subList) };

    /** Что стримит пользователь */
    get stream() { return this._stream }

    /** Кого смотрит зритель*/
    get watch() { return this._watch; }
    /** @param {User} streamer - стример*/
    set watch(streamer) {
        if (this._watch) {
            this.stopWatch();
        }
        streamer.stream.view(this);
        this._watch = streamer.stream;
    }

    /**Остановить просмотр стрима*/
    stopWatch() {
        this._watch.view(this)
        this._watch = '';
    }

    /** 
    Запустить трансляцию
    @param {Stream} stream - параметры трансляции
    */
    online(stream) {
        this._stream = new Stream(stream);
        this.platform.onStream(this);
        this.streamBoolean = true;
    }
    /**Остановить трансляцию */
    offline() {
        this.platform.offStream(this);
        this.streamBoolean = false;
        this._stream = '';
    }

    /**
    Изменить информацию о трансляции
    @param {Stream} stream - параметры трансляции
    */
    changeStream(stream) {
        //----------------------------------------------------------------------------------------------------------
    }

    /**
    Вывести ссылку на пользователя
    @param {StreamPlatform} platform 
    */
    urlChannel() {
        if (this.platform.name === 'youtube' || 'YouTube') return `${this.platform.url}c/${this.name}`;
        return `${this.platform.url}${this.name}`;
    }

    /** 
    Вывести сообщение от пользователя
    @param word - сообщение
    */
    sayWord(word) {
        this._watch.writeMessage(this, word);
    }

    /**
    Добавить/удалить фолловера
    @param {User} user - пользователь
    */
    foll(user) {
        if (this.follList.includes(user)) {
            this._follList.delete(user);
        } else {
            this._follList.add(user);
        }
    }

    /**
    Добавить/удалить платного подписчика
    @param {User} user - пользователь
    */
    sub(user) {
        if (this.subList.includes(user)) {
            this._subList.delete(user);
        } else {
            this._subList.add(user);
        }
    }

    /**
    Зафоловится на стримера
    @param {User} streamer - стример
    */
    follow(streamer) {
        streamer.foll(this)
        if (this.followList.includes(streamer)) {
            this._followerList.delete(streamer);
        } else {
            this._followerList.add(streamer);
        }
    }

    /** 
    Подписаться платно на стримера
    @param {User} streamer - стример 
    */
    subscribe(streamer) {
        streamer.sub(this)
        if (this._subscribeList.has(streamer)) {
            this._subscribeList.delete(streamer);
        } else {
            this._subscribeList.add(streamer);
        }
    }
}

class Stream {
    /**@type {Set<User>} - Список зрителей*/
    _viewList = new Set();

    /**
    Прямая трансляция
    @param {Object} params - Параметры трансляции
    @param {string} params.streamName - Название трансляции
    @param {Object} params.game - Название игры
    @param {User} params.streamer - Стример, проводящий трансляцию
    @param {StreamPlatform} params.platform - Платформа, на которой проводится стрим
    */

    /** Номер сообщения */
    id = 0;

    constructor(params) {
        this.streamName = params.streamName;
        this.streamer = params.streamer;
        this.gameName = params.gameName;
        this.platform = params.platform;
        // this.time = new Date();
        this._viewList = this._viewList;
        this.chat = [];
    }

    /** Получить список зрителей */
    get viewList() { return Array.from(this._viewList) };

    /** Получить количество зрителей */
    viewNumber() {
        return this._viewList.size;
    }

    /**
     * Написать сообщение в чат на стриме
     * @param {User} user информация о зрителе
     * @param {string} word Сообщение от зрителя
     */
    writeMessage(user, word) {
        this.chat.push({
            id: this.id++,
            user: user,
            message: word,
        });
    }

    /**
     * Удалить сообщение по номеру
     * @param {number} id - номер сообщения 
     */
    deleteMessage(id) {
        let index = this.chat.findIndex(value => value.id === id);
        this.chat[index].message = 'Удалено';
    }

    /**
    Добавить/Удалить зрителя из списка смотрящих
    @param {User} user Зритель
    */
    view(user) {
        if (this._viewList.has(user)) {
            this._viewList.delete(user)
        } else {
            this._viewList.add(user)
        }
    }
}

export { StreamPlatform, User, Stream }