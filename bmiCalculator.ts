/* calculates a BMI based on a given height (in centimeters)
 and weight (in kilograms) and then 
 returns a message that suits the results*/
import { parseNumericalArguments } from "./helper"

 export const calculateBmi = (height: number, weight: number) : string => {
    const heightInMetres: number = height/100
    const bmi: number = weight/(heightInMetres)**2
    if (bmi>=30) {
        return "obese"
    } else if (bmi >=25){
        return "overweight"
    } else if (bmi >= 18.5){
        return "normal weight"
    } else {
        return "underweight"
    } 
    
 }

 //const height: number =  N

 //console.log(calculateBmi(180,74))
 if (require.main === module) {
// only run this code if run directly, not if imported
 const numericalArgs = process.argv.slice(2)
 const parsedArgs = parseNumericalArguments(numericalArgs, 2)
 console.log(calculateBmi(parsedArgs[0], parsedArgs[1]))
 }