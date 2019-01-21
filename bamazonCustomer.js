var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
  host: "localhost",

  // My port
  port: 8889,

  // Username
  user: "root",

  // Password
  password: "root",
  database: "bamazon_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
});

// Return Product Table
function products() {
  console.log("Items in Stock \n");
  connection.query("SELECT * FROM products",
  function(err, res) {
    if (err) throw err
      console.table(res)
      buy();}
  );

}

products();

// Buy Message

function buy() {
  inquirer
    .prompt({
        name: "id",
        type: "input",
        message: "Which item would you like to buy? (Please enter id #)"
      },
    )
    .then(function(answer) {
      connection.query(
        "SELECT * FROM products WHERE item_id=?", parseInt(answer.id),
        function(err, res) {
          if (err) throw err;
          console.log("res", res[0].product_name);
          // How Many Function
          console.log("You would like to buy: " + res[0].product_name);
          quantity(answer.id);
        }
    );
});

 };

 // How many of this item.

function quantity(id) {
  inquirer
    .prompt({
        name: "item",
        type: "input",
        message: "How many of this item would you like to buy?"
      },
    )
    .then(function(answer) {
    connection.query(
        "SELECT * FROM products WHERE item_id=?", parseInt(id), function (err, res) {
          if (err) throw err;
          var stockQuantity = parseInt(res[0].stock_quantity);
          var price = res[0].price;
          if(stockQuantity >= answer.item) { 
            connection.query("UPDATE products SET stock_quantity= stock_quantity -? WHERE item_id=?",
          [ parseInt(answer.item), id
          ], function (err, res) {
            if (err) throw err;
            console.log("price", price);
            console.log("You have bought " + answer.item + " of this item. Your total is " + parseFloat(price * answer.item) + ".");
            
            products();});
          } else {
            console.log("Insufficient quantity!");
            quantity();
          };
        } 
     );
});

};
