const inquirer = require('inquirer'); // require inquirer to show prompt/to take user input

/**
 * function promt
 * @param: Object of promt properties with values
 * @return: Value of user's input/choise
 */
const prompt = (questions) => {
    return new Promise((resolve, reject) => {
        inquirer.prompt([questions])
            .then(function (answer) {
                resolve(answer);
            }).catch((err) => {
                reject(err);
            });
    })
}

/**
 * function showInputField
 * @param: Show prompt so user can write anything into command line
 * @returns:Value of user's input
 */
const showInputField = (question) => {
    return new Promise((resolve, reject) => {
        prompt({
            name: 'result',
            message: question,
            type: "Input"
        }).then((user_input) => {
            resolve(user_input.result)
        }).catch((err) => {
            reject(err);
        })
    })
}

/**
 * function showChoices
 * @param: Show prompt so user can choose from the list
 * @returns: Object containing index of the choise and value of choise
 */
const showChoices = (question, choices) => {
    return new Promise((resolve, reject) => {
        prompt({
            name: 'result',
            message: question,
            type: "rawlist",
            choices: choices
        }).then((user_input) => {
            resolve({
                index: choices.indexOf(user_input.result),
                value: user_input.result
            })
        }).catch((err) => {
            reject(err);
        })
    })
}

module.exports = {
    showInputField: showInputField,
    showChoices: showChoices
}