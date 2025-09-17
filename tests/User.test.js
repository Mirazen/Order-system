import User from "../Modules/User.js";

describe("User", () => {
  test("создание пользователя", () => {
    const user = new User(1, "Даня", 1000);
    expect(user.id).toBe(1);
    expect(user.name).toBe("Даня");
    expect(user.balance).toBe(1000);
  });

  test("увеличение баланса", () => {
    const user = new User(1, "Даня", 1000);
    user.balance += 500;
    expect(user.balance).toBe(1500);
  });
});
