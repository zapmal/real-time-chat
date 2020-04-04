class UserInterface {
    constructor(list) {
        this.list = list;
    }
    render(data) {
        // todo: format sent_at
        const html = `
        <li class="list-group-item">
            <span class="username">${data.username}</span>
            <span class="message">${data.message} </span>
            <div class="time">${data.sent_at.toDate()}</div>   
        </li>
        `;

        this.list.innerHTML += html;
    }
}