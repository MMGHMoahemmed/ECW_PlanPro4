import { GoogleGenerativeAI } from "@google/generative-ai";


var xhReq = new XMLHttpRequest();
xhReq.open("GET", "https://ecwnmo-default-rtdb.firebaseio.com/tasks.json", false);
xhReq.send(null);
var jsonObject = JSON.parse(xhReq.responseText);




// --- Date Formatting Logic ---

// Array of date fields to convert
const dateFields = [
  "PO_Date", "PR_Date", "Reporting_Date_End", "Reporting_Date_Start",
  "end_date", "implemented_end", "implemented_start", "start_date"
];

// Function to convert epoch to formatted date string
function formatDate(epochTime) {
  if (epochTime && typeof epochTime === 'number') {
      const date = new Date(epochTime);
      return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }); // You can customize the format here
  }
  return epochTime; // Return original value if not a valid epoch time
}

// Iterate through each task object and format dates
const formattedTaskData = Array.isArray(jsonObject) ? jsonObject.map(task => { // Handle if jsonObject is an array
  const formattedTask = { ...task };
  dateFields.forEach(field => {
      formattedTask[field] = formatDate(formattedTask[field]);
  });
  return formattedTask;
}) : Object.keys(jsonObject).length > 0 ? Object.entries(jsonObject).reduce((acc, [key, task]) => { // Handle if jsonObject is an object
  const formattedTask = { ...task };
  dateFields.forEach(field => {
      formattedTask[field] = formatDate(formattedTask[field]);
  });
  acc[key] = formattedTask;
  return acc;
}, {}) : jsonObject; // Return original jsonObject if it's empty or not array/object


// Now use formattedTaskData to stringify for businessInfo
const datajson = JSON.stringify(formattedTaskData);





var final = 'Please use the fllowing project database in your answers' + datajson;

const businessInfo = final;



const API_KEY = "AIzaSyD1svR63zy441xYElv_YSb386BdrGjFJA8";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    systemInstruction: businessInfo
});








const typingForm = document.querySelector(".typing-form");
const chatContainer = document.querySelector(".chat-list");
const suggestions = document.querySelectorAll(".suggestion");
const toggleThemeButton = document.querySelector("#theme-toggle-button");
const deleteChatButton = document.querySelector("#delete-chat-button");




const chathistorydiv = document.querySelector(".chathistory");

chathistorydiv.innerHTML = localStorage.getItem("saved-chats");




const chatHistory = { history: [] };


function parseChatHistory(htmlString) {
  
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  const messageDivs = doc.querySelectorAll('.message');

  messageDivs.forEach(messageDiv => {
    const isOutgoing = messageDiv.classList.contains('outgoing');
    const role = isOutgoing ? 'user' : 'model';
    const pTag = messageDiv.querySelector('p.text');
    let text = "";
    if (pTag) {
      text = pTag.textContent.trim();
    }

    chatHistory.history.push({
      role: role,
      parts: [{ text: text }]
    });
  });

  return console.log(chatHistory);
}
parseChatHistory(chathistorydiv.innerHTML);





// State variables
let userMessage = null;
let isResponseGenerating = false;

// API configuration


// Load theme and chat data from local storage on page load
const loadDataFromLocalstorage = () => {
  const savedChats = localStorage.getItem("saved-chats");
  const isLightMode = (localStorage.getItem("themeColor") === "light_mode");

  // Apply the stored theme
  document.body.classList.toggle("light_mode", isLightMode);
  toggleThemeButton.innerText = isLightMode ? "dark_mode" : "light_mode";

  // Restore saved chats or clear the chat container
  chatContainer.innerHTML = savedChats || '';
  document.body.classList.toggle("hide-header", savedChats);

  chatContainer.scrollTo(0, chatContainer.scrollHeight); // Scroll to the bottom
}

// Create a new message element and return it
const createMessageElement = (content, ...classes) => {
  const div = document.createElement("div");
  div.classList.add("message", ...classes);
  div.innerHTML = content;
  return div;
}

// Show typing effect by displaying words one by one
const showTypingEffect = (text, textElement, incomingMessageDiv) => {
  const words = text.split(' ');
  let currentWordIndex = 0;

  const typingInterval = setInterval(() => {
    // Append each word to the text element with a space
    textElement.innerText += (currentWordIndex === 0 ? '' : ' ') + words[currentWordIndex++];
    incomingMessageDiv.querySelector(".icon").classList.add("hide");

    // If all words are displayed
    if (currentWordIndex === words.length) {
      clearInterval(typingInterval);
      isResponseGenerating = false;
      incomingMessageDiv.querySelector(".icon").classList.remove("hide");
      localStorage.setItem("saved-chats", chatContainer.innerHTML); // Save chats to local storage
    }
    chatContainer.scrollTo(0, chatContainer.scrollHeight); // Scroll to the bottom
  }, 75);
}

