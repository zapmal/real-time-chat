class UserInterface {
    constructor(list) {
        this.list = list;
    }
    render(data) {
        // todo: format (properly, with dateFNS or momentJS) sent at.
        const messageSentAt = data.sent_at.toDate();
        const currentTime = new Date();
        const difference = currentTime.getTime() - messageSentAt.getTime();

        const howMuchTimeAgo = Math.round(((difference / 1000 / 60) / 60) / 24);

        const html = `
        <li class="list-group-item">
            <span class="username">${data.username}</span>
            <span class="message">${data.message} </span>
            <div class="time">Sent ${howMuchTimeAgo} days ago</div>   
        </li>
        `;

        this.list.innerHTML += html;
    }
}