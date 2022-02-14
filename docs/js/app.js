function main() {
    const urlParams = new URLSearchParams(window.location.search);

    const username = urlParams.has("username") ? urlParams.get("username").split(",") : [];
    const ignore = urlParams.has("ignore") ? urlParams.get("ignore").split(",") : "";

    const cooldown = urlParams.has("cooldown") ? urlParams.get("cooldown") : 5;
    let lastMessage = new Date();

    const notification = new Audio("../audio/notification.mp3");

    const client = tmi.Client({
        channels: username,
        options: {
            debug: true,
        },
        connection: {
            secure: true,
            reconnect: true,
        },
    });

    client.on("chat", (channel, userState, message, self) => {
        if (self) return;

        if (ignore.includes(userState.username)) return;

        const now = new Date();

        const diff = (Number(now) - Number(lastMessage)) / 1000;
        lastMessage = now;

        if (diff < cooldown) return;

        notification.play();
    });

    client.connect();
}

document.onload = main();
