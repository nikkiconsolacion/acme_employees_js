const employees = [
  { id: 1, name: 'moe'},
  { id: 2, name: 'larry', managerId: 1},
  { id: 4, name: 'shep', managerId: 2},
  { id: 3, name: 'curly', managerId: 1},
  { id: 5, name: 'groucho', managerId: 3},
  { id: 6, name: 'harpo', managerId: 5},
  { id: 8, name: 'shep Jr.', managerId: 4},
  { id: 99, name: 'lucy', managerId: 1}
];

const spacer = (text)=> {
  if(!text){
    return console.log('');
  }
  const stars = new Array(5).fill('*').join('');
  console.log(`${stars} ${text} ${stars}`);
}

spacer('findEmployeeByName Moe')
// given a name and array of employees, return employee
function findEmployeeByName(name, employeesArr) {

  let employeeArr = employeesArr.filter(employeeObj => {
    if (employeeObj.name === name) {
      return employeeObj;
    }
  });
  return employeeArr[0];
}
console.log(findEmployeeByName('moe', employees));//{ id: 1, name: 'moe' }
spacer('')

spacer('findManagerFor Shep')
//given an employee and a list of employees, return the employee who is the manager
function findManagerFor(employee, employeesArr) {
  let manager = employee.managerId;
  if (!manager) {
    return null;
  } else {
    for (let i = 0; i < employeesArr.length; i++) {
      if (manager === employeesArr[i].id) {
        return employeesArr[i];
      }
    }
  }
}
console.log(findManagerFor(findEmployeeByName('shep Jr.', employees), employees));//{ id: 4, name: 'shep', managerId: 2 }
spacer('')

spacer('findCoworkersFor Larry')

//given an employee and a list of employees, return the employees who report to the same manager
function findCoworkersFor(employee, employeesArr) {
  let coworkers = [];
  let manager = employee.managerId;

  employeesArr.forEach(employeeObj => {
    if (employeeObj.managerId === manager && employeeObj.name !== employee.name) {
      coworkers.push(employeeObj)
    }
  })

  return coworkers;
}
console.log(findCoworkersFor(findEmployeeByName('larry', employees), employees));/*
[ { id: 3, name: 'curly', managerId: 1 },
  { id: 99, name: 'lucy', managerId: 1 } ]
*/

spacer('');

spacer('findManagementChain for moe')
//given an employee and a list of employees, return a the management chain for that employee. The management chain starts from the employee with no manager with the passed in employees manager
function findManagementChainForEmployee(employee, employeesArr) {
  let managersArr = [];
  let manager = findManagerFor(employee,employeesArr);

  while (manager) {
    managersArr.push(manager);
    manager = findManagerFor(manager,employeesArr);
  }

  return managersArr;
}

console.log(findManagementChainForEmployee(findEmployeeByName('moe', employees), employees));//[  ]
spacer('');

spacer('findManagementChain for shep Jr.')
console.log(findManagementChainForEmployee(findEmployeeByName('shep Jr.', employees), employees));/*
[ { id: 1, name: 'moe' },
  { id: 2, name: 'larry', managerId: 1 },
  { id: 4, name: 'shep', managerId: 2 }]
*/
spacer('');


spacer('generateManagementTree')
//given a list of employees, generate a tree like structure for the employees, starting with the employee who has no manager. Each employee will have a reports property which is an array of the employees who report directly to them.
function generateManagementTree(employeesArr) {
  let tree = employeesArr.find(employee => {
    if (employee.managerId === undefined) {
      return true;
    }
  })
  //tree = {...manager, reports: []};
  tree.reports = generateReports(employeesArr, tree);
  return tree;
}
//helper function
function generateReports(employees, currentManager) {
  return employees.filter(employee => {

    return employee.managerId === currentManager.id

  }).map(employee => {
    employee.reports = generateReports(employees, employee);
    return employee;
  })
}

console.log(JSON.stringify(generateManagementTree(employees), null, 2));
/*
{
  "id": 1,
  "name": "moe",
  "reports": [
    {
      "id": 2,
      "name": "larry",
      "managerId": 1,
      "reports": [
        {
          "id": 4,
          "name": "shep",
          "managerId": 2,
          "reports": [
            {
              "id": 8,
              "name": "shep Jr.",
              "managerId": 4,
              "reports": []
            }
          ]
        }
      ]
    },
    {
      "id": 3,
      "name": "curly",
      "managerId": 1,
      "reports": [
        {
          "id": 5,
          "name": "groucho",
          "managerId": 3,
          "reports": [
            {
              "id": 6,
              "name": "harpo",
              "managerId": 5,
              "reports": []
            }
          ]
        }
      ]
    },
    {
      "id": 99,
      "name": "lucy",
      "managerId": 1,
      "reports": []
    }
  ]
}
*/
spacer('');

spacer('displayManagementTree')
//given a tree of employees, generate a display which displays the hierarchy
function displayManagementTree(treeObj) {

  for (let key in treeObj) {
    let val = treeObj[key];
    let str = '';
    if (key === 'name'){
      str += val;
      console.log(str);
    }
    if (key === 'reports'){
      // if reports is not an empty array, recurse
      if (val.length > 0) {
        let obj = val[0]
        str = '-';
        str += displayManagementTree(obj);
        //console.log(str);
      }
      // else {
      //   str = displayManagementTree(key);
      //   console.log(str);
      // }
    }
  }

}

displayManagementTree(generateManagementTree(employees));/*
moe
-larry
--shep
---shep Jr.
-curly
--groucho
---harpo
-lucy
*/
