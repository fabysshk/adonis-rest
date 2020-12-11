"use strict";
const Helpers = use("Helpers");
const AuthorizationService = use("App/Services/AuthorizationService");
const Music = use("App/Models/Music");
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
const data = () => new Date();
class MusicController {
  async index() {
    return await Music.all();
  }

  async me({ auth }) {
    const user = await auth.getUser();
    return await user.musics().fetch();
  }

  async create({ request, auth }) {
    const user = await auth.getUser();
    const { title, singer, year, genre } = request.all();

    const name = `${getRandom(data().getMilliseconds(), 9999999)}`;
    const file = request.file("file");
    const type = file.subtype;
    const cover = request.file("cover");
    const coverType = cover.subtype;

    const musicPath = `music/${user.username}/${name}`;
    const path = Helpers.publicPath(musicPath);

    const music = new Music();
    music.name = `${name}`;
    music.username = `${user.username}`;
    music.path = `music/${user.username}/${name}/${name}.${type}`;
    music.icon = `music/icons/icon1.jpg`;
    music.title = title;
    music.singer = singer;
    music.year = year;
    music.genre = genre;
    music.cover = `music/${user.username}/${name}/${name}.${coverType}`;

    await user.musics().save(music);

    await file.move(path, {
      name: `${name}.${type}`,
    });
    await cover.move(path, {
      name: `${name}.${coverType}`,
    });
    return music;
  }

  async destroy({ auth, params }) {
    const user = await auth.getUser();
    const { id } = params;
    const music = await Music.find(id);
    AuthorizationService.verifyPermision(music, user);
    await music.delete();
    return music;
  }
}

module.exports = MusicController;
