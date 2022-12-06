// App.js

/*
    CODE CITATIONS:
    This Project was built using the following resource as a guide:
    # Date: 12/5/2022 
    # Copied and based on
    # Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

*/

/*
    SETUP
*/

var express = require('express');   
var app     = express();            

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

// PORT        = 9148;                              // Set a port number 
PORT        = 9158;

// Database
var db = require('./database/db-connector')

// HBS
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');         // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));      // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                     // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

/*
    ROUTES
*/
app.get('/', function(req, res){
    res.render('index');                    
});                                         


/*
    CUSTOMER CRUD
*/
// get data and input into table
app.get('/customers', function(req, res){  
        let query1 = "SELECT * FROM Customers;";               // Define our query
        
        db.pool.query(query1, function(error, rows, fields){    // Execute the query
            res.render('customers', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });


// Add new customer
app.post('/add-customer-ajax', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let phone = parseInt(data.phone);
    if (isNaN(phone)) {
        phone = 'NULL'
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO Customers (firstName, lastName, email, phone, address) VALUES ('${data.firstName}', '${data.lastName}', '${data.email}', ${phone}, '${data.address}')`;
    db.pool.query(query1, function(error, rows, fields){
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        } else {
            res.redirect('/customers');
        }
    })
});

// delete customer from table
app.delete('/delete-customer-ajax/', function(req,res,next){
    let data = req.body;
    let idCustomer = parseInt(data.id);
    // console.log(idCustomer);
    let deleteCustomer = `DELETE FROM Customers WHERE idCustomer = ?;`;  
  
          // Run the 1st query
          db.pool.query(deleteCustomer, [idCustomer], function(error, rows, fields){
              if (error) {
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              } else {
                res.redirect('/customers');
            }
    })
});

// Update customer
app.put('/put-customer-ajax', function(req, res, next) {
    let data = req.body;
    let idCustomer = parseInt(data.fullname);
    let phone = parseInt(data.phone);  
    let query1 = `UPDATE Customers SET firstName = ?, lastName = ?, email = ?, phone = ?, address = ? WHERE idCustomer = ?;`;
    db.pool.query(query1, [data['firstName'], data['lastName'], data['email'], phone, data['address'], idCustomer ], function(err, rows, fields) {
        if (err) {
            console.log(err);
            res.sendStatus(400);
        } else {
            res.send(rows);
            }
        }
    );
});

/*
    EMPLOYEE CRUD
*/
// get data and render in table
// implements search functionality 
app.get('/employees', function(req, res){
    let employees;
    if (req.query.lastName === undefined) {
        employees = "SELECT * FROM Employees;";
    } else {
        employees = `SELECT * FROM Employees WHERE lastName LIKE "${req.query.lastName}%"`
    }
    db.pool.query(employees, function(err, rows, fields){
        let Employees = rows;
        return res.render('employees', {data:Employees});
    })
});

// add new employee to table
app.post('/add-employee-ajax', function(req, res) {
    let data = req.body;
    
    let payRate = parseInt(data.payRate);
    let phone = parseInt(data.phone);
    
    if (isNaN(payRate)) {
        payRate = 'NULL'
    }
    
    if (isNaN(phone)) {
        phone = 'NULL'
    }

    query1 = `INSERT INTO Employees (payRate, firstName, lastName, email, phone, address) VALUES (${payRate}, '${data.firstName}', '${data.lastName}', '${data.email}',${phone} , '${data.address}')`;
    db.pool.query(query1, function(error, rows, fields){
        if (error) {
            console.log(error)
            res.sendStatus(400);
        } else {
            res.redirect('/employees');
        }
    })
});

// delete employee from table
app.delete('/delete-employee-ajax/', function(req,res,next){
    let data = req.body;
    let idEmployee = parseInt(data.id);
    // console.log(idCustomer);
    let deleteEmployee = `DELETE FROM Employees WHERE idEmployee = ?;`;  
  
          db.pool.query(deleteEmployee, [idEmployee], function(error, rows, fields){
              if (error) {
              console.log(error);
              res.sendStatus(400);
              } else {
                res.redirect('/employees');
                }
          })
});

// Update employee
app.put('/put-employee-ajax', function(req, res, next) {
    let data = req.body;
    let idEmployee = parseInt(data.fullname);
    let payRate = parseInt(data.payRate);  
    let phone = parseInt(data.phone);  
    
    let query1 = `UPDATE Employees SET payRate = ?, firstName = ?, lastName = ?, email = ?, phone = ?, address = ? WHERE idEmployee = ?;`;
    db.pool.query(query1, [payRate, data['firstName'], data['lastName'], data['email'], phone, data['address'], idEmployee ], function(err, rows, fields) {
        if (err) {
            console.log(err);
            res.sendStatus(400);
        } else {
            res.send(rows);
            }
        }
    );
});

/*
    PRODUCT CRUD
*/ 
// get all data and render into table
app.get('/products', function(req, res) {  
        let query1 = "SELECT * FROM Products;";              

        db.pool.query(query1, function(error, rows, fields){    
            res.render('products', {data: rows});                  
        })                                                      
});

// add new product to table
app.post('/add-product-ajax', function(req, res) {
    let data = req.body;
    let price = parseFloat(data.price);
    
    if (isNaN(price)) {
        [price] = 'NULL'
    }

    query1 = `INSERT INTO Products (name, price) VALUES ('${data.name}', ${price})`;
    db.pool.query(query1, function(error, rows, fields){
        if (error) {
            console.log(error)
            res.sendStatus(400);
        } else {
            res.redirect('/products');
        }
    })
});

// delete product from table
app.delete('/delete-product-ajax/', function(req,res,next){
    let data = req.body;
    let idProduct = parseInt(data.id);
    let deleteProduct = `DELETE FROM Products WHERE idProduct = ?;`;  
  
          db.pool.query(deleteProduct, [idProduct], function(error, rows, fields){
              if (error) {
                console.log(error);
                res.sendStatus(400);
              } else {
                res.redirect('/products');
            }
  })
});
  
// update a product
app.put('/put-product-ajax', function(req, res, next) {
    let data = req.body;
    let idProduct = parseInt(data.pname);
    let price = parseFloat(data.price);  
    let query1 = `UPDATE Products SET name = ?, price = ? WHERE idProduct = ?;`;
    db.pool.query(query1, [data['name'], price, idProduct ], function(err, rows, fields) {
        if (err) {
            console.log(err);
            res.sendStatus(400);
        } else {
            res.send(rows);
            }
        }
    );
});


/*
    PLANT CRUD
*/
// get all data and render plant table
app.get('/plants', function(req, res) {  
    let query1 = "SELECT * FROM Plants;";

    // Query 2 is the same in both cases
    let query2 = "SELECT * FROM Products;";

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Save the people
        let plants = rows;
        
        // Run the second query
        db.pool.query(query2, (error, rows, fields) => {
            
            // Save the planets
            let products = rows;
            return res.render('plants', {data: plants, products: products});
        })
    })
});

// add a new plant 
app.post('/add-plant-ajax', function(req, res) {
    let data = req.body;
    let isToxic = parseInt(data.isToxic);
    
    if (isNaN(isToxic)) {
        isToxic = 'NULL'
    }

    query1 = `INSERT INTO Plants (plantName, lighting, water, season, isToxic) VALUES ('${data.plantName}', '${data.lighting}', '${data.water}', '${data.season}', ${isToxic})`;
    db.pool.query(query1, function(error, rows, fields){
        if (error) {
            console.log(error)
            res.sendStatus(400);
         } else {
            res.redirect('/plants');
            }
    })
});

// delete a plant from table
app.delete('/delete-plant-ajax/', function(req,res,next){
    let data = req.body;
    let idPlant = parseInt(data.id);
    let deletePlant = `DELETE FROM Plants WHERE idPlant = ?;`;  
  
          db.pool.query(deletePlant, [idPlant], function(error, rows, fields){
              if (error) {
                console.log(error);
                res.sendStatus(400);
              } else {
                res.redirect('/plants');
            }
    })
});

// update a plant
app.put('/put-plant-ajax', function(req, res, next) {
    let data = req.body;
    let idPlant = parseInt(data.pName);
    let isToxic = parseInt(data.isToxic);  
    let query1 = `UPDATE Plants SET lighting = ?, water = ?, season = ?, isToxic = ? WHERE idPlant = ?;`;
    db.pool.query(query1, [data['lighting'], data['water'], data['season'], isToxic, idPlant], function(err, rows, fields) {
        if (err) {
            console.log(err);
            res.sendStatus(400);
        } else {
            res.send(rows);
            }
        }
    );
});


/*
    SALES CRUD
*/
// Get data and render table 
app.get('/sales', function(req, res) {  
    let query1 = "SELECT * FROM Sales;";
    let query2 = "SELECT * FROM Customers;";
    let query3 = "SELECT * FROM Employees;";

    db.pool.query(query1, function(error, rows, fields){
        let sales = rows;
        db.pool.query(query2, (error, rows, fields) => {
            let customers = rows;
            db.pool.query(query3, (error, rows, fields) => {
                let employees = rows;
                return res.render('sales', {data: sales, customers: customers, employees: employees});
            });
        });  
    });
});

// add new sale to table
app.post('/add-sale-ajax', function(req, res) {
    let data = req.body;
    let totalProducts = parseInt(data.totalProducts);
    let idCustomer = parseInt(data.idCustomer);
    let idEmployee = parseInt(data.idEmployee);

    if (isNaN(totalProducts)) {
        totalProducts = 'NULL'
    }
    
    if (isNaN(idCustomer)) {
        idCustomer = 'NULL'
    }
    
    if (isNaN(idEmployee)) {
        idEmployee = 'NULL'
    }

    query1 = `INSERT INTO Sales (purchaseDate, totalProducts, idCustomer, idEmployee) VALUES ('${data.purchaseDate}', '${totalProducts}', '${idCustomer}', ${idEmployee})`;
    db.pool.query(query1, function(error, rows, fields){
        if (error) {
            console.log(error)
            res.sendStatus(400);
        } else {
            res.redirect('/sales');
        }
    })
});

// delete sale from table
app.delete('/delete-sale-ajax/', function(req,res,next){
    let data = req.body;
    let idSale = parseInt(data.id);
    let deleteSale = `DELETE FROM Sales WHERE idSale = ?;`;  
  
          db.pool.query(deleteSale, [idSale], function(error, rows, fields){
              if (error) {
                console.log(error);
                res.sendStatus(400);
              } else {
                res.redirect('/sales');
            }
    })
});

// update a sale 
app.put('/put-sale-ajax', function(req, res, next) {
    let data = req.body;
    let idSale = parseInt(data.idSale);
    let totalProducts = parseInt(data.totalProducts);  
    let idEmployee = parseInt(data.idEmployee);  
    let idCustomer = parseInt(data.idCustomer);  
    
    let query1 = `UPDATE Sales SET purchaseDate = ?, totalProducts = ?, idEmployee = ?, idCustomer = ? WHERE idSale = ?;`;
    db.pool.query(query1, [data['purchaseDate'], totalProducts, idEmployee, idCustomer, idSale], function(err, rows, fields) {
        if (err) {
            console.log(err);
            res.sendStatus(400);
        } else {
            res.send(rows);
            }
        }
    );
});

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
