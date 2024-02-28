var express = require('express');
var router = express.Router();
const contactsController = require('../controllers/contactsController');
const { body } = require('express-validator');

/* GET contacts listing. */
router.get('/', contactsController.contacts_list);

/* GET contacts add */
router.get('/add', contactsController.contacts_create_get);

/* POST contacts add */
router.post('/add', 
body('firstName').trim().notEmpty().withMessage('First name can not be empty!'), 
body('lastName').trim().notEmpty().withMessage('Last name can not be empty!'), 
body('email').trim().not().isEmpty().withMessage('Contact email address can not be empty!').isEmail().withMessage('Email must be a valid email address!'),
contactsController.contacts_create_post);

/* GET a contact */
router.get('/:uuid', contactsController.contacts_detail);

/* GET contacts delete */
router.get('/:uuid/delete', contactsController.contacts_delete_get);

/* POST contacts delete */
router.post('/:uuid/delete', contactsController.contacts_delete_post);

/* GET contacts edit */
router.get('/:uuid/edit', contactsController.contacts_edit_get);

/* POST contacts add */
router.post('/:uuid/edit', 
body('firstName').trim().notEmpty().withMessage('First name can not be empty!'), 
body('lastName').trim().notEmpty().withMessage('Last name can not be empty!'), 
body('email').trim().not().isEmpty().withMessage('Contact email address can not be empty!').isEmail().withMessage('Email must be a valid email address!'),
contactsController.contacts_edit_post);

module.exports = router;
