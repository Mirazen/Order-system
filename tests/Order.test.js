import User from "../Modules/User.js";
import Order from "../Modules/Order.js";

const stateName = (order) => order.state.constructor.name.replace('State', '');

describe("Order lifecycle", () => {
  test("создание заказа", () => {
    const user = new User(1, "Даня", 1000);
    const order = new Order(1, user);
    expect(stateName(order)).toBe("Created");
  });

  test("оплата заказа", () => {
    const user = new User(1, "Даня", 1000);
    const order = new Order(1, user, 200);
    order.pay();
    expect(stateName(order)).toBe("Paid");
    expect(user.balance).toBe(800);
  });

  test("доставка заказа", () => {
    const user = new User(1, "Даня", 1000);
    const order = new Order(1, user, 200);
    order.pay();
    order.ship();
    expect(stateName(order)).toBe("Shipped");
  });

  test("отмена заказа", () => {
    const user = new User(1, "Даня", 1000);
    const order = new Order(1, user, 200);
    order.cancel();
    expect(stateName(order)).toBe("Cancelled");
  });

  test("нельзя оплатить без денег", () => {
    const poorUser = new User(2, "Дима", 50);
    const order = new Order(2, poorUser, 200);
    expect(() => order.pay()).toThrow("Недостаточно средств");
  });
});
