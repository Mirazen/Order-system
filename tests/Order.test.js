import User from "../Modules/User.js";
import Order from "../Modules/Order.js";
import { jest } from "@jest/globals";

describe("Order history", () => {
  let user;

  beforeEach(() => {
    user = new User(1, "Даня", 1000);
  });

  test("1. проверка истории с отменой", () => {
    order = new Order(1, user, 500);
    order.pay();
    order.cancel();
    expect(order.history).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ state: "Created" }),
        expect.objectContaining({ state: "Paid" }),
        expect.objectContaining({ state: "Cancelled" })
      ])
    );
  });

  test("2. проверка истории с возвратом", () => {
    order = new Order(2, user, 500);
    order.pay();
    order.ship();
    order.deliver();
    order.return();
    order.refund();
    expect(order.history).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ state: "Shipped" }),
        expect.objectContaining({ state: "Delivered" }),
        expect.objectContaining({ state: "Returned" }),
        expect.objectContaining({ state: "Refunded" })
      ])
    );
  });

  test("метод getHistory выводит историю в консоль", () => {
    order = new Order(3, user, 200);
    const spy = jest.spyOn(console, "log").mockImplementation(() => {});
    
    order.pay();
    order.ship();
    order.deliver();
    order.getHistory();

    expect(spy).toHaveBeenCalledWith(expect.stringContaining("История заказа #3:"));
    expect(spy).toHaveBeenCalledWith(expect.stringMatching(/— Created|Paid|Shipped|Delivered/));

    spy.mockRestore();
  });
});
