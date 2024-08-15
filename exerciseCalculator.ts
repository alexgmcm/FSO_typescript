/* 
Write a function calculateExercises that calculates the average time of daily exercise hours 
compares it to the target amount of daily hours and returns an object that includes the following values:

* the number of days
* the number of training days
* the original target value
* the calculated average time
* boolean value describing if the target was reached
* a rating between the numbers 1-3 that tells how well the hours are met. You can decide on the metric on your own.
* a text value explaining the rating, you can come up with the explanations

The daily exercise hours are given to the function as an array that contains the 
number of exercise hours for each day in the training period.
*/

import { parseNumericalArguments } from "./helper";

interface exerciseObject {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}
   

const calculateExercises = (dailyExerciseHours: number[], target: number): exerciseObject => {
    const periodLength: number = dailyExerciseHours.length
    const trainingDays: number = dailyExerciseHours.filter((x) => x>0).length
    const average: number = dailyExerciseHours.reduce((acc, x) => acc + x)/periodLength
    const success: boolean = average>=target
    let rating: number
    let ratingDescription: string
    if (average/target >= 1) {
       rating  = 3
       ratingDescription = 'Excellent!!!'
    } else if (average/target>=0.5){
         rating  = 2
         ratingDescription =  'not too bad but could be better'
    } else {
         rating = 1
         ratingDescription = "Diabolical :("
    }
    const exerciseObj: exerciseObject = {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    }

    return exerciseObj


}

const numericalArgs: string[] = process.argv.slice(2)
const parsedArgs: number[] = parseNumericalArguments(numericalArgs, -1) //inf possible args
const target: number = parsedArgs[0]
let dailyExerciseHours: number[] = [];
parsedArgs.slice(1).forEach((arg) => dailyExerciseHours.push(arg))
console.log(calculateExercises(dailyExerciseHours, target))
