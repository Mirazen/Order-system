import readline from "readline";
import User from "../Modules/User.js";
import Order from "../Modules/Order.js";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const users = [
    new User(1, "Даня", 1000),
    new User(2, "Дима", 300),
    new User(3, "Аня", 1500)
];

let orders = [];
let orderId = 1;

export function showMenu() {
    console.log("\n");
    console.log("УПРАВЛЕНИЕ ЗАКАЗАМИ");
    console.log("\n");
    console.log("1. Создать заказ");
    console.log("2. Оплатить заказ");
    console.log("3. Отправить заказ");
    console.log("4. Доставить заказ");
    console.log("5. Отменить заказ");
    console.log("6. Вернуть товар");
    console.log("7. Вернуть деньги");
    console.log("8. Посмотреть историю заказа");
    console.log("9. Показать пользователей");
    console.log("0. Выход");
    rl.question("\nВыберите действие (0-9): ", handleChoice);
}

function handleChoice(choice) {
    switch (choice.trim()) {
        case '1': createOrder(); break;
        case '2': processOrder('pay'); break;
        case '3': processOrder('ship'); break;
        case '4': processOrder('deliver'); break;
        case '5': processOrder('cancel'); break;
        case '6': processOrder('return'); break;
        case '7': processOrder('refund'); break;
        case '8': showHistory(); break;
        case '9': showUsers(); break;
        case '0':
            rl.close();
            return;
        default:
            console.log("\nОшибка. Попробуйте снова");
            showMenu();
    }
}

function createOrder() {
    console.log("\nПользователи:");
    users.forEach(u => console.log(`id: ${u.id} / ${u.name} / Баланс: ${u.balance} рублей`));

    rl.question("\nВведите ID пользователя: ", (userId) => {
        const user = users.find(u => u.id == userId);
        if (!user) {
            console.log("Пользователь не найден");
            showMenu();
            return;
        }

        rl.question("Введите сумму заказа: ", (costStr) => {
            const cost = parseFloat(costStr);
            if (isNaN(cost) || cost <= 0) {
                console.log("Сумма должна быть положительной");
                showMenu();
                return;
            }

            const order = new Order(orderId++, user, cost);
            orders.push(order);
            console.log(`Заказ #${order.id} создан для ${user.name}`);
            showMenu();
        });
    });
}

function selectOrderAndDo(actionFn, actionName = "действие") {
    if (orders.length === 0) {
        console.log(`\nНет созданных заказов для ${actionName}`);
        showMenu();
        return;
    }

    console.log("\nСписок заказов:");
    orders.forEach(list => {
        const stateName = list.state.constructor.name.replace('State', '');
        console.log(`id: ${list.id} / Пользователь: ${list.user.name} / Состояние: ${stateName}`);
    });

    rl.question(`\nВведите id заказа для ${actionName}: `, (orderId) => {
        const order = orders.find(list => list.id == orderId);
        if (!order) {
            console.log("Заказ не найден");
            showMenu();
            return;
        }

        actionFn(order);
        showMenu();
    });
}

const actionLabels = {
    pay: 'оплату',
    ship: 'отправку',
    deliver: 'доставку',
    cancel: 'отмену',
    return: 'возврат товара',
    refund: 'возврат денег'
};

function processOrder(action) {
    selectOrderAndDo(
        (order) => order[action](),
        actionLabels[action] || 'действие'
    );
}

function showHistory() {
    selectOrderAndDo(
        (order) => order.getHistory(),
        "просмотра истории"
    );
}

function showUsers() {
    console.log("\nТекущие пользователи:");
    users.forEach(u => console.log(`id: ${u.id} / ${u.name} / Баланс: ${u.balance} рублей`));
    showMenu();
}