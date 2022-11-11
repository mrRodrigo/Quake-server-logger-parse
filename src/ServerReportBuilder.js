module.exports = class ServerReportBuilder {
  constructor() {
    this.currentGame = {
      total_kills: 0,
      players: new Set(),
      kills: {},
      kills_by_means: {},
    };

    this.games = {};
    this.gamesCounter = 0;
  }

  build() {
    return this.games;
  }

  incrementGameCounter() {
    this.gamesCounter++;

    return this;
  }

  addNewGame() {
    if (this.gamesCounter === 0) {
      this.gamesCounter++;
      return this;
    }

    Object.assign(this.games, {
      [`game-${this.gamesCounter}`]: this.currentGame,
    });

    this.currentGame = {
      total_kills: 0,
      players: new Set(),
      kills: {},
      kills_by_means: {},
    };

    this.gamesCounter++;

    return this;
  }

  incrementPlayerKills(pKiller) {
    if (pKiller) {
      this.currentGame.kills[pKiller]
        ? (this.currentGame.kills[pKiller] += 1)
        : (this.currentGame.kills[pKiller] = 1);
    }

    return this;
  }

  addPlayer(player) {
    if (player) this.currentGame.players.add(player);

    return this;
  }

  addKillEvent() {
    this.currentGame.total_kills += 1;

    return this;
  }

  addKillBy(reason) {
    if (reason) {
      this.currentGame.kills_by_means[reason]
        ? (this.currentGame.kills_by_means[reason] += 1)
        : (this.currentGame.kills_by_means[reason] = 1);
    }

    return this;
  }
};
