function getacall(event) {
  event.preventDefault();

  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var phoneNumber = document.getElementById('tel').value;
  var date = document.getElementById('date').value;
  var time = document.getElementById('time').value;

  var userDetails = {
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      date: date,
      time: time
  };
  axios.post('https://crudcrud.com/api/48998a2332e14822918da7c675ae6853/userdetails', userDetails)
  .then(function (response) {
    // Handle the API response if needed (optional)
    console.log('User details successfully stored in the cloud:', response.data);
    
    // Call the function to show the user details on the web page
    showUserDetails(response.data);
  })
  .catch(function (error) {
    console.error('Error storing user details in the cloud:', error);
    // Handle the error if needed (optional)
  });
}
  // Retrieve existing user details from local storage
//   var existingDetails = JSON.parse(localStorage.getItem('userDetails'));

//   if (existingDetails) {
//       // If there are existing user details, append the new user details
//       existingDetails.push(userDetails);
//       localStorage.setItem('userDetails', JSON.stringify(existingDetails)); 
    
//   } else {
//       // If there are no existing user details, create a new array with the current user details
//       var newDetails = [userDetails];
//       localStorage.setItem('userDetails', JSON.stringify(newDetails));
//   }

window.addEventListener("DOMContentLoaded",()=> {
    axios.get('https://crudcrud.com/api/48998a2332e14822918da7c675ae6853/userdetails')
    .then(function (response) {
       
        console.log('User details successfully stored in the cloud:', response.data);
        
        for (let i=0 ; i<response.data.length ; i++){
        showUserDetails(response.data[i]);}
      })
      .catch(function (error) {
        console.error('Error storing user details in the cloud:', error);
      
      });
})



















function showUserDetails(user) {
    // Display the user details on the web page
    var userDetailsContainer = document.createElement("div");
    userDetailsContainer.innerHTML = "<h3>User Details:</h3>" +
      "<p>Name: " + user.name + "</p>" +
      "<p>Email: " + user.email + "</p>" +
      "<p>Phone Number: " + user.phoneNumber + "</p>" +
      "<p>Time for Call: " + user.date + " " + user.time + "</p>";

  // Create a delete button
  var deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", function () {
      userDetailsContainer.remove(); // Remove the userDetailsContainer from the DOM

      // Retrieve existing user details from local storage
     // var storedDetails = JSON.parse(localStorage.getItem('userDetails'));

      // Find the index of the user details to be deleted
    //   var index = storedDetails.findIndex(function (detail) {
    //       return detail.name === name && detail.email === email && detail.phoneNumber === phoneNumber;
    //   });

    //   if (index !== -1) {
    //       // Remove the user details from the stored array
    //       storedDetails.splice(index, 1);
    //       localStorage.setItem('userDetails', JSON.stringify(storedDetails));
    //   }
  });


  // Append the delete button to the userDetailsContainer
  userDetailsContainer.appendChild(deleteButton);

  document.body.appendChild(userDetailsContainer);
}