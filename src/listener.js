const autoBind = require('auto-bind');
const { Console } = require('console');

const console = new Console(process.stdout, process.stderr);

class Listener {
  constructor(playlistsService, mailSender) {
    this.playlistsService = playlistsService;
    this.mailSender = mailSender;

    autoBind(this);
  }

  async listen(message) {
    const { targetEmail, playlistId } = JSON.parse(message.content.toString());
    const playlists = await this.playlistsService.getPlaylist(playlistId);
    const result = await this.mailSender.sendEmail(
      targetEmail,
      JSON.stringify({ playlist: playlists }),
    );
    console.log(result);
  }
}

module.exports = Listener;
