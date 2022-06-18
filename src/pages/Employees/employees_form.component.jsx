import { Grid } from "@material-ui/core";
import { useEffect } from "react";
import Control from "../../Components/controls/control.component";
import { Form, useForm } from "../../Components/UseForm/useForm.component";
import * as employeeService from "../../Services/service.component";

const initialFValues = {
  id: 0,
  fullName: "",
  email: "",
  mobile: "",
  city: "",
  gender: "male",
  departmentId: "",
  hiredate: new Date(),
  isParmanent: false,
};

const genderChange = [
  {
    id: "male",
    title: "Male",
  },
  {
    id: "female",
    title: "Female",
  },
  {
    id: "others",
    title: "others",
  },
];
export default function EmployeesForm(props) {

  const validate = (fieldValue=values) => {
    let temp = {...errors};
    if("fullName" in fieldValue)
    temp.fullName = fieldValue.fullName ? "" : "Please Input Fullname,This field is required.";
    if("email" in fieldValue)
    temp.email = (/$^|.+@.+..+/).test(fieldValue.email) ? "" : "Email is not valid.";
    if("mobile" in fieldValue)
    temp.mobile = fieldValue.mobile.length > 9 ? "" : "This Field should have minimum 10 numbers.";
    if("departmentId" in fieldValue)
    temp.departmentId =fieldValue.departmentId.length !== 0 ? "" : "This field is required.";
    setErrors({
      ...temp,
    });
    if(fieldValue === values)
    return Object.values(temp).every((x) => x === "");
  };
  const { values,setValues, handleInputChange, errors, setErrors,ResetF } =
    useForm(initialFValues,true,validate );

const {addOrEdit,recordForEdit}=props;//props from employee component

useEffect(()=>{
  if(recordForEdit!==null)
  setValues({
    ...recordForEdit
  })
},[recordForEdit, setValues])


  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      addOrEdit(values,ResetF)
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Control.Input
            varient="outlined"
            label="Fullname"
            name="fullName"
            value={values.fullName}
            onChange={handleInputChange}
            error={errors.fullName}
          />
          <Control.Input
            varient="outlined"
            label="Email"
            name="email"
            value={values.email}
            onChange={handleInputChange}
            error={errors.email}

          />
          <Control.Input
            varient="outlined"
            label="Mobile"
            name="mobile"
            value={values.mobile}
            onChange={handleInputChange}
            error={errors.mobile}

          />
          <Control.Input
            varient="outlined"
            label="City"
            name="city"
            value={values.city}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <Control.RadioGroups
            items={genderChange}
            name="gender"
            value={values.gender}
            onChange={handleInputChange}
          ></Control.RadioGroups>
          <Control.Select
            name="departmentId"
            label="Department"
            value={values.departmentId}
            onChange={handleInputChange}
            options={employeeService.getDepartmentData()}
            error={errors.departmentId}
          />
          <Control.DatePicker
            name="hiredate"
            label="Hire Date"
            value={values.hiredate}
            onChange={handleInputChange}
          />
          <Control.CheckBox
            name="isParmanent"
            color="primary"
            label="Permanent Employee"
            value={values.isParmanent}
            onChange={handleInputChange}
          />
          <div>
            <Control.Button type="submit" text="Submit" />
            <Control.Button color="default" text="Reset" onClick={ResetF}/>
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}
