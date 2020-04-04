const chatList = document.querySelector(".chat-list");
const userInterface = new UserInterface(chatList);
const chat = new Chat("general", "mike");

chat.getMessages(message => userInterface.render(message));

