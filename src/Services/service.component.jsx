const KEYS={
  employees:{
    employee:'',
    employeeId:'employeeId'
  }
}
export const getDepartmentData=()=>([
  {id:'1',title:'Development'},
  {id:'2',title:'Marketing'},
  {id:'3',title:'HR'},
  {id:'4',title:'Accounting'}
]
)

export function insertEmployee(data) {
  let employees=getAllEmployees();
    data['id'] = generateEmployeeId()
    employees.push(data)
    localStorage.setItem(KEYS.employees,JSON.stringify(employees))
}

export function updateEmployee(data){
  let employees=getAllEmployees();
  let recordIndex=employees.findIndex(x=>x.id===data.id);
  employees[recordIndex]={...data};
  localStorage.setItem(KEYS.employees,JSON.stringify(employees))
}

export function generateEmployeeId() {
  if (localStorage.getItem(KEYS.employeeId) == null)
      localStorage.setItem(KEYS.employeeId, '0')
  var id = parseInt(localStorage.getItem(KEYS.employeeId))
  localStorage.setItem(KEYS.employeeId, (++id).toString())
  return id;
}

export function getAllEmployees() {
  if (localStorage.getItem(KEYS.employees) == null)
      localStorage.setItem(KEYS.employees, JSON.stringify([]))
  let employee= JSON.parse(localStorage.getItem(KEYS.employees));
  let department=getDepartmentData(); //map department id to department title
  return employee.map(x=>({
    ...x,
    department:department[x.departmentId-1].title
  }))

}