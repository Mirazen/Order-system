import OrderState from "./OrderState.js";
import PaidState from "./PaidState.js";
import CancelledState from "./CancelledState.js";

export default class CreatedState extends OrderState {
    pay(order, user) {
        if (user.balance < order.cost) {
            throw new Error("Недостаточно средств");
        }
        user.balance -= order.cost;
        console.log(`Заказ #${order.id} оплачен на сумму ${order.cost} рублей. Баланс: ${user.balance} рублей`);
        order.setState(new PaidState());
    }

    cancel(order) {
        console.log(`Заказ #${order.id} отменён`);
        order.setState(new CancelledState());
    }
}