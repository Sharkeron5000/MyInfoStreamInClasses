import {StreamPlatform, Stream, User} from './js/class.js'

/**
Получить случайное число в промежутке от минимального вкучительно до максимального вкучительно, числа
@param {number} min - минимальное число
@param {number} max - максимальное число
@returns {number} случайное число
 */
const getRandomNumber = (min, max) => Math.round(Math.random() * (max - min) + min);

/**
Создать случайный ник
@param {number} number - количество символов в нике пользователя
@returns {string} ник пользователя
*/
// const getRandomNick = (number) => {
//     let result = '';
//     for (i = 0; i < number; i++) {
//         let symbol;
//         let random;
//         desiredNumber: while (true) {
//             random = getRandomNumber(0, 122);
//             if (random >= 0 && random < 10 && i === number|| )
//         }
//         console.log(random);
//     }
// }

// getRandomNick(6);

// let str = '';
//0-9 65-90 97-122
// for (let i = 97; i <= 122; i++) {
//     str += String.fromCodePoint(i);
// }
// console.log( str );

const twitch = new StreamPlatform({ name: 'Twitch', url: 'twitch.tv' });
let num = 0;
let game1 = {
    name: 'Crusader Kings 3',
    info: 'Политическая стратегия средневековых лет',
    picture: '-',
};
let game2 = {
    name: 'Red Alert 2',
    info: 'Политическая стратегия',
    picture: '-',
};

twitch.addGame(game1);
twitch.addGame(game2);
console.log(twitch
);

game2 = {
    name: 'Red Alert 2',
    info: 'стратегия',
    picture: '-',
};

const stream1 = {
    streamName: 'Проверка стрима',
    gameName: 'Red Alert 2',
    streamer: 'AqVadPlay',
    platform: twitch,
}

twitch.editGame(game2)

const hallbatTW = new User({ name: 'hallbat', platform: twitch });
const LolkaFoxyTW = new User({ name: 'LolkaFoxy', platform: twitch });
const AqVadPlayTW = new User({ name: 'AqVadPlay', platform: twitch });
// console.log(StreamPlatform);
// console.log(User);
// console.log(Stream);
LolkaFoxyTW.follow(AqVadPlayTW);
LolkaFoxyTW.subscribe(AqVadPlayTW);
hallbatTW.follow(AqVadPlayTW);
AqVadPlayTW.online(stream1);
AqVadPlayTW.offline();
console.log(AqVadPlayTW);
// console.log(LolkaFoxyTW.subscribeList);