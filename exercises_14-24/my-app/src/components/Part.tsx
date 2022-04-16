import { CoursePart } from '../App'

const Part = ({part}: {part: CoursePart}) => {
    switch (part.type) {
        case "normal":
          return (
            <div>
                <b>{part.name} {part.exerciseCount}</b>
                <p>{part.description}</p>
            </div>
          )
        case "groupProject":
            return (
                <div>
                    <b>{part.name} {part.exerciseCount}</b>
                    <p>{`project exercises ${part.groupProjectCount}`}</p>
                </div>
            )
        case "submission":
            return (
                <div>
                    <b>{part.name} {part.exerciseCount}</b>
                    <p>{part.description}</p>
                </div>
            )
        case "special":
            return (
                <div>
                    <b>{part.name} {part.exerciseCount}</b>
                    <p>{part.description}</p>
                    <p>{`required skills ${part.requirements.join(", ")}`}</p>
                </div>
            )
        default:
          return null;
      }
}

export default Part;