const fs = require("node:fs");

module.exports = class QLogParser {
  constructor({ streamInterface, serverReportBuilder, lineParser }) {
    this.streamInterface = streamInterface;
    this.serverReportBuilder = serverReportBuilder;
    this.lineParser = lineParser;
  }

  async readLogStream() {
    for await (const line of this.streamInterface) {
      this.serverReportBuilder = this.readNewLine(line);
    }

    this.serverReportBuilder.addNewGame();
    this.log();
  }

  readNewLine(line) {
    if (line.includes(this.lineParser.constants.GAME_INIT))
      return this.serverReportBuilder.addNewGame();

    if (line.includes(this.lineParser.constants.KILL)) {
      const killerP = this.lineParser.getKillerPlayer(line);
      const killedP = this.lineParser.getKilledPlayer(line);
      const reason = this.lineParser.getKillReason(line);

      return this.serverReportBuilder
        .addKillEvent()
        .incrementPlayerKills(killerP)
        .addPlayer(killerP)
        .addPlayer(killedP)
        .addKillBy(reason);
    }

    return this.serverReportBuilder;
  }

  log() {
    const response = this.serverReportBuilder.build();
    fs.writeFileSync("./Result.json", JSON.stringify(response));
  }
};
