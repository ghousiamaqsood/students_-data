#!/usr/bin/env node
import inquirer from "inquirer";

const randomNumber: number = Math.floor(10000 + Math.random() * 90000);
let myBalance: number = 0;

const main = async () => {
  let answer = await inquirer.prompt([
    {
      name: "students",
      type: "input",
      message: "Enter student name:",
      validate: function (value: string) {
        if (value.trim() !== "") {
          return true;
        }
        return "Please enter a non-empty value.";
      },
    },
    {
      name: "courses",
      type: "list",
      message: "Please select the course to enroll in:",
      choices: ["JavaScript", "Python", "TypeScript"],
    },
  ]);

  const tuitionFee: { [key: string]: number } = {
    JavaScript: 5000,
    Python: 3000,
    TypeScript: 7000,
  };

  console.log(`\nTuition Fee: ${tuitionFee[answer.courses]}/-\n`);
  console.log(`Balance: ${myBalance}\n`);

  let paymentMethod = await inquirer.prompt([
    {
      name: "payment",
      type: "list",
      message: "Select payment method",
      choices: ["Bank Transfer", "Easypaisa", "Jazzcash"],
    },
    {
      name: "amount",
      type: "input",
      message: "Transfer your money:",
      validate: function (value: string) {
        if (!isNaN(Number(value)) && value.trim() !== "") {
          return true;
        }
        return "Please enter a valid amount.";
      },
    },
  ]);

  console.log(`\nYou selected payment type ${paymentMethod.payment}\n`);
  const tuitionFees = tuitionFee[answer.courses];
  const paymentAmount = parseFloat(paymentMethod.amount);

  if (tuitionFees === paymentAmount) {
    console.log(`Congratulations, you have successfully enrolled in ${answer.courses}.\n`);

    let ans = await inquirer.prompt([
      {
        name: "select",
        type: "list",
        message: "What would you like to do next?",
        choices: ["view status", "Exit"],
      },
    ]);

    if (ans.select === "view status") {
      console.log("\n*******Status*******\n");
      console.log(`Student Name: ${answer.students}`);
      console.log(`Student ID: ${randomNumber}`);
      console.log(`Course: ${answer.courses}`);
      console.log(`Tuition Fees Paid: ${paymentAmount}`);
      console.log(`Balance: ${(myBalance += paymentAmount)}`);
    } else {
      console.log(`\nExiting Student Management System\n`);
    }
  } else {
    console.log("Invalid amount due to course fee.\n");
  }
};

main().catch((err) => console.error(err));