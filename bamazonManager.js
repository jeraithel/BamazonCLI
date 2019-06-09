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
    manageProducts();
});


function manageProducts() {
    inquirer
        .prompt(
            {
                name: "selection",
                choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
                type: "list",
                message: "What would you like to do?"
            })
        .then(function (answer) {
            switch (answer.selection) {
                case "View Products for Sale":
                    connection.query("SELECT * FROM products", function (err, res) {
                        if (err) throw err;
                        console.log("Here's what's for sale: ");
                        for (var i = 0; res.length > i; i++) {
                            console.log("Product: " + res[i].id + " || Product Name: " + res[i].product_name + " || Price: " + res[i].price + " || Quantity: " + res[i].stock);
                        }
                    }
                    )
                    break;
                case "View Low Inventory":
                    connection.query("SELECT * FROM products WHERE stock < 6", function (err, res) {
                        if (err) throw err;
                        console.log("Here's what's for sale: ");
                        for (var i = 0; res.length > i; i++) {
                            console.log("Product: " + res[i].id + " || Product Name: " + res[i].product_name + " || Price: " + res[i].price + " || Quantity: " + res[i].stock);
                        }
                    }
                    )
                    break;
                case "Add to Inventory":
                    connection.query("SELECT * FROM products", function (err, res) {
                        if (err) throw err;
                        var productArray = [];
                        for (var i = 0; res.length > i; i++) {
                            productArray += res[i].product_name;
                        }
                        console.log(productArray);
                        inquirer
                            .prompt([
                                {
                                name: "productAdd",
                                choices: ["1","2"],
                                type: "list",
                                message: "Which product would you like to add stock?"
                                },
                                {
                                name: "quantityAdd",
                                type: "number",
                                message: "How many would you like to add?"
                                }
                            ])
                            .then(function (answer) {
                                console.log(answer.productAdd);
                                // connection.query("SELECT stock FROM products WHERE ?", { product_name: answer.productAdd }, function (err, res) {
                                //     if (err) throw err;
                                //     var currentStock = res;
                                //     console.log(currentStock);
                                // }
                                // )
                            })
                    }
                    )
                    break;
            }
        })
};