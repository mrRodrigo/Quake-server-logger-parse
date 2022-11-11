const INVALID_PLAYER = "<world>";

module.exports = {
  constants: {
    GAME_INIT: " InitGame: ",
    KILL: " Kill: ",
  },

  getKilledPlayer: (line = "") => {
    const [player] = line.match(/(?<=killed )(.*)(?= by)/gi) || [];

    if (player !== INVALID_PLAYER) return player;
  },

  getKillerPlayer: (line = "") => {
    const [player] = line.match(/(?<=[0-9]\: )(.*)(?= killed)/gi) || [];

    if (player !== INVALID_PLAYER) return player;
  },

  getKillReason: (line = "") => {
    const [reason] = line.match(/(?<= by )(.*)(?=)/gi) || [];

    return reason;
  },
};
