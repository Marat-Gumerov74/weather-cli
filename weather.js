#!/ust/bin/env node
import { getArgs } from "./helpers/args.js";
import { getWeather, getIcon } from "./services/api.servise.js";
import { printHelp, printSuccess, printError } from './services/log.service.js'
import { saveKeyValue, TOKEN_DICTIONARY, getKeyValue } from "./services/storage.service.js";


const saveToken = async (token) => {
    if (!token.length){
        printError('Не передан token')
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token);
        printSuccess("Токен сохранен");
    } catch(e){
        printError(e.message);
    }
}

const saveCity = async (ciry) => {
    if (!ciry.length){
        printError('Не передан город')
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city);
        printSuccess("Город сохранен");
    } catch(e){
        printError(e.message);
    }
}

const getForcast = async () => {
    try {
        const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city);
        const weather = await getWeather(city);
        printWeather(weather, getIcon(weather.weather[0].icon))
    } catch (e) {
        if (e?.response?.status == 404){
            printError('Неверно указан город');
        } else if (e?.response?.status == 401) {
            printError('Неверно указан токен');
        } else {
            printError(e.message)
        }
        
    }
    
}


const initCLI = () => {
    const args = getArgs(process.argv)
    console.log(args);
    if (args.h) {
        // Вывод help
        return printHelp();
    }

    if (args.s) {
        return saveCity(args.s);
        // Сохранить город
    }

    if (args.t) {
        //сохранить токен
        return saveToken('token', args.t)
    }
    //вывести погоду
    return getForcast();
}

initCLI();