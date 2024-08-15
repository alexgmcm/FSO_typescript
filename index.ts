import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises, exerciseObject} from './exerciseCalculator';
const app = express();
app.use(express.json());


app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    try {
    let weight: number;
    if ( typeof req.query.weight === 'string' && !isNaN(Number(req.query.weight)) ) {
        weight = Number(req.query.weight);
    } else {
        throw new Error;
    }

    let height: number;
    if (typeof req.query.height === 'string' && !isNaN(Number(req.query.height))) {
        height = Number(req.query.height);
    } else {
        throw new Error;
    }

    
    const bmi: string = calculateBmi(height, weight);
    const returnObj = {weight, height, bmi};
    res.json(returnObj);

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
} catch(_error: any) {
    res.statusCode = 400;
    res.json({
        error: "malformatted parameters"
    });
}
  });
  

type exerciseArgs = {
    daily_exercises: number[];
    target: number;
};

app.get('/exercises',(req, res) => {
    const hasAllArgs = (object: exerciseArgs): boolean => {
        return ((object.daily_exercises !== undefined) && (object.target !== undefined) );
    };
    const hasCorrectArgs = (object: exerciseArgs): boolean => {
        const array_correct: boolean =  (Array.isArray(object.daily_exercises) && !object.daily_exercises.some(isNaN));
        const num_correct: boolean = (!isNaN(object.target));
        return array_correct && num_correct;
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const args: exerciseArgs = req.body;

    if (!hasAllArgs(args)){
        res.statusCode = 400;
        res.json({error: "missing parameters"});
    }

    if (!hasCorrectArgs(args)){
        res.statusCode = 400;
        res.json({error: "malformed parameters"});
    }

    //console.log(args);
    const returnObj: exerciseObject = calculateExercises(args.daily_exercises, args.target);
    res.json(returnObj);
    

});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});