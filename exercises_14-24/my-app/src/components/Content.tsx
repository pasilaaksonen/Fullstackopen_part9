import { CoursePart } from '../App'
import Part from './Part';

const Content = ({ courseParts }: {courseParts: CoursePart[]}) => {
     
    return (
    <div>
    {courseParts.map((part, i) =>
      <Part key={i} part={part} />
    )}
    </div>
    )

    
};

export default Content;