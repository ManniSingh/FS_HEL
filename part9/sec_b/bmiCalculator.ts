interface BmiMetrics {
    height: number;
    weight: number;
  }
  
  // custom parser
  const parseArguments = (args: string[]): BmiMetrics => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
  
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        height: Number(args[2]),
        weight: Number(args[3])
      };
    } else {
      throw new Error('Provided values were not numbers!');
    }
  };
  
  export const calculateBmi = (height: number, weight: number): string => {
    if (height === 0) throw new Error("Divide by 0!");
    if (isNaN(height) || isNaN(weight)) {
        throw new Error("malformed arguments!");
    }
    height=height/100; // CM to Meters for meter per KG.
    const bmi = weight / (height*height);
    if (bmi < 18.5) {
        return "Underweight";
    } else if (bmi < 24.9) {
        return "Normal weight";
    } else if (bmi < 29.9) {
        return "Overweight";
    } else {
        return "Obese";
    }
  };
  
  try {
    const { height, weight } = parseArguments(process.argv);
    const bmi = calculateBmi(height, weight);
    console.log('BMI:',bmi);
    } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }