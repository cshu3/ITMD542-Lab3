class Contact {
    constructor(id, firstName, lastName, email, notes, created_date, updated_date ){
        this.id =id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.notes = notes;
        this.created_date =created_date;
        this.updated_date =updated_date;
    }

}

module.exports = Contact;