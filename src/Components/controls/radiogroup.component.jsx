import React from 'react';
import { FormControl, FormLabel, RadioGroup} from '@material-ui/core';
import { FormControlLabel, Radio } from '@material-ui/core';

export default function RadioGroups(props) {
  const {items,name,value,onChange}=props;
  return (
    <FormControl>
          <FormLabel>Gender</FormLabel>
          <RadioGroup
          row
           name={name}
          value={value}
          onChange={onChange}
          >
            {items.map((value,index)=>(
              <FormControlLabel key={index} value={value.id} control={<Radio/>} label={value.title}/>
            ))}
            
          </RadioGroup>
        </FormControl>
  )
}
