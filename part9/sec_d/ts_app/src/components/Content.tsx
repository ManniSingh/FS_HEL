import { courseParts } from "../data/parts";

const Content = () => {
    return (
      <div>
        {courseParts.map((part,i) => (
          <p key={i}>
          {part.name} {part.exerciseCount}
          </p>
        ))}
      </div>
    )
  }
  
export default Content;