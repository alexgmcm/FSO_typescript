import express from 'express';
import { calculateBmi } from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    try {
    let weight: number
    if ( typeof req.query.weight === 'string' && !isNaN(Number(req.query.weight)) ) {
        weight = Number(req.query.weight)
    } else {
        throw new Error
    }

    let height: number
    if (typeof req.query.height === 'string' && !isNaN(Number(req.query.height))) {
        height = Number(req.query.height)
    } else {
        throw new Error
    }

    
    const bmi: string = calculateBmi(height, weight)
    const returnObj = {weight, height, bmi}
    res.json(returnObj)

} catch(error) {
    res.statusCode = 400
    res.json({
        error: "malformatted parameters"
    })
}
  });
  


const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});