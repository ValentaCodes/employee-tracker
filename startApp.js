import inquirer from 'inquirer';
import db from './config/config.js';
import {
  addDepartment,
  addRole,
  addEmployee,
  updateEmployee,
} from './functions.js';
import checkForQuit from './quitApp.js';

// NOTE: Main App dashboard
const startApp = () => {
  const startQuestions = [
    {
      type: 'list',
      message: 'What would you like to do?',
      name: 'start',
      choices: [
        new inquirer.Separator(),
        { name: 'View Departments', value: 1 },
        { name: 'View Roles', value: 2 },
        { name: 'View employees', value: 3 },
        new inquirer.Separator(),
        { name: 'Add a Department', value: 4 },
        { name: 'Add Role', value: 5 },
        { name: 'Add an Employee', value: 6 },
        { name: 'Update an Employee Role', value: 7 },
        new inquirer.Separator(),
        { name: 'Quit', value: 8 },
      ],
    },
  ];
  inquirer.prompt(startQuestions).then((answers) => {
    switch (true) {
      case answers.start === 1:
        db.promise()
          .query(
            `SELECT id AS ID, department_name AS Department FROM department ORDER BY Department ASC;`
          )
          .then(([results]) => {
            console.table(results);
          })
          .catch()
          .then(() => checkForQuit());
        break;
      case answers.start === 2:
        db.promise()
          .query(
            `SELECT title AS Title, id AS Role_ID, department_id AS Department, FORMAT (salary, 2) AS Salary FROM roles ORDER BY Title ASC;`
          )
          .then(([results]) => console.table(results))
          .catch()
          .then(() => checkForQuit());
        break;
      case answers.start === 3:
        db.promise()
          .query(
            `SELECT employee.id AS ID, employee.first_name AS First, employee.last_name AS Last, roles.title AS Title, FORMAT (roles.salary, 2) AS Salary, department.department_name AS Department, manager_id AS Manager_ID FROM ((employee INNER JOIN roles ON employee.role_id=roles.id) INNER JOIN department ON roles.department_id=department.id) ORDER BY First ASC;`
          )
          .then(([results]) => console.table(results))
          .catch()
          .then(() => checkForQuit());
        break;
      case answers.start === 4:
        addDepartment();
        break;
      case answers.start === 5:
        addRole();
        break;
      case answers.start === 6:
        addEmployee();
        break;
      case answers.start === 7:
        // console.log('not working yet');
        updateEmployee();
        break;
      default:
        answers.start === 8;
        console.log('Database closed');
        db.end();
        break;
    }
  });
};
function init() {
  startApp();
}
init();

export default startApp;
