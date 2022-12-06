// Get the objects we need to modify
let addSaleForm = document.getElementById('add-sale-form-ajax');

// Modify the objects we need
addSaleForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputPurchaseDate = document.getElementById("input-purchaseDate");
    let inputTotalProducts = document.getElementById("input-totalProducts");
    let inputIdEmployee = document.getElementById("mySelect-employee");
    let inputIdCustomer = document.getElementById("mySelect-customer");


    // Get the values from the form fields
    let puchaseDateValue = inputPurchaseDate.value;
    let totalProductsValue = inputTotalProducts.value;
    let idEmployeeValue = inputIdEmployee.value;
    let idCustomerValue = inputIdCustomer.value;

    // Put our data we want to send in a javascript object
    let data = {
        purchaseDate: puchaseDateValue,
        totalProducts: totalProductsValue,
        idEmployee: idEmployeeValue,
        idCustomer: idCustomerValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-sale-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputPurchaseDate.value = '';
            inputTotalProducts.value = '';
            inputIdEmployee.value = '';
            inputIdCustomer.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }
    xhttp.onload = function() {
        location.reload();
    };

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// bsg_people
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("sales-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let purchaseDateCell = document.createElement("TD");
    let totalProductsCell = document.createElement("TD");
    let idEmployeeCell = document.createElement("TD");
    let idCustomerCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.idSale;
    purchaseDateCell.innerText = newRow.purchaseDate;
    totalProductsCell.innerText = newRow.totalProducts;
    idEmployeeCell.innerText = newRow.idEmployee;
    idCustomerCell.innerText = newRow.idCustomer;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteEmployee(newRow.id);
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(purchaseDateCell);
    row.appendChild(totalProductsCell);
    row.appendChild(idEmployeeCell);
    row.appendChild(idCustomerCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.id);
    
    // Add the row to the table
    currentTable.appendChild(row);

    // let option = document.createElement("option");
    // option.value = newRow.idCustomer;

    // Start of new Step 8 code for adding new data to the dropdown menu for updating people
    
    // Find drop down menu, create a new option, fill data in the option (full name, id),
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let selectMenu = document.getElementById("mySelect");
    let option = document.createElement("option");
    option.text = newRow.firstName + ' ' +  newRow.lastName;
    option.value = newRow.id;
    selectMenu.add(option);
    // End of new step 8 code.
}