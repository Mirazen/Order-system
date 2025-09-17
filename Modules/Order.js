import CreatedState from "../States/CreatedState.js";

export default class Order {
    constructor(id, user, cost) {
        this.id = id;
        this.user = user;
        this.cost = cost;
        this.history = [];
        this.setState(new CreatedState());
    }

    setState(state) {
        this.state = state;
        const stateName = state.constructor.name.replace('State', '');
        const record = {
            state: stateName,
            timestamp: new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' }).replace(',', '')
        };
        this.history.push(record);
    }

    pay() { this.state.pay(this, this.user); }
    ship() { this.state.ship(this); }
    deliver() { this.state.deliver(this); }
    cancel() { this.state.cancel(this); }
    return() { this.state.return(this); }
    refund() { this.state.refund(this); }

    getHistory() {
        console.log(`История заказа #${this.id}:`);
        this.history.forEach((rec, i) => {
            console.log(`${i + 1}. ${rec.timestamp} — ${rec.state}`);
        });
    }
}