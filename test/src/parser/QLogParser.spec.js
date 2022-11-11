const Chai = require("chai");
const QLogParser = require("../../../src/parser/QLogParser");

describe("QLogParser", () => {
  describe("When call QLogParser :: readLogStream", () => {
    let qlogParser, container;

    beforeEach(() => {
      container = {
        streamInterface: ["line1", "line2", "line3"],
        serverReportBuilder: {
          addNewGame: Chai.spy(() => ""),
          build: Chai.spy(() => ""),
        },
        lineParser: { constants: {} },
      };
      qlogParser = new QLogParser(container);

      Chai.spy.on(qlogParser, "readNewLine");
      Chai.spy.on(qlogParser, "log");
    });

    context("when call qlogParser.readLogStream", () => {
      it("Return readLogStream", async () => {
        await qlogParser.readLogStream();

        Chai.expect(qlogParser.readNewLine).to.have.been.called(3);
        Chai.expect(qlogParser.log).to.have.been.called(1);
        Chai.expect(
          container.serverReportBuilder.addNewGame
        ).to.have.been.called(1);
      });
    });
  });

  describe("When call QLogParser :: readNewLine new Game", () => {
    let qlogParser, container;

    beforeEach(() => {
      container = {
        streamInterface: [],
        serverReportBuilder: {
          addNewGame: Chai.spy(() => ""),
        },
        lineParser: { constants: { GAME_INIT: "line1" } },
      };
      qlogParser = new QLogParser(container);
      Chai.spy.on(qlogParser, "readNewLine");
    });

    context("when call qlogParser.readNewLine for first game", () => {
      it("Calls serverReportBuilder.addNewGame", async () => {
        await qlogParser.readNewLine("line1");

        Chai.expect(qlogParser.readNewLine).to.have.been.called(1);
        Chai.expect(
          container.serverReportBuilder.addNewGame
        ).to.have.been.called(1);
      });
    });
  });

  describe("When call QLogParser :: readNewLine new Kill", () => {
    let qlogParser, container, incrementPlayerKills, addPlayer;

    beforeEach(() => {
      addPlayer = Chai.spy(() => ({
        addPlayer: () => ({ addKillBy: () => {} }),
      }));
      incrementPlayerKills = Chai.spy(() => ({ addPlayer }));

      container = {
        streamInterface: [],
        serverReportBuilder: {
          addNewGame: Chai.spy(() => ""),
          addKillEvent: Chai.spy(() => ({
            incrementPlayerKills,
          })),
        },
        lineParser: {
          constants: { KILL: "kill" },
          getKillerPlayer: Chai.spy(() => "player1"),
          getKilledPlayer: Chai.spy(() => "player2"),
          getKillReason: () => "TEST",
        },
      };
      qlogParser = new QLogParser(container);
      Chai.spy.on(qlogParser, "readNewLine");
    });

    context("when call qlogParser.readNewLine for first game", () => {
      it("Calls serverReportBuilder.addNewGame", async () => {
        await qlogParser.readNewLine("kill");

        Chai.expect(qlogParser.readNewLine).to.have.been.called(1);
        Chai.expect(
          container.serverReportBuilder.addKillEvent
        ).to.have.been.called(1);
        Chai.expect(incrementPlayerKills).to.have.been.called(1);
        Chai.expect(addPlayer).to.have.been.called();
      });
    });
  });
});
