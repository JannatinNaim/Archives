# Chat Alerts

Makes useful noises. Get an audio notification for messages on your Twitch chat.

> NOTE: This can only be used as a browser source plugin.

## Usage

URL Parameters

-   `username` -
    The name of the channel you want to have audio notifications for.
    e.g `?username=jannatinnaim` or for multiple users, `?username=jannatinnaim,twitch`
-   `ignore` -
    The usernames you want to ignore for notifications.
    e.g `?ignore=robot` or for multiple users, `?ignore=robot,user`
-   `cooldown` -
    Amount of seconds you want to wait before playing another notification.
    e.g `?cooldown=5` or leave it to the default of `5`.

## Resources

-   [TMI.js](https://github.com/tmijs/tmi.js)
