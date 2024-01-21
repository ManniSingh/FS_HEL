import { CoursePartBase } from "../Types";
//import { courseParts } from "../data/parts";
// const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);
// const Total = () => {
//     return (
//        <p>
//         Number of exercises {totalExercises}
//        </p>
//     )
// }
const Total = ({parts} : {parts: CoursePartBase[]}) => {
    return(
        <div>
             Number of exercises{" "}
            {parts.reduce((a, b) => a + b.exerciseCount, 0)}
        </div>
    )
}
  
export default Total;