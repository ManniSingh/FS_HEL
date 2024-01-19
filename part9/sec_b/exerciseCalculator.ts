// example input : ts-node exerciseCalculator.ts 3 0 2 4.5 0 3 1 2

interface Targets {
    days: number[];
    target: number;
  }

const parseArray = (args: string[]): Targets => {
    if (args.length < 10) throw new Error("Not enough arguments");
    let _arr:string[] = args.slice(2);
    let arr: number[] = [];
    try{
        if (_arr.every((element) => !isNaN(Number(element)))){
            arr = _arr.map(Number);
            return { days:arr.slice(0,-1), target: arr.pop()!};
        }
    }catch{
        throw new Error("Provided values were not numbers!");
    }
    return { days: [], target: 0 };
}
  
interface Results {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    avarage: number;
}

const rate = (inp: Targets, avg: number): number =>{
    let rating:number = 0;
    const count: number = inp.days.filter((value) => value > inp.target).length;
    if (count === inp.days.length) {
        rating = 3
    }else if (avg >= inp.target){
        rating = 2
    }else if (avg >= 0.6*inp.target){
        rating = 1
    }
    return rating
} 
  
export const calculateExercise = (inp: Targets): Results => {
    const _results = {} as Results;
    _results.periodLength = inp.days.length;
    _results.target = inp.target;
    //console.log(inp.days)
    //console.log(_results.periodLength);
    _results.avarage = inp.days.reduce((acc, current) => (acc+current),0)/_results.periodLength; 
    _results.success = _results.avarage >= inp.target ? true : false;
    _results.rating = rate(inp,_results.avarage);
    _results.ratingDescription = _results.success ? "Well Done" : "not too bad but could be better";
    return _results;
}
  
try {
    const inp:Targets = parseArray(process.argv);
    const results:Results = calculateExercise(inp);
    console.log(results);
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }