import OrderState from "./OrderState.js";
import DeliveredState from "./DeliveredState.js";

export default class ShippedState extends OrderState {
    deliver(order) {
        console.log(`Заказ #${order.id} доставлен`);
        order.setState(new DeliveredState());
    }
}