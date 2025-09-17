export default class User {
    constructor(id, name, balance = 0) {
        this.id = id;
        this.name = name;
        this.balance = balance;
    }
}