export default class OrderState {
    action(actionName) {
        throw new Error(`Ошибка. Нельзя ${actionName} в текущем состоянии`);
    }

    pay(order, user) { this.action('оплатить'); }
    ship(order) { this.action('отправить'); }
    deliver(order) { this.action('доставить'); }
    cancel(order) { this.action('отменить'); }
    return(order) { this.action('вернуть товар'); }
    refund(order) { this.action('вернуть деньги'); }
}