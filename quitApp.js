import inquirer from 'inquirer';
import db from './config/config.js';
import startApp from './startApp.js';

// NOTE: Checks to see if user is done
const checkForQuit = () => {
  const quitMessage = [
    {
      type: 'confirm',
      name: 'quit',
      message: 'Are you finished?',
    },
  ];
  inquirer.prompt(quitMessage).then((answers) => {
    if (answers.quit == true) {
      console.log('Database closed');
      db.end();
    } else {
      startApp();
    }
  });
};

export default checkForQuit;
