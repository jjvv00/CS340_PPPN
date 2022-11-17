
// Get the objects we need to modify
let updateCustomerForm = document.getElementById('update-customer-form-ajax');

// Modify the objects we need
updateCustomerForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputFullName = document.getElementById("mySelect");
    let inputFirstName = document.getElementById("input-firstName-update");
    let inputLastName = document.getElementById("input-lastName-update");
    let inputEmail = document.getElementById("input-email-update");
    let inputPhone = document.getElementById("input-phone-update");
    let inputAddress = document.getElementById("input-address-update");

    // Get the values from the form fields
    let fullNameValue = inputFullName.value;
    let firstNameValue = inputFirstName.value;
    let lastNameValue = inputLastName.value;
    let emailValue = inputEmail.value;
    let phoneValue = inputPhone.value;
    let addressValue = inputAddress.value;

    // currently the database table for bsg_people does not allow updating values to NULL
    // so we must abort if being bassed NULL for homeworld
    if (isNaN(phoneValue)) 
    {
        return;
    }

    // Put our data we want to send in a javascript object
    let data = {
        fullname: fullNameValue,
        firstName: firstNameValue,
        lastName: lastNameValue,
        email: emailValue,
        phone: phoneValue,
        address: addressValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-customer-ajax", true);
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


function updateRow(data, idCustomer){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("customers-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == idCustomer) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];
            
            // Get td of homeworld value
            let firstNametd = updateRowIndex.getElementsByTagName("td")[1];
            let lastNametd = updateRowIndex.getElementsByTagName("td")[2];
            let emailtd = updateRowIndex.getElementsByTagName("td")[3];
            let phonetd = updateRowIndex.getElementsByTagName("td")[4];
            let addresstd = updateRowIndex.getElementsByTagName("td")[5];

            // Reassign homeworld to our value we updated to
            firstNametd.innerHTML = parsedData[0].firstName; 
            lastNametd.innerHTML = parsedData[0].lastName; 
            emailtd.innerHTML = parsedData[0].email; 
            phonetd.innerHTML = parsedData[0].phone; 
            addresstd.innerHTML = parsedData[0].address; 
       }
    }
}
