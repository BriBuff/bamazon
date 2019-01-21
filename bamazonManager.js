var mysql = require("mysql");
var inquirer = require("inquirer");

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
  var query = connection.query(
    "SELECT * FROM products"
    
  );

  // logs the actual query being run
  console.table(query.sql);
}

products();

// Manager Menu

function menu() {
    inquirer
      .prompt({
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
          "View Products for Sale",
          "View Low Inventory",
          "Add to Inventory",
          "Add New Product"
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "View Products for Sale":
          products();
          break;
  
        case "View Low Inventory":
          lowInventory();
          break;
  
        case "Add to Inventory":
          addInventory();
          break;
  
        case "Add New Product":
          newProduct();
          break;
        }
      });
  }

  function lowInventory () {
      var query = "SELECT products FROM product_name BY stock_quantity HAVING count(*) > 5";
      connection.query(query, function(err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log(res[i].stock.quantity);
        }
        menu();
      });
    }

    function newProduct() {
        // prompt for info about the item being put up for auction
        inquirer
          .prompt([
            {
              name: "product_name",
              type: "input",
              message: "What is the product name?"
            },
            {
              name: "department_name",
              type: "input",
              message: "What department does the item belong to?"
            },
            {
              name: "price",
              type: "input",
              message: "How much is this item?",
              validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              }
            },
            {
                name: "stock_quantity",
                type: "input",
                message: "How many do we have in stock?",
                validate: function(value) {
                  if (isNaN(value) === false) {
                    return true;
                  }
                  return false;
                }
              }
          ])
          .then(function(answer) {
            // when finished prompting, insert a new item into the db with that info
            connection.query(
              "INSERT INTO products SET ?",
              {
                product_name: answer.product_name,
                department_name: answer.department_name,
                price: answer.price,
               stock_quantity: answer.stock_quantity
              },
              function(err) {
                if (err) throw err;
                console.log("Your item was sucessfully added!");
                // re-prompt the user for if they want to bid or post
                menu();
              }
            );
          });
      }




    function addInventory() {
        // prompt for info about the item being put up for auction
        inquirer
          .prompt([
            {
              name: "product_name",
              type: "input",
              message: "Which id would you like to update?"
            },
            {
              name: "department_name",
              type: "input",
              message: "How many would you like to add to the stock quantity?",
                validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              }
            }
          ])
          .then(function(answer) {
            // when finished prompting, insert a new item into the db with that info
            connection.query(
              "INSERT INTO products SET ?",
              {
                product_name: answer.product_name,
                department_name: answer.department_name,
                price: answer.price,
               stock_quantity: answer.stock_quantity
              },
              function(err) {
                if (err) throw err;
                console.log("Your item was sucessfully added!");
                // re-prompt the user for if they want to bid or post
                menu();
              }
            );
          });
      }