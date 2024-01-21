import { courseParts } from "../data/parts";
const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);
const Total = () => {
    return (
       <p>
        Number of exercises {totalExercises}
       </p>
    )
}
  
export default Total;