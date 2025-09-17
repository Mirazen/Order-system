import OrderState from "./OrderState.js";
import RefundedState from "./RefundedState.js";

export default class ReturnedState extends OrderState {
    refund(order) {
        console.log(`Заказ #${order.id}. Возвращено: ${order.cost} рублей`);
        order.user.balance += order.cost;
        console.log(`Баланс: ${order.user.balance} рублей`);
        order.setState(new RefundedState());
    }
}