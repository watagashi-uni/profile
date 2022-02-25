import { set, get } from 'idb-keyval';
import axios from 'axios';
import JSONbig from 'json-bigint';


function Game(object) {
  for (let key in object) {
    this[key] = object[key];
  }

  this.database = {};
  this.databaseStatus = {
    status: '',
    loaded: 0,
  };

  this.loadDatabase = async function () {
    if (this.databaseStatus.status) {
      return;
    }

    let localVersion = await this.loadLocalDatabase();
    let version = await axios.get(`${this.databaseHost}/version.json?t=${new Date().getTime()}`).then(response => response.data.dataVersion);

    if (!localVersion) {
      this.databaseStatus.status = 'loading';
      await this.fetchDatabase(version);
      this.databaseStatus.status = 'ok';
    } else if (localVersion != version) {
      this.databaseStatus.status = 'updating';
      await this.fetchDatabase(version);
      this.databaseStatus.status = 'ok';
    }
  };

  this.loadLocalDatabase = async function () {
    try {
      let localDatabase = await get(this.id);
      let localVersion = localDatabase?.version;
      if (!localVersion) {
        return localVersion;
      }
      if (localDatabase) {
        Object.keys(localDatabase).forEach((name) => {
          this.database[name] = localDatabase[name];
          let requiredDatabase = this.requiredDatabases.find(requiredDatabase => requiredDatabase.name == name);
          if (requiredDatabase) {
            requiredDatabase.ok = true;
          }
        });
        this.database.version = localVersion;
        this.databaseStatus.status = 'ok';
      }
      if (!this.requiredDatabases.map((requiredDatabase) => requiredDatabase.ok || false).reduce((x, y) => x && y)) {
        return true;
      }
      return localVersion;
    } catch (e) {
      // eslint-disable-next-line
      console.log('Error occurs when accessing indexedDB: ' + e);
    }
  };

  this.fetchDatabase = async function (version) {
    const self = this;
    for (let key in this.database) {
      delete this.database[key];
    }

    this.databaseStatus.loaded = 0;
    await axios.all(this.requiredDatabases.map((requiredDatabase) =>
      axios.get(`${this.databaseHost}/${requiredDatabase.uri || requiredDatabase.name}.json?t=${new Date().getTime()}`).then((data) => {
        this.databaseStatus.loaded += 1;
        // window.vue.$emit('databaseLoading', {
        //   gameID: this.id,
        //   loaded: loaded,
        //   total: this.requiredDatabases.length,
        // });
        return data;
      }),
    )).then(axios.spread(function () {
      self.requiredDatabases.forEach((requiredDatabase, i) => {
        const data = arguments[i].data;
        if (requiredDatabase.function) {
          self.database[requiredDatabase.name] = requiredDatabase.function(data);
        } else if (requiredDatabase.key) {
          self.database[requiredDatabase.name] = {};
          // eslint-disable-next-line
          for (let item of data) {
            self.database[requiredDatabase.name][item[requiredDatabase.key]] = item;
          }
          // database[`${requiredDatabase.name}Array`] = data;
        } else {
          // database[requiredDatabase.name] = data;
        }
      });
    }));
    try {
      // let date = Vue.prototype.$time.toJSON();
      this.database.version = version;
      // database.date = date;
      await set(this.id, this.database);
      // await set('databaseDate', date);
    } catch (e) {
      // eslint-disable-next-line
    }
  };
}


const sekai = new Game({
  id: 'pjsekai',
  databaseHost: 'https://database.pjsekai.moe',
  assetHost: 'https://assets.pjsek.ai/file/pjsekai-assets/startapp', // TODO: cache to pjsekai.moe
  api: function (url) {
    return axios.get('https://api.pjsekai.moe' + url, {
      transformResponse: data => JSONbig({ storeAsString: true }).parse(data),
    }).then(response => response.data);
  },
  requiredDatabases: [
    { name: 'gameCharacters', key: 'id' },
    { name: 'cards', key: 'id' },
    { name: 'events', key: 'id' },
    { name: 'honors', key: 'id' },
    { name: 'honorGroups', key: 'id' },
    { name: 'musics', key: 'id' },
    {
      name: 'musicDifficulties', function: function (data) {
        let musicDifficulties = {};
        for (let musicDifficulty of data) {
          if (!musicDifficulties[musicDifficulty.musicId]) {
            musicDifficulties[musicDifficulty.musicId] = {};
          }
          musicDifficulties[musicDifficulty.musicId][musicDifficulty.musicDifficulty] = musicDifficulty;
        }
        return musicDifficulties;
      }
    },
    // { name: 'unitProfiles', key: 'unit' },
    // { name: 'gachas', key: 'id' },
    // { name: 'materials', key: 'id' },
    // { name: 'gachaTickets', key: 'id' },
  ],
  eventStartID: 31,
});

export default sekai;
