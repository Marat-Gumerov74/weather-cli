#!/ust/bin/env node
import { getArgs } from "./helpers/args.js";
import { printHelp, printSuccess, printError } from './services/log.service.js'
import { saveKeyValue } from "./services/storage.service.js";


const saveToken = async (token) => {
    try {
        await saveKeyValue('token', token);
        printSuccess("Токен сохранен");
    } catch (e){
        console.log(e);
        printError(e.message);
    }
}


const initCLI = () => {
    const args = getArgs(process.argv)
    console.log(args);
    if (args.h) {
        // Вывод help
        printHelp();
    }

    if (args.s) {
        // Сохранить город
    }

    if (args.t) {
        //сохранить токен
        return saveToken('token', args.t)
    }

    //вывести погоду
}

initCLI();