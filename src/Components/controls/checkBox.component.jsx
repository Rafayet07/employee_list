import { Checkbox, FormControl } from '@material-ui/core'
import { FormControlLabel } from '@material-ui/core'
import React from 'react'

export default function CheckBox(props) {
const {value,onChange,name,color,label}=props;

const handleDefaultEvent=(name,value)=>({
  target:{
    name ,value
  }
})
  return (
    <FormControl>
      <FormControlLabel
         control={
           <Checkbox checked={value}
           onChange={e=>onChange(handleDefaultEvent(name,e.target.checked))}
           name={name}
           color={color}
           />
         }
           label={label}
       />
    </FormControl>
  )
}
