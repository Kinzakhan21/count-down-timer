#! /usr/bin/env node
import inquirer from "inquirer";
import { differenceInSeconds} from "date-fns"

import chalk from "chalk";

const res = await inquirer.prompt({
    name:"userinput",
    type: "number",
    message:chalk.cyanBright("Plaese enter thr amount of seconds"),
    validate: (input) =>{
        if(isNaN(input)){
            return chalk.redBright("Please enter  valid number")
        }else if (input > 60){
            return chalk.redBright("seconds must be in 60")
        }else{
            return true;
        }
    }
});
let input = res.userinput

function startTime(val:number){
    const intTime = new Date().setSeconds(new Date().getSeconds()+val);
    const internalTime = new Date(intTime);
    setInterval(()=>{
        const currentTime = new Date()
        const timeDiff = differenceInSeconds(internalTime,currentTime);
        if(timeDiff <=0){
            console.log(chalk.redBright("Time has expired"));
            process.exit();
        }
        const min = Math.floor((timeDiff%(3600*24))/3600)
        const sec = Math.floor(timeDiff % 60);
        console.log(chalk.yellowBright(`${min.toString().padStart(2,"0")}:${sec.toString().padStart(2, "0")}`));
        
    },1000);
}
startTime(input);

