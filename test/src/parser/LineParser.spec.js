const Chai = require("chai");
const LineParser = require("../../../src/parser/LineParser");

describe("LineParser", () => {
  describe("When call LineParser :: getKilledPlayer", () => {
    let lineParser;

    beforeEach(() => {
      lineParser = LineParser;
    });

    context("when call lineParser.constants", () => {
      it("Return constants", () => {
        const constants = lineParser.constants;

        Chai.expect(constants).to.eql({
          GAME_INIT: " InitGame: ",
          KILL: " Kill: ",
        });
      });
    });

    context("when call lineParser.getKilledPlayer without line", () => {
      it("Return undefined", () => {
        const player = lineParser.getKilledPlayer("");

        Chai.expect(player).to.eql(undefined);
      });
    });

    context("when call lineParser.getKilledPlayer with <world> player", () => {
      it("Return undefined", () => {
        const player = lineParser.getKilledPlayer("killed <world> by");

        Chai.expect(player).to.eql(undefined);
      });
    });

    context("when call lineParser.getKilledPlayer with player", () => {
      it("Return undefined", () => {
        const player = lineParser.getKilledPlayer("killed player by");

        Chai.expect(player).to.eql("player");
      });
    });
  });

  describe("When call LineParser :: getKillerPlayer", () => {
    let lineParser;

    beforeEach(() => {
      lineParser = LineParser;
    });

    context("when call lineParser.constants", () => {
      it("Return constants", () => {
        const constants = lineParser.constants;

        Chai.expect(constants).to.eql({
          GAME_INIT: " InitGame: ",
          KILL: " Kill: ",
        });
      });
    });

    context("when call lineParser.getKillerPlayer without line", () => {
      it("Return undefined", () => {
        const player = lineParser.getKillerPlayer("");

        Chai.expect(player).to.eql(undefined);
      });
    });

    context("when call lineParser.getKillerPlayer with <world> player", () => {
      it("Return undefined", () => {
        const player = lineParser.getKillerPlayer("killed <world> by");

        Chai.expect(player).to.eql(undefined);
      });
    });

    context("when call lineParser.getKillerPlayer with player", () => {
      it("Return undefined", () => {
        const player = lineParser.getKillerPlayer(
          "3: player killed player2 by"
        );

        Chai.expect(player).to.eql("player");
      });
    });
  });

  describe("When call LineParser :: getKillReason", () => {
    let lineParser;

    beforeEach(() => {
      lineParser = LineParser;
    });

    context("when call lineParser.getKillReason without line", () => {
      it("Return undefined", () => {
        const reason = lineParser.getKillReason("");

        Chai.expect(reason).to.eql(undefined);
      });
    });

    context("when call lineParser.getKillReason", () => {
      it("Return undefined", () => {
        const reason = lineParser.getKillReason("killed by GUN_TEST");

        Chai.expect(reason).to.eql("GUN_TEST");
      });
    });
  });
});