// Fetch response from the API based on user message
const generateAPIResponse = async (incomingMessageDiv) => {
  const textElement = incomingMessageDiv.querySelector(".text"); // Getting text element

if (userMessage.length) {

    try {


        const chat = model.startChat(chatHistory);

        console.log("After const chat = model.startChat(messages)");

        //equall respone in old api
        let response = await chat.sendMessageStream(userMessage);

        console.log("After let response = await chat.sendMessageStream(userMessage)");

        //const data = await response.json();

        //console.log("The data",data);

        //if (!response.ok) throw new Error(data.error.message);
        

        let apiResponse = "";

        for await (const chunk of response.stream) {
        const chunkText = chunk.text();

        apiResponse += chunkText;
        
  

        }
        showTypingEffect(apiResponse, textElement, incomingMessageDiv); // Show typing effect

        
        chatHistory.history.push({
          role: "user",
          parts: [{ text: userMessage }],
      });

      chatHistory.history.push({
        role: "model",
        parts: [{ text: apiResponse}],
    });
      
    console.log(chatHistory);

    } catch (error) {
        isResponseGenerating = false;
        textElement.innerText = error.message;
        textElement.parentElement.closest(".message").classList.add("error");
    }

    incomingMessageDiv.classList.remove("loading");
    
}




}

// Show a loading animation while waiting for the API response
const showLoadingAnimation = () => {
  const html = `<div class="message-content">
                  <img class="avatar" src="Sources/img/gemini.svg" alt="Gemini avatar">
                  <p class="text"></p>
                  <div class="loading-indicator">
                    <div class="loading-bar"></div>
                    <div class="loading-bar"></div>
                    <div class="loading-bar"></div>
                  </div>
                </div>
                <span onClick="copyMessage(this)" class="icon material-symbols-rounded">content_copy</span>`;

  const incomingMessageDiv = createMessageElement(html, "incoming", "loading");
  chatContainer.appendChild(incomingMessageDiv);

  chatContainer.scrollTo(0, chatContainer.scrollHeight); // Scroll to the bottom
  generateAPIResponse(incomingMessageDiv);
}

// Copy message text to the clipboard
const copyMessage = (copyButton) => {
  const messageText = copyButton.parentElement.querySelector(".text").innerText;

  navigator.clipboard.writeText(messageText);
  copyButton.innerText = "done"; // Show confirmation icon
  setTimeout(() => copyButton.innerText = "content_copy", 1000); // Revert icon after 1 second
}

// Handle sending outgoing chat messages
const handleOutgoingChat = () => {

  userMessage = typingForm.querySelector(".typing-input").value.trim() || userMessage;


  if(!userMessage || isResponseGenerating) return; // Exit if there is no message or response is generating

  isResponseGenerating = true;

  const html = `<div class="message-content">
                  <img class="avatar" src="Sources/img/profile-pic.png" alt="User avatar">
                  <p class="text"></p>
                </div>`;



  const outgoingMessageDiv = createMessageElement(html, "outgoing");
  outgoingMessageDiv.querySelector(".text").innerText = userMessage;
  chatContainer.appendChild(outgoingMessageDiv);
  
  typingForm.reset(); // Clear input field

  document.body.classList.add("hide-header");
  chatContainer.scrollTo(0, chatContainer.scrollHeight); // Scroll to the bottom
  setTimeout(showLoadingAnimation, 500); // Show loading animation after a delay
}

// Toggle between light and dark themes
toggleThemeButton.addEventListener("click", () => {
  const isLightMode = document.body.classList.toggle("light_mode");
  localStorage.setItem("themeColor", isLightMode ? "light_mode" : "dark_mode");
  toggleThemeButton.innerText = isLightMode ? "dark_mode" : "light_mode";
});

// Delete all chats from local storage when button is clicked
deleteChatButton.addEventListener("click", () => {
  if (confirm("Are you sure you want to delete all the chats?")) {
    localStorage.removeItem("saved-chats");
    loadDataFromLocalstorage();
  }
});

// Set userMessage and handle outgoing chat when a suggestion is clicked
suggestions.forEach(suggestion => {
  suggestion.addEventListener("click", () => {
    userMessage = suggestion.querySelector(".text").innerText;
    handleOutgoingChat();
  });
});

// Prevent default form submission and handle outgoing chat
typingForm.addEventListener("submit", (e) => {
  e.preventDefault(); 
  handleOutgoingChat();
});


loadDataFromLocalstorage();

