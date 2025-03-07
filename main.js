#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
class Student {
    name;
    constructor(n) {
        this.name = n;
    }
}
class Person {
    students = [];
    addStudent(obj) {
        this.students.push(obj);
    }
}
const persons = new Person();
const programStart = async (persons) => {
    do {
        console.log(chalk.yellow("Welcome!"));
        const ans = await inquirer.prompt({
            name: "select",
            type: "list",
            message: chalk.green("To whome would you like to interact with"),
            choices: ["staff", "student", "exit"]
        });
        if (ans.select == "staff") {
            console.log(chalk.blueBright("You approch the staff room. Please feel free to ask any question."));
        }
        else if (ans.select == "student") {
            const ans = await inquirer.prompt({
                name: "student",
                type: "input",
                message: chalk.bgBlueBright("Enter the student's name you wish to engage with:")
            });
            const student = persons.students.find(val => val.name == ans.student);
            if (!student) {
                const name = new Student(ans.student);
                persons.addStudent(name);
                console.log(`Hello, I am ${name.name}. Nice to meet you!`);
                console.log("New student added");
                console.log("Current student list:");
                console.log(persons.students);
            }
            else {
                console.log(`Hello, I am ${student.name}. Nice to see you again!`);
                console.log("Existing student list:");
                console.log(persons.students);
            }
        }
        else if (ans.select == "exit") {
            console.log(chalk.red("Exiting the program..."));
            process.exit();
        }
    } while (true);
};
programStart(persons);
