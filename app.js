// App.js

/*
    SETUP
*/

var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

// PORT        = 9148;                 // Set a port number at the top so it's easy to change in the future
PORT        = 9158;
// Database
var db = require('./database/db-connector')

// HBS
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.
/*
    ROUTES
*/

app.get('/', function(req, res)
{
    res.render('index');                    // Note the call to render() and not send(). Using render() ensures the templating engine
});                                         // will process this file, before sending the finished HTML to the client.

// Customer CRUD

app.get('/customers', function(req, res)
    {  
        let query1 = "SELECT * FROM Customers;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('customers', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });
app.post('/add-customer-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let phone = parseInt(data.phone);
    if (isNaN(phone))
    {
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
        }
        else
        {
            res.redirect('/customers');
        }
    })
});
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
              }
              else
            {
                res.redirect('/customers');
            }
  })});

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

// Employee Crud
app.get('/employees', function(req, res)
    {  
        let query1 = "SELECT * FROM Employees;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('employees', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });
app.post('/add-employee-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let payRate = parseInt(data.payRate);
    let phone = parseInt(data.phone);
    if (isNaN(payRate))
    {
        payRate = 'NULL'
    }
    if (isNaN(phone))
    {
        phone = 'NULL'
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO Employees (payRate, firstName, lastName, email, phone, address) VALUES (${payRate}, '${data.firstName}', '${data.lastName}', '${data.email}',${phone} , '${data.address}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            res.redirect('/employees');
        }
    })
});
app.delete('/delete-employee-ajax/', function(req,res,next){
    let data = req.body;
    let idEmployee = parseInt(data.id);
    // console.log(idCustomer);
    let deleteEmployee = `DELETE FROM Employees WHERE idEmployee = ?;`;  
  
          // Run the 1st query
          db.pool.query(deleteEmployee, [idEmployee], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
              else
            {
                res.redirect('/employees');
            }
  })});

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

// Product CRUD 
app.get('/products', function(req, res)
    {  
        let query1 = "SELECT * FROM Products;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('products', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });
app.post('/add-product-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let price = parseFloat(data.price);
    if (isNaN(price))
    {
        [price] = 'NULL'
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO Products (name, price) VALUES ('${data.name}', ${price})`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            res.redirect('/products');
        }
    })
});
app.delete('/delete-product-ajax/', function(req,res,next){
    let data = req.body;
    let idProduct = parseInt(data.id);
    let deleteProduct = `DELETE FROM Products WHERE idProduct = ?;`;  
  
          // Run the 1st query
          db.pool.query(deleteProduct, [idProduct], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
              else
            {
                res.redirect('/products');
            }
  })});
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

// Plant CRUD

app.get('/plants', function(req, res)
    {  
    // Declare Query 1
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
app.post('/add-plant-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let isToxic = parseInt(data.isToxic);
    if (isNaN(isToxic))
    {
        isToxic = 'NULL'
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO Plants (plantName, lighting, water, season, isToxic) VALUES ('${data.plantName}', '${data.lighting}', '${data.water}', '${data.season}', ${isToxic})`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            res.redirect('/plants');
        }
    })
});

app.delete('/delete-plant-ajax/', function(req,res,next){
    let data = req.body;
    let idPlant = parseInt(data.id);
    let deletePlant = `DELETE FROM Plants WHERE idPlant = ?;`;  
  
          // Run the 1st query
          db.pool.query(deletePlant, [idPlant], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
              else
            {
                res.redirect('/plants');
            }
  })});

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

// sales CRUD

// app.get('/sales', function(req, res)
//     {  
//         let query1 = "SELECT * FROM Sales;";               // Define our query

//         db.pool.query(query1, function(error, rows, fields){    // Execute the query

//             res.render('sales', {data: rows});                  // Render the index.hbs file, and also send the renderer
//         })                                                      // an object where 'data' is equal to the 'rows' we
//     });


app.get('/sales', function(req, res)
{  
// Declare Query 1
let query1 = "SELECT * FROM Sales;";

// Query 2 is the same in both cases
let query2 = "SELECT * FROM Customers;";

let query3 = "SELECT * FROM Employees;";

// Run the 1st query
db.pool.query(query1, function(error, rows, fields){
    
    // Save the people
    let sales = rows;
    
    // Run the second query
    db.pool.query(query2, (error, rows, fields) => {
        
        // Save the planets
        let customers = rows;

        // Run the third query
        db.pool.query(query3, (error, rows, fields) => {
        
            // Save the planets
            let employees = rows;
            return res.render('sales', {data: sales, customers: customers, employees: employees});
        })
    })  
})
});

app.post('/add-sale-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let totalProducts = parseInt(data.totalProducts);
    let idCustomer = parseInt(data.idCustomer);
    let idEmployee = parseInt(data.idEmployee);

    if (isNaN(totalProducts))
    {
        totalProducts = 'NULL'
    }
    if (isNaN(idCustomer))
    {
        idCustomer = 'NULL'
    }
    if (isNaN(idEmployee))
    {
        idEmployee = 'NULL'
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO Sales (purchaseDate, totalProducts, idCustomer, idEmployee) VALUES ('${data.purchaseDate}', '${totalProducts}', '${idCustomer}', ${idEmployee})`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            res.redirect('/sales');
        }
    })
});

app.delete('/delete-sale-ajax/', function(req,res,next){
    let data = req.body;
    let idSale = parseInt(data.id);
    let deleteSale = `DELETE FROM Sales WHERE idSale = ?;`;  
  
          // Run the 1st query
          db.pool.query(deleteSale, [idSale], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
              else
            {
                res.redirect('/sales');
            }
  })});

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
