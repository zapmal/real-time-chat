class Chat {
    constructor(room, username) {
        this.room = room;
        this.username = username;
        this.chats = database.collection("chats");
        this.unsubscribe;
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
        this.unsubscribe = this.chats
            .where("room", "==", this.room)
            .orderBy("sent_at")
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if (change.type === "added") {
                        // update UI.
                        callback(change.doc.data());
                    }
                });
            });
    }
    updateUsername(username) {
        this.username = username;

    }
    updateRoom(room) {
        this.room = room;

        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }
}