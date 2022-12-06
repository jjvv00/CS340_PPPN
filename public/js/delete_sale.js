function deleteSale(idSale) {
    // Put our data we want to send in a javascript object
    let data = {
        id: idSale
    };
  
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-sale-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");
  
    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
  
            // Add the new data to the table
            deleteRow(idSale);
  
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    xhttp.onload = function() {
      location.reload();
    };
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
  }
  
  
  function deleteRow(idSale){
  
    let table = document.getElementById("sales-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == idSale) {
            table.deleteRow(i);
            deleteDropDownMenu(idSale);
            break;
       }
    }
  }
  
  function deleteDropDownMenu(idSale){
  let selectMenu = document.getElementById("mySelect");
  for (let i = 0; i < selectMenu.length; i++){
    if (Number(selectMenu.options[i].value) === Number(idSale)){
      selectMenu[i].remove();
      break;
    } 
  
  }
  }