import {Logger, log, withFields} from "../src/";
import {expect} from "chai";

describe("chops", () => {
  it("Should log", () => {
    log("ok");
  });

  it("should log with time", () => {
    let fields = {
      "time": () => { return new Date().toString(); }
    };
    withFields(fields).debug("now");
  })

  it("multiple loggers should log", () => {
    let log1 = new Logger({"name": "Log1"});
    let log2 = new Logger({"name": "Log2"});
    log1.log("chops!");
    log2.log("chops!");
  });

})
