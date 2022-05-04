import React from 'react';
import { BsFillBagFill } from 'react-icons/bs';
import { Entry } from '../types';

const OccupationalEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  return (
    <div className='border'>  
        <p>{entry.date} <BsFillBagFill /></p>
        {/* <BsFillHeartFill color="red"/> */}
        <p>{entry.description}</p>
        <p>{`diagnose by ${entry.specialist}`}</p>
    </div>
  );
};

export default OccupationalEntry;