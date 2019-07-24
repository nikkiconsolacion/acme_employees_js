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
  // // Using a for loop
  // for (let i = 0; i < employeesArr.length; i++) {
  //   if (name === employeesArr[i].name) {
  //     return employeesArr[i];
  //   }
  // }
  // Using .filter *Using .map breaks the rest of the functions
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
    return [];
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
  console.log('first - managersArr:', managersArr);
  // base case, no manager
  if (!employee.managerId) {
    return managersArr;
  } else {
    //find the manager, unshift into managersArr
    let manager = findManagerFor(employee,employeesArr);
    managersArr.unshift(manager)
    console.log('second - managersArr:', managersArr);

    // recursive case
    findManagementChainForEmployee(manager, employeesArr);
  }

  console.log('third');
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
