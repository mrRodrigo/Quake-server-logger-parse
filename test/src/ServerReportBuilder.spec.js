const Chai = require("chai");
const ServerReportBuilder = require("../../src/ServerReportBuilder");

describe("ServerReportBuilder", () => {
  describe("When call ServerReportBuilder ", () => {
    let serverReportBuilder;

    beforeEach(() => {
      serverReportBuilder = new ServerReportBuilder();
    });

    context("when call serverReportBuilder.incrementGameCounter", () => {
      it("should increment game counter", () => {
        const builder = serverReportBuilder.incrementGameCounter();

        Chai.expect(builder.gamesCounter).to.eql(1);

        builder.incrementGameCounter();
        Chai.expect(builder.gamesCounter).to.eql(2);
      });
    });

    context("when call serverReportBuilder.addNewGame", () => {
      it("should create new game", () => {
        const builder = serverReportBuilder.incrementGameCounter().addNewGame();

        Chai.expect(builder.currentGame).to.eql({
          total_kills: 0,
          players: new Set(),
          kills_by_means: {},
          kills: {},
        });

        Chai.expect(builder.games).to.eql({
          [`game-${1}`]: {
            total_kills: 0,
            players: new Set(),
            kills_by_means: {},
            kills: {},
          },
        });
      });
    });

    context("when call serverReportBuilder.incrementPlayerKills", () => {
      it("should increment Player Kills", () => {
        const builder = serverReportBuilder.incrementPlayerKills("test");

        Chai.expect(builder.currentGame.kills.test).to.eql(1);

        builder.incrementPlayerKills("test");

        Chai.expect(builder.currentGame.kills.test).to.eql(2);
      });
    });

    context("when call serverReportBuilder.addPlayer", () => {
      it("should add player and not repeat", () => {
        const builder = serverReportBuilder.addPlayer("test");

        Chai.expect(builder.currentGame.players).to.eql(new Set(["test"]));

        builder.addPlayer("test");

        Chai.expect(builder.currentGame.players).to.eql(new Set(["test"]));
      });

      it("should not add empty player", () => {
        const builder = serverReportBuilder.addPlayer();

        Chai.expect(builder.currentGame.players).to.eql(new Set([]));

        builder.addPlayer("test");

        Chai.expect(builder.currentGame.players).to.eql(new Set(["test"]));
      });
    });

    context("when call serverReportBuilder.addKillEvent", () => {
      it("should increment Player Kills", () => {
        const builder = serverReportBuilder.addKillEvent();

        Chai.expect(builder.currentGame.total_kills).to.eql(1);

        builder.addKillEvent();

        Chai.expect(builder.currentGame.total_kills).to.eql(2);
      });
    });
  });
});
