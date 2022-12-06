
// Get the objects we need to modify
let updateProductForm = document.getElementById('update-product-form-ajax');

// Modify the objects we need
updateProductForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputPName = document.getElementById("mySelect");
    let inputName = document.getElementById("input-name-update");
    let inputPrice = document.getElementById("input-price-update");

    // Get the values from the form fields
    let pNameValue = inputPName.value;
    let nameValue = inputName.value;
    let priceValue = inputPrice.value;

    // currently the database table for bsg_people does not allow updating values to NULL
    // so we must abort if being bassed NULL for homeworld
    if (isNaN(priceValue)) 
    {
        return;
    }

    // Put our data we want to send in a javascript object
    let data = {
        pname: pNameValue,
        name: nameValue,
        price: priceValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-product-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, fullNameValue);

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


function updateRow(data, idProduct){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("products-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == 
       ) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];
            
            // Get td of homeworld value
            let nametd = updateRowIndex.getElementsByTagName("td")[1];
            let pricetd = updateRowIndex.getElementsByTagName("td")[2];

            // Reassign homeworld to our value we updated to
            nametd.innerHTML = parsedData[0].name; 
            pricetd.innerHTML = parsedData[0].price; 

       }
    }
}
