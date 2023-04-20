const { Pool } = require('pg');
const autoBind = require('auto-bind');

class PlaylistsService {
  constructor() {
    this.pool = new Pool();
    autoBind(this);
  }

  async getPlaylistById(id) {
    const query = {
      text: 'SELECT playlists.id as id,name,username FROM playlists LEFT JOIN users ON playlists.owner = users.id WHERE playlists.id = $1',
      values: [id],
    };

    const result = await this.pool.query(query);

    return result.rows.map((r) => ({ id: r.id, name: r.name }))[0];
  }

  async getPlaylist(playlistId) {
    const playlist = await this.getPlaylistById(playlistId);

    const query = {
      text: 'SELECT * FROM playlist_songs LEFT JOIN songs ON playlist_songs.song_id = songs.id WHERE playlist_id = $1',
      values: [playlistId],
    };
    const result = await this.pool.query(query);
    playlist.songs = result.rows.map(({ id, title, performer }) => ({
      id,
      title,
      performer,
    }));
    return playlist;
  }
}

module.exports = PlaylistsService;
