import User from "../Modules/User.js";
import Order from "../Modules/Order.js";

const stateName = (order) => order.state.constructor.name.replace("State", "");

describe("Order States", () => {
  let user;

  beforeEach(() => {
    user = new User(1, "Даня", 1000);
  });

  test("создание", () => {
    const order = new Order(1, user);
    expect(stateName(order)).toBe("Created");
  });

  test("оплата", () => {
    const order = new Order(2, user, 200);
    order.pay();
    expect(stateName(order)).toBe("Paid");
    expect(user.balance).toBe(800);
  });

  test("отмена оплаченного", () => {
    const order = new Order(3, user, 200);
    order.pay();
    order.cancel();
    expect(stateName(order)).toBe("Cancelled");
  });

  test("отмена созданного", () => {
    const order = new Order(4, user, 200);
    order.cancel();
    expect(stateName(order)).toBe('Cancelled');
  })

  test("отправка", () => {
    const order = new Order(5, user, 200);
    order.pay();
    order.ship();
    expect(stateName(order)).toBe("Shipped");
  });

  test("доставка", () => {
    const order = new Order(6, user, 200);
    order.pay();
    order.ship();
    order.deliver();
    expect(stateName(order)).toBe("Delivered");
  });

  test("возвращение товара", () => {
    const order = new Order(7, user, 200);
    order.pay();
    order.ship();
    order.deliver();
    order.return();
    expect(stateName(order)).toBe("Returned");
  });

  test("возврат средств и проверка баланса", () => {
    const order = new Order(8, user, 200);
    order.pay();
    expect(user.balance).toBe(800);
    order.ship();
    order.deliver();
    order.return();
    order.refund();
    expect(stateName(order)).toBe("Refunded");
    expect(user.balance).toBe(1000);
  });

  test("после отмены возврат средств и никуда не перейти", () => {
    const order = new Order(9, user, 200);
    order.pay();
    order.cancel();
    expect(user.balance).toBe(1000);

    expect(() => order.pay()).toThrow();
    expect(() => order.ship()).toThrow();
    expect(() => order.deliver()).toThrow();
    expect(() => order.cancel()).toThrow();
    expect(() => order.return()).toThrow();
    expect(() => order.refund()).toThrow();
  });

  test("нехватка денег", () => {
    const order = new Order(10, user, 2000);
    expect(() => order.pay()).toThrow("Недостаточно средств");
  });

});
