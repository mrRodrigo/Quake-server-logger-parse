const fs = require("node:fs");
const readline = require("node:readline");
const QLogParser = require("./src/parser/QLogParser");
const LineParser = require("./src/parser/LineParser");
const ServerReportBuilder = require("./src/ServerReportBuilder");

const LOG_FILE = "qgames.log";

const streamInterface = readline.createInterface({
  input: fs.createReadStream(LOG_FILE, { encoding: "utf-8" }),
  crlfDelay: Infinity,
});

const serverReportBuilder = new ServerReportBuilder();

const context = {
  streamInterface,
  serverReportBuilder,
  lineParser: LineParser,
};

const qLogParser = new QLogParser(context);

(async () => await qLogParser.readLogStream())();
