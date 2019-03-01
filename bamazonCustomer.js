var mysql = require("mysql");
var arg1 = process.argv[2];
var arg2 = process.argv[3];
var arg3 = process.argv[4];
var connection =  mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    port:"3306",
    database:"bamazon"
 });
arg1 = arg1.toLowerCase();

if (arg1 === "shop"){
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log("==========================================================================")
        for(let i = 0; i < res.length; i++){  
            console.log("Department: " + res[i].department_name + " | " + res[i].item_id + " | $" + res[i].price + " | stock: " + res[i].stock_quantity + "\n");
        }
        console.log("==========================================================================")
        console.log("type node bamazonCustomer.js buy <quantity> <product name>")
        connection.end();
    });
}

if (arg1 === "buy"){
    quantity = arg2;
    chosenProduct = arg3;
    j = 5;  
    while(process.argv[j] !== undefined){
        chosenProduct += process.argv[j];
        j++;
    }
    chosenProduct = chosenProduct.toLowerCase();
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        for(let i = 0; i < res.length; i++){
            if(chosenProduct === res[i].item_id.toLowerCase().replace(/\s/g, '')){
                id = res[i].id;
                price = parseInt(res[i].price) * parseInt(arg2);
                currentStock = parseInt(res[i].stock_quantity);
                newStock = parseInt(currentStock) - parseInt(arg2);
                if(newStock >= 0){
                    connection.query("UPDATE products SET stock_quantity=" + newStock + " WHERE id=" + id, function(err, res) {
                        console.log("Order Successfully placed, total cost is: $" + price);
                        
                    });
                }else{
                    console.log("Not enough in stock");
                }
                break;
            }
        }

        connection.end();
    });
}

