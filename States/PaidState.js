import OrderState from "./OrderState.js";
import ShippedState from "./ShippedState.js";
import CancelledState from "./CancelledState.js";

export default class PaidState extends OrderState {
    ship(order) {
        console.log(`Заказ #${order.id} отправлен в доставку`);
        order.setState(new ShippedState());
    }

    cancel(order) {
        console.log(`Заказ #${order.id} отменён`);
        order.user.balance += order.cost;
        console.log(`Баланс: ${order.user.balance} рублей`);
        order.setState(new CancelledState());
    }
}

