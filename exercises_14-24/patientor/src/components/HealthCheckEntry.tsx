import React from 'react';
import { BsFillBagPlusFill, BsFillHeartFill } from 'react-icons/bs';
import { Entry } from '../types';


const HealthCheckEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  return (
    <div className='border'>  
        <p>{entry.date} <BsFillBagPlusFill /></p>
        <BsFillHeartFill color="green"/>
        <p>{entry.description}</p>
        <p>{`diagnose by ${entry.specialist}`}</p>
    </div>
  );
};

export default HealthCheckEntry;