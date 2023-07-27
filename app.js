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
  
  window.addEventListener("DOMContentLoaded", () => {
    axios.get('https://crudcrud.com/api/48998a2332e14822918da7c675ae6853/userdetails')
      .then(function (response) {
        console.log('User details successfully retrieved from the cloud:', response.data);
  
        for (let i = 0; i < response.data.length; i++) {
          showUserDetails(response.data[i]);
        }
      })
      .catch(function (error) {
        console.error('Error retrieving user details from the cloud:', error);
      });
  });
  
  function showUserDetails(user) {
    var userDetailsContainer = document.createElement("div");
    userDetailsContainer.innerHTML = "<h3>User Details:</h3>" +
      "<p>Name: " + user.name + "</p>" +
      "<p>Email: " + user.email + "</p>" +
      "<p>Phone Number: " + user.phoneNumber + "</p>" +
      "<p>Time for Call: " + user.date + " " + user.time + "</p>";
  
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function () {
      deleteUserDetail(user._id);
      userDetailsContainer.remove();
    });
  
    var editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", function () {
      // Set the form values to the stored user details for editing
      document.getElementById('name').value = user.name;
      document.getElementById('email').value = user.email;
      document.getElementById('tel').value = user.phoneNumber;
      document.getElementById('date').value = user.date;
      document.getElementById('time').value = user.time;
  
      userDetailsContainer.remove(); // Remove the userDetailsContainer from the DOM
  
      var updatedUserDetails = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phoneNumber: document.getElementById('tel').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value
      };
  
      // Update the user details in the cloud storage using Axios
      axios.put('https://crudcrud.com/api/48998a2332e14822918da7c675ae6853/userdetails/' + user._id, updatedUserDetails)
        .then(function (response) {
          console.log('User details updated successfully:', response.data);
          // Call the function to show the updated user details on the web page
          showUserDetails(response.data);
        })
        .catch(function (error) {
          console.error('Error updating user details:', error);
        });
    });
  
    userDetailsContainer.appendChild(deleteButton);
    userDetailsContainer.appendChild(editButton);
  
    document.body.appendChild(userDetailsContainer);
  }
  
  function deleteUserDetail(userId) {
    axios.delete('https://crudcrud.com/api/48998a2332e14822918da7c675ae6853/userdetails/' + userId)
      .then(function (response) {
        console.log('User detail deleted successfully:', response.data);
      })
      .catch(function (error) {
        console.error('Error deleting user detail:', error);
      });
  }
  