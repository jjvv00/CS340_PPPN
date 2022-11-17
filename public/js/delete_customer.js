// function deleteCustomer(idCustomer) {
//   let link = '/delete-customer-ajax/';
//   let data = {
//     id: idCustomer
//   };

//   $.ajax({
//     url: link,
//     type: 'DELETE',
//     data: JSON.stringify(data),
//     contentType: "application/json; charset=utf-8",
//     success: function(result) {
//       deleteRow(idCustomer);
//     }
//   });
// }

// function deleteRow(idCustomer){
//     let table = document.getElementById("customers-table");
//     for (let i = 0, row; row = table.rows[i]; i++) {
//        if (table.rows[i].getAttribute("data-value") == idCustomer) {
//             table.deleteRow(i);
//             break;
//        }
//     }
// }
function deleteCustomer(idCustomer) {
  // Put our data we want to send in a javascript object
  let data = {
      id: idCustomer
  };

  // Setup our AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", "/delete-customer-ajax", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  // Tell our AJAX request how to resolve
  xhttp.onreadystatechange = () => {
      if (xhttp.readyState == 4 && xhttp.status == 204) {

          // Add the new data to the table
          deleteRow(idCustomer);

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


function deleteRow(idCustomer){

  let table = document.getElementById("customers-table");
  for (let i = 0, row; row = table.rows[i]; i++) {
     //iterate through rows
     //rows would be accessed using the "row" variable assigned in the for loop
     if (table.rows[i].getAttribute("data-value") == idCustomer) {
          table.deleteRow(i);
          deleteDropDownMenu(idCustomer);
          break;
     }
  }
}

function deleteDropDownMenu(idCustomer){
let selectMenu = document.getElementById("mySelect");
for (let i = 0; i < selectMenu.length; i++){
  if (Number(selectMenu.options[i].value) === Number(idCustomer)){
    selectMenu[i].remove();
    break;
  } 

}
}