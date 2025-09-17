import OrderState from "./OrderState.js";
import ReturnedState from "./ReturnedState.js";

export default class DeliveredState extends OrderState {
    return(order) {
        console.log(`Заказ #${order.id} возвращён`);
        order.setState(new ReturnedState());
    }
}