const path = require('path');
const Contact = require('./Contact');
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database(path.join(__dirname, '../data/contacts.sqlite'));

db.run('CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT, lastName TEXT, email TEXT, notes TEXT, created_date TEXT, updated_date TEXT)');


const repo = {
  findAll: (x) => { 
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM contacts", (err, rows) => {
        if (err) {
          reject(`read error: ${err.message}`);
        } else {
          let contacts = [];
          rows.forEach(row => {
            const aContact = new Contact(row.id, row.firstName, row.lastName, row.email, row.notes, new Date(row.created_date).toString(), new Date(row.updated_date).toString());
            contacts.push(aContact);
          });
          resolve(contacts);
        }
      });
    });
  },
  findById: (uuid) => {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM contacts WHERE id = ?", [uuid], (err, row) => {
        if (err) {
          reject(`read error: ${err.message}`);
        } else {
          let contact = new Contact(row.id, row.firstName, row.lastName, row.email, row.notes, new Date(row.created_date).toString(), new Date(row.updated_date).toString());
          resolve(contact);
        }
      });
    });
  },
  create: (contact) => {
    return new Promise((resolve, reject)=>{
      db.serialize(() => {
        db.run("INSERT INTO contacts (firstName, lastName, email, notes, created_date, updated_date) VALUES (?, ?, ?, ?, ?, ?)", [contact.firstName, contact.lastName, contact.email, contact.notes, new Date().toString(), new Date().toString()], (err) => {
          if (err) {
            console.log(err.message);
            reject(`error: ${err.message}`);
          } else {
            console.log('contact created');
            resolve();
          }
        });
      });
    });
  },
  deleteById: (uuid) => {
    return new Promise((resolve, reject) => {
      db.run("DELETE FROM contacts WHERE id = ?", [uuid], (err) => {
        if (err) {
          console.log(err.message);
          reject(`error: ${err.message}`);
        } else {
          console.log('contact deleted');
          resolve();
        }
      });
    });
  },
  update: (contact) => { 
    return new Promise((resolve, reject) => {
      db.run("UPDATE contacts SET firstName = ? , lastName = ? , email = ? , notes = ? , updated_date = ?  WHERE id = ?", [contact.firstName, contact.lastName, contact.email, contact.notes, new Date().toString(), contact.id], (err) => {
        if (err) {
          console.log(err.message);
          reject(`error: ${err.message}`);
        } else {
          console.log('contact updated');
          resolve();
        }
      });
    });
  },
};


module.exports = repo;