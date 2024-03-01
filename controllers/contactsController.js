const contactsRepo = require('../src/contactsSQLiteAsyncRepository');
const { validationResult } = require('express-validator');
const Contact = require('../src/Contact');

/* GET users listing. */
exports.contacts_list = async function(req, res, next) {
  const data = await contactsRepo.findAll();
  console.log(data);
  res.render('contacts', { title: 'IIT Contacts List', contacts: data });
};

/* GET create contact form. */
exports.contacts_create_get = function(req, res, next) {
  res.render('contacts_add', { title: 'Add a Contact' });
};

/* POST create contact. */
exports.contacts_create_post = async function(req, res, next) {
  //console.log(req.body);
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.render('contacts_add', { title: 'Add a Contact', msg: result.array() });
  } else {
    const newContact = new Contact('', req.body.firstName, req.body.lastName, req.body.email, req.body.notes, new Date().toString(), new Date().toString());
    await contactsRepo.create(newContact);
    res.redirect('/contacts');
  }
};

/* GET single contact. */
exports.contacts_detail = async function(req, res, next) {
  const contact = await contactsRepo.findById(req.params.uuid);
  if (contact) {
    res.render('contact', { title: 'Your Contact', contact: contact });
  } else {
    res.redirect('/contacts');
  }
};

/* GET delete contact form. */
exports.contacts_delete_get = async function(req, res, next) {
  const contact = await contactsRepo.findById(req.params.uuid);
  res.render('contacts_delete', { title: 'Delete Contact', contact: contact });
};

/* POST delete contact. */
exports.contacts_delete_post = async function(req, res, next) {
  await contactsRepo.deleteById(req.params.uuid);
  res.redirect('/contacts');
};

/* GET edit contact form. */
exports.contacts_edit_get = async function(req, res, next) {
  const contact = await contactsRepo.findById(req.params.uuid);
  res.render('contacts_edit', { title: 'Edit Contact', contact: contact });
};

/* POST edit contact. */
exports.contacts_edit_post = async function(req, res, next) {
  //console.log(req.body);
  if (req.body.firstName.trim() === ''||req.body.lastName.trim() === '') {
    const contact = await contactsRepo.findById(req.params.uuid);
    res.render('contacts_edit', 
      { title: 'Edit Contact', msg: 'Contact firstname and lastname can not be empty!', contact: contact }
    );
  } else {
    const updatedContact = new Contact(req.params.uuid, req.body.firstName.trim(), req.body.lastName.trim(), req.body.email.trim(), req.body.notes.trim(), req.body.created_date, new Date().toString());
    await contactsRepo.update(updatedContact);
    res.redirect(`/contacts/${req.params.uuid}`);
  }
};