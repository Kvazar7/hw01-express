import {
  listContacts,
  getContactById,
  addContact,
  removeContact
} from "./contacts.js";

import { Command } from "commander";

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const getAllContacts = await listContacts();
      return console.table(getAllContacts);
   
    case "get":
      const getOneContact = await getContactById(id);
      return console.table(getOneContact);
    
    case "add":
      const addNewContact = await addContact({email, phone, name});
      return console.table(addNewContact);
    
    case "remove":
      const delContact = await removeContact(id);
      return console.table(delContact);
  
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);