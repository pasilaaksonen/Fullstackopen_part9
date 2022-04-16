import { CoursePart } from '../App'

interface MyProps {
    courseParts: CoursePart [];
}

const Total = ({ courseParts }: MyProps) => {
  return (
    <div>
        <p>
            Number of exercises{" "}
            {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  )
}

export default Total
