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
        appendMessage("AI Bot", data.response); // Assuming your API response has a 'response' field
      })
      .catch((error) => {
        console.error("Error:", error);
        appendMessage("AI Bot", "Sorry, an error occurred."); // Display error message in chat box
      });

    document.getElementById("user-input").value = ""; // Clear input field
  }
}

function appendMessage(sender, message) {
  console.log(message);
  var chatBox = document.getElementById("chat-box");

  var messageElement = document.createElement("div");
  messageElement.innerHTML = `<strong>${sender}:</strong>`;
  chatBox.appendChild(messageElement);

  // Remove the leading and trailing ``` characters
  message = message.slice(3, -3);

  // Wrap the code block with <pre> and <code> tags
  var codeBlock = document.createElement("pre");
  var codeElement = document.createElement("code");
  codeElement.textContent = message.trim(); // Remove leading/trailing whitespace
  codeBlock.appendChild(codeElement);
  messageElement.appendChild(codeBlock);

  chatBox.scrollTop = chatBox.scrollHeight; // Scroll to bottom
}
