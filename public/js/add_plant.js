// Get the objects we need to modify
let addPlantForm = document.getElementById('add-plant-form-ajax');

// Modify the objects we need
addPlantForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputPlantName = document.getElementById("mySelect");
    let inputLighting = document.getElementById("input-lighting");
    let inputWater = document.getElementById("input-water");
    let inputSeason = document.getElementById("input-season");
    let inputIsToxic = document.getElementById("input-isToxic");

    // Get the values from the form fields
    let PlantNameValue = inputPlantName.value;
    let lightingValue = inputLighting.value;
    let waterValue = inputWater.value;
    let seasonValue = inputSeason.value;
    let isToxicValue = inputIsToxic.value;

    // Put our data we want to send in a javascript object
    let data = {
        plantName: PlantNameValue,
        lighting: lightingValue,
        water: waterValue,
        season: seasonValue,
        isToxic: isToxicValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-plant-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputPlantName.value = '';
            inputLighting.value = '';
            inputWater.value = '';
            inputSeason.value = '';
            inputIsToxic.value = '';
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
    let currentTable = document.getElementById("plants-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idPlantCell = document.createElement("TD");
    let plantNameCell = document.createElement("TD");
    let lightingCell = document.createElement("TD");
    let waterCell = document.createElement("TD");
    let seasonCell = document.createElement("TD");
    let isToxicCell = document.createElement("TD");
    // let idProductCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");


    // Fill the cells with correct data
    idPlantCell.innerText = newRow.idPlant;
    plantNameCell.innerText = newRow.plantName;
    lightingCell.innerText = newRow.lighting;
    waterCell.innerText = newRow.water;
    seasonCell.innerText = newRow.season;
    isToxicCell.innerText = newRow.isToxic;
    // idProductCell.innerText = newRow.idProduct;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteCustomer(newRow.id);
    };

    // Add the cells to the row 
    row.appendChild(idPlantCell);
    row.appendChild(plantNameCell);
    row.appendChild(lightingCell);
    row.appendChild(waterCell);
    row.appendChild(seasonCell);
    row.appendChild(isToxicCell);
    // row.appendChild(idProductCell);


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