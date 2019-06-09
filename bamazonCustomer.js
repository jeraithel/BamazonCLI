var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "michele6",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();
});

function afterConnection() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; res.length > i; i++) {
            // console.log(i);
            console.log("Product: " + res[i].id + " || Product Name: " + res[i].product_name + " || Price: " + res[i].price);
        }
        purchaseProduct();
    });
}

function purchaseProduct() {
    inquirer
        .prompt([
            {
                name: "selection",
                type: "number",
                message: "Which product ID would you like to buy?"
            },
            {
                name: "quantity",
                type: "number",
                message: "How many units would you like to buy?"
            }
        ])
        .then(function (answer) {
            // console.log (answer.selection);
            var query = "SELECT stock, price FROM products WHERE ?";
            // console.log (query);
            connection.query(query, { id: answer.selection }, function (err, res) {
                if (err) throw err;
                console.log(res[0].stock);
                if (res[0].stock >= answer.quantity) {
                    console.log ("Purchase Success");
                    var cost = answer.quantity * res[0].price;
                    var newStock = res[0].stock - answer.quantity;
                    console.log ("Your purchase total is $" + cost);
                    console.log ("Stock remaining: " + newStock);
                    query2 = "UPDATE products SET ? WHERE ?";
                    connection.query(query2, [{ stock: newStock }, { id: answer.selection }], function (err, res) {
                        if (err) throw err;
                        console.log("New Stock Updated")
                    });
                } else {
                    console.log ("Insufficient Quantity. No Purchase Made");
                }
            });
        })
};
