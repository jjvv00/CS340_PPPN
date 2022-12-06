
// Get the objects we need to modify
let updateSaleForm = document.getElementById('update-sale-form-ajax');

// Modify the objects we need
updateSaleForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputIdSale = document.getElementById("mySelect");
    let inputPurchaseDate = document.getElementById("input-purchaseDate-update");
    let inputTotalProducts = document.getElementById("input-totalProducts-update");
    let inputIdEmployee = document.getElementById("mySelect-employee-update");
    let inputIdCustomer = document.getElementById("mySelect-customer-update");

    // Get the values from the form fields
    let idSaleValue = inputIdSale.value;
    let purchaseDateValue = inputPurchaseDate.value;
    let totalProductsValue = inputTotalProducts.value;
    let idEmployeeValue = inputIdEmployee.value;
    let idCustomerValue = inputIdCustomer.value;

    // currently the database table for bsg_people does not allow updating values to NULL
    // so we must abort if being bassed NULL for homeworld

    if (isNaN(idSaleValue)) 
    {
        return;
    }
    if (isNaN(totalProductsValue)) 
    {
        return;
    }
    if (isNaN(idEmployeeValue)) 
    {
        return;
    }if (isNaN(idCustomerValue)) 
    {
        return;
    }

    // Put our data we want to send in a javascript object
    let data = {
        idSale: idSaleValue,
        purchaseDate: purchaseDateValue,
        totalProducts: totalProductsValue,
        idEmployee: idEmployeeValue,
        idCustomer: idCustomerValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-sale-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, idSaleValue);

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


function updateRow(data, idSale){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("sales-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == idSale) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];
            
            // Get td of homeworld value
            let purchaseDatetd = updateRowIndex.getElementsByTagName("td")[1];
            let totalProductstd = updateRowIndex.getElementsByTagName("td")[2];
            let idEmployeetd = updateRowIndex.getElementsByTagName("td")[3];
            let idCustomertd = updateRowIndex.getElementsByTagName("td")[4];

            // Reassign homeworld to our value we updated to
            purchaseDatetd.innerHTML = parsedData[0].purchaseDate; 
            totalProductstd.innerHTML = parsedData[0].totalProducts; 
            idEmployeetd.innerHTML = parsedData[0].idEmployee; 
            idCustomertd.innerHTML = parsedData[0].idCustomer; 
       }
    }
}
