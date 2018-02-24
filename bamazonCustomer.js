require("dotenv").config();
var fs = require(`fs`);
var inquirer = require(`inquirer`);
var mysql = require('mysql');
var db = require(`./db`);

//Display items for sale
var connection = mysql.createConnection({
    host: db.serverLogin.host,
    port: db.serverLogin.port,
    user: db.serverLogin.user,
    password: db.serverLogin.password,
    database: `bamazon`
  });

  connection.connect();
   
  connection.query('SELECT * FROM products', function (error, results, fields) {
    if (error) throw error;

    // Ask user what they want to buy
    var productList = [];           //For creating an array to display all product options
    var allProductData = results;   //Store all returned data from the SQL database
    var productChosenObject;        //For storing all data for the product chosen
    var productChosenName = ``;     //For storing the name of which product was chosen. Declared here for scoping purposes

    
    results.forEach(function(product) {
        productList.push(`${product.product_name}`);
    });
    
    inquirer.prompt([
        {
            type: `list`,
            name: `buy`,
            message: `What would you like to buy?`,
            choices: productList
        }
    ]).then(function(answers) {
        
        productChosenName = answers.buy;
        
        //Find and store the database data for the chosen product
        allProductData.forEach(function(product) {
            if(product.product_name === productChosenName) {
                productChosenObject = product;
            }
        });

        //Ask user how many they want to buy
        inquirer.prompt([
            {
                type: `input`,
                name: `numToBuy`,
                message: `How many ${productChosenName} would you like?`,
                validate: function(input) {
                    // input = Number(input);
                    var checker = isNaN(input);
                    // if (typeof input === `number`) {
                    //     checker = true;
                    // }
                    // else {
                    //     checker = false;
                    // }
                    return !checker;
                }
            }
        ]).then(function(answers) {
            //Check if store has enough inventory
            var inventory = productChosenObject.stock_quantity;
            if (inventory > answers.numToBuy) {

                var newStock = productChosenObject.stock_quantity - answers.numToBuy;

                //Subtract from database inventory
                connection.query(`UPDATE products SET ? WHERE ?`,[
                    {
                        stock_quantity: newStock
                    },
                    {
                        item_id: productChosenObject.item_id
                    }

                ],
                function (error, results, fields) {
                    if (error) throw error;

                    connection.end();
                });
                

                //Summarize order for user, showing item, quantity, and total cost
                var cost = answers.numToBuy * productChosenObject.price;
                console.log(
                    `Order Summary:
                    Item:   ${productChosenObject.product_name}
                    Qty:    ${answers.numToBuy}
                    Cost:   $${cost.toFixed(2)}`
                );
            }
            else {
                connection.end();
                return console.log(`Insufficient quantity!`);
            }
        });
    });
 });