
// Get the objects we need to modify
let updatePlantForm = document.getElementById('update-plant-form-ajax');

// Modify the objects we need
updatePlantForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputPName = document.getElementById("mySelect-update");
    // let inputPlantName = document.getElementById("input-plantName-update");
    let inputLighting = document.getElementById("input-lighting-update");
    let inputWater = document.getElementById("input-water-update");
    let inputSeason = document.getElementById("input-season-update");
    let inputIsToxic = document.getElementById("input-isToxic-update");

    // Get the values from the form fields
    let pNameValue = inputPName.value;
    // let plantNameValue = inputPlantName.value;
    let lightingValue = inputLighting.value;
    let waterValue = inputWater.value;
    let seasonValue = inputSeason.value;
    let isToxicValue = inputIsToxic.value;

    // currently the database table for bsg_people does not allow updating values to NULL
    // so we must abort if being bassed NULL for homeworld

    if (isNaN(isToxicValue)) 
    {
        return;
    }

    // Put our data we want to send in a javascript object
    let data = {
        pName: pNameValue,
        // plantName: plantNameValue,
        lighting: lightingValue,
        water: waterValue,
        season: seasonValue,
        isToxic: isToxicValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-plant-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, plantNameValue);

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


function updateRow(data, idPlant){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("plants-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == idPlant) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];
            
            // Get td of homeworld value
            // let plantNametd = updateRowIndex.getElementsByTagName("td")[1];
            let lightingtd = updateRowIndex.getElementsByTagName("td")[2];
            let watertd = updateRowIndex.getElementsByTagName("td")[3];
            let seasontd = updateRowIndex.getElementsByTagName("td")[4];
            let isToxictd = updateRowIndex.getElementsByTagName("td")[5];

            // Reassign homeworld to our value we updated to
            // plantNametd.innerHTML = parsedData[0].plantName; 
            lightingtd.innerHTML = parsedData[0].lighting; 
            watertd.innerHTML = parsedData[0].water; 
            seasontd.innerHTML = parsedData[0].season; 
            isToxictd.innerHTML = parsedData[0].isToxic; 
       }
    }
}
