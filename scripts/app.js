const chatList = document.querySelector(".chat-list");
const messageInput = document.querySelector(".new-chat");
const usernameInput = document.querySelector(".new-name");
const updateUsername = document.querySelector(".update-message");
// Using event delegation.
const rooms = document.querySelector(".chat-rooms")

const username = localStorage.username ? localStorage.username : "ANON";
const userInterface = new UserInterface(chatList);
const chat = new Chat("general", username);

chat.getMessages(message => userInterface.render(message));

messageInput.addEventListener("submit", e => {
    e.preventDefault();
    const newMessage = messageInput.message.value.trim();
    chat.addMessage(newMessage)
        .then(() => messageInput.reset())
        .catch((error) => console.log(error));
});

usernameInput.addEventListener("submit", e => {
    e.preventDefault();
    const newUsername = usernameInput.name.value.trim();
    chat.updateUsername(newUsername);

    usernameInput.reset();

    updateUsername.innerText = `Your name was updated, new username: ${newUsername}`;
    setTimeout(() => updateUsername.innerText = "", 3000);
});

rooms.addEventListener("click", e => {
    if (e.target.tagName === "BUTTON") {
        userInterface.clear();
        chat.updateRoom(e.target.getAttribute("id"));
        chat.getMessages(message => userInterface.render(message));
    }
});