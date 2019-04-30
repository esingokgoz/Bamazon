require('dotenv').config();
const config = require('./config.js');
// console.log(config)
var mysql = require("mysql");
var inquirer = require("inquirer");
let connection = mysql.createConnection(config);

//Connect to the database
connection.connect(err => {
    if (err) throw err;
    console.log('Connected to Database: connection id = ' + connection.threadId);
    displayItems();
});

//display items from db
function displayItems() {
    // console.log("hello from display items function");
    connection.query(
        'SELECT id, stock_quantity, product_name, department_name, price FROM products',
        (err, res) => {
            console.table(res);
            buyItems(res);
        }
    );
}

//purchase items
function buyItems(res) {
    inquirer
        .prompt([
            {
                name: "id",
                type: "input",
                message: "Please enter the ID of the product you'd like to purchase!",
                //validate to see if the selected product id is valid
                validate: function (id) {
                    return validateID(id, res);
                }
            },
            {
                name: "quantity",
                type: "input",
                message: "How many units of this product you'd like to purchase?",
                ////check to see if there is enough quantity of the product
                validate: validateQuantity
            }
        ])
        .then(answer => {
            checkOrder((id = answer.id), (quantity = answer.quantity));
        });
}

function validateID(id, res) {
    var ids = res.map(d => {
        return d.id;
    });
    //if the user entry is anything other than a number, throw a message
    if (isNaN(parseInt(id)) || parseInt(id) === '' || !Number.isInteger(parseInt(id)) || !ids.includes(parseInt(id))) {
        console.log(`\n id:${id} -- Product id cannot be found. Please enter a valid ID...`);
    }
    else {
        return true;
    }
}

function validateQuantity(quantity) {
    //if the quantity entered is not a number, throw a message
    if (isNaN(parseInt(quantity)) || parseInt(quantity) === '' || !Number.isInteger(parseInt(quantity))) {
        return ("Quantity should be a number!");
    } 
    else {
        return true;
    }
}

function checkOrder(id, quantity) {
    connection.query(
        'SELECT * FROM products WHERE ?',
        {
            id: id
        },
        function (err, res) {
            if (err) throw err;
            var quantityInventory = parseInt(res[0].stock_quantity);
            var quantityRequested = parseInt(quantity);

            if (quantityRequested <= quantityInventory) {
                console.log(
                    `You have purchased ${quantityRequested} units of ${res[0].product_name} for a total cost of $${quantityRequested * parseFloat(res[0].price)}`);
                return updateQuantity(
                    (id = res[0].id), (quantity = quantityInventory - quantityRequested)
                );
            } else {
                console.log("Insufficient quantity!");
                buyItems();
            }
        }
    );
}

//update the quantity of the product after item is purchased
function updateQuantity(id, quantity) {
    connection.query(
        'UPDATE products SET ? WHERE ?',
        [
            {
                stock_quantity: quantity
            },
            {
                id: id
            }
        ],
        function (err, result) {
            if (err) throw err;
        }
    );
    connection.end();
}