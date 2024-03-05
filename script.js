const { response } = require("express");

function sendMessage() {
  var userInput = document.getElementById("user-input").value;
  if (userInput.trim() !== "") {
    appendMessage("You", userInput);

    // Make an HTTP POST request to your backend API
    fetch("https://my-chatbot-backend.onrender.com/my-ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userInput }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the backend API
        appendMessage("AI Bot", data.response);
        console.log(data.response); // Assuming your API response has a 'response' field
      })
      .catch((error) => {
        console.error("Error:", error);
        appendMessage("AI Bot", "Sorry, an error occurred."); // Display error message in chat box
      });

    document.getElementById("user-input").value = ""; // Clear input field
  }
}

function appendMessage(sender, message) {
  var chatBox = document.getElementById("chat-box");

  var messageElement = document.createElement("div");
  messageElement.innerHTML = `<strong>${sender}:</strong>`;
  chatBox.appendChild(messageElement);

  // Split the code block by newline characters
  var lines = message.split("\n");

  // Create a <code> element for each line and append it to the message element
  lines.forEach(function (line) {
    var codeElement = document.createElement("code");
    codeElement.textContent = line;
    messageElement.appendChild(document.createElement("br")); // Add line break
    messageElement.appendChild(codeElement);
  });

  chatBox.scrollTop = chatBox.scrollHeight; // Scroll to bottom
}
