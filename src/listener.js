const autoBind = require("auto-bind");

class Listener {
  constructor(playlistsService, mailSender) {
    this._playlistsService = playlistsService;
    this._mailSender = mailSender;

    autoBind(this);
  }

  async listen(message) {
    const { targetEmail, playlistId } = JSON.parse(message.content.toString());
    const playlists = await this._playlistsService.getPlaylist(playlistId);
    const result = await this._mailSender.sendEmail(
      targetEmail,
      JSON.stringify(playlists)
    );
    console.log(result);
  }
}

module.exports = Listener;
