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
                            productArray.push(res[i].product_name);
                        }
                        // console.log(productArray);
                        inquirer
                            .prompt([
                                {
                                    name: "productAdd",
                                    choices: productArray,
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
                                // console.log(answer.productAdd);
                                connection.query("SELECT stock FROM products WHERE ?", { product_name: answer.productAdd }, function (err, res) {
                                    if (err) throw err;
                                    var currentStock = res[0].stock;
                                    // console.log(currentStock);
                                    newStock = currentStock + answer.quantityAdd;
                                    // console.log(newStock);
                                    connection.query("UPDATE products SET ? WHERE ?", [{ stock: newStock }, { product_name: answer.productAdd }], function (err, res) {
                                        if (err) throw err;
                                        console.log("Added: " + answer.quantityAdd + " to inventory");
                                        console.log("Total Quantity in Stock is Now: " + newStock);
                                    });
                                });

                            })
                    }
                    )
                    break;
                case "Add New Product":
                    inquirer
                        .prompt([
                            {
                                name: "productNew",
                                type: "input",
                                message: "Which product would you like to add?"
                            },
                            {
                                name: "departmentNew",
                                type: "input",
                                message: "Which department is this product being added to?"
                            },
                            {
                                name: "priceNew",
                                type: "number",
                                message: "What will be the customer price for this new product?"
                            },
                            {
                                name: "quantityNew",
                                type: "number",
                                message: "How many initially added to stock?"
                            }
                        ])
                        .then(function (answer) {
                            console.log(answer.productNew);
                            console.log(answer.departmentNew);
                            console.log(answer.priceNew);
                            console.log(answer.quantityNew);
                            connection.query("INSERT INTO products (product_name, dept_name, price, stock) VALUES (?,?,?,?)", [answer.productNew, answer.departmentNew, answer.priceNew, answer.quantityNew], function (err, res) {
                                if (err) throw err;
                                console.log("New product " + answer.productNew + " added");
                            });
                        })
                    break;
            }
        })
};