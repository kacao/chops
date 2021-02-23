# chops
Simple JSON logger

```
import {withFields, debug, info, warn, error, log} from "chops";

log("chops");     // {msg: "chops", "level": "info"}
debug("chops");   // {msg: "chops", "level": "debug"}

// with timestamp
withFields({
  "time": () => { return new Date().toString(); }
})
.log("chops");

// custom log level
log("chops", "test");

// custom logger
let logger = new Logger({
  "test": "test"
});
logger.debug("chops");

```
