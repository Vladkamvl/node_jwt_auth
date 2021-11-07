module.exports = class UserDTO{
    id;
    email;


    constructor(model) {
        this.id = model.id
        this.email = model.email
    }
}