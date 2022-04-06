interface AnswerObject {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

// interface calculationValues {
//     weekHours: Array<number>;
//     targetHour: number;
// }

// const parseArguments = (args: Array<string>): calculationValues => {
//     let targetHour = 0;
//     if (args.length < 4) throw new Error('Not enough arguments');
//     if (process.argv[2].length === 1 && !isNaN(Number(process.argv[2]))) {
//         targetHour = parseInt(process.argv[2], 10);
//     } else {
//         throw new Error('All provided values were not numbers!'); 
//     }
//     const rawWeekHours = process.argv.slice(3);
//     const weekHours = rawWeekHours.map(value => {
//         if (value.length === 1 && !isNaN(Number(value))) {
//             return parseInt(value, 10);
//         } else if (value.length > 1 && !isNaN(Number(value))) {
//             return Number.parseFloat(value);
//         } else {
//             throw new Error('All provided values were not numbers!'); 
//         }  
//     });
//     return {
//         weekHours: weekHours,
//         targetHour: targetHour
//     };
// };

export const calculateExercises  = (weekHours: Array<number>, targetHour: number): AnswerObject => {
    const averageHours = weekHours.reduce((previousValue, currentValue) => previousValue + currentValue,0) / weekHours.length;
    const trainingDays = weekHours.length - weekHours.filter(day => day === 0).length;
    let rating = 0;
    let ratingDescription = '';

    if (averageHours > targetHour) {
        rating = 3;
        ratingDescription = 'good';
    } else if (averageHours < targetHour && targetHour - averageHours <= 1) {
        rating = 2;
        ratingDescription = 'not too bad but could be better';
    } else {
        rating = 1;
        ratingDescription = 'bad'; 
    }

    return {
        periodLength: weekHours.length,
        trainingDays: trainingDays,
        success: averageHours > targetHour,
        rating: rating,
        ratingDescription: ratingDescription,
        target: targetHour,
        average: averageHours
    };  
};

// try {
//     const { weekHours, targetHour } = parseArguments(process.argv);
//     console.log(calculateExercises(weekHours, targetHour));
//   } catch (error: unknown) {
//     let errorMessage = 'Something bad happened.';
//     if (error instanceof Error) {
//       errorMessage += ' Error: ' + error.message;
//     }
//     console.log(errorMessage);
//   }
