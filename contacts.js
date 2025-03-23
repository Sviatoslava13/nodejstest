import fs from "fs/promises";
import path from "path";
const contactsPath = path.resolve("db", "contacts.json");
//resolve - створює абсолютний шлях до файлу
// console.log(contactsPath)
async function listContacts() {
  const readFiles = await fs.readFile(contactsPath, "utf-8");
  //прочитали файл
  const contactsArr = JSON.parse(readFiles);
    // створили та повернули новий масив обʼєктів
    // console.log(contactsArr)
  return contactsArr;
}


async function getContactById(contactId) {
  const contactsArray = await listContacts();

  // отримали масив обʼєктів
  const findContactId = contactsArray.find((el) => el.id === contactId);
    // пошук обʼєктів за ідентифікатором
    // console.log(findContactId || null)
  return findContactId || null;
}


async function removeContact(contactId) {
  const contactsArray = await listContacts();
  // отримали масив обʼєктів
  const removedContact = await getContactById(contactId);
  const filterContactId = contactsArray.filter((el) => el.id !== contactId);
  // пошук обʼєктів за ідентифікатором
    await fs.writeFile(contactsPath, JSON.stringify(filterContactId, null, 2));
    // console.log(removedContact)
  return removedContact;
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
}



async function addContact(name, email, phone) {
  const contactsArray = await listContacts();

  const newContact = { id: name, name, email, phone };

  contactsArray.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contactsArray, null, 2));
    // console.log(newContact)
  return newContact;
  // ...твій код. Повертає об'єкт доданого контакту.
}

//node contacts.js


export  {listContacts,
getContactById,
removeContact,
addContact}