class Chat {
    constructor(room, username) {
        this.room = room;
        this.username = username;
        this.chats = database.collection("chats");
    }
    async addMessage(message) {
        const now = new Date();
        const chat = {
            message, // message: message
            username: this.username,
            room: this.room,
            sent_at: firebase.firestore.Timestamp.fromDate(now)
        };

        const response = await this.chats.add(chat);
        return response; // return this.
    }
    getMessages(callback) {
        this.chats
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if (change.type === "added") {
                        // update UI.
                        callback(change.doc.data());
                    }
                });
            });
    }
}

const chatroom = new Chat("gaming", "shaun");

chatroom.getMessages(data => {
    console.log(data);
});