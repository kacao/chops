'use strict';

enum FieldKind {
  String = 1,
  Func,
}

export interface ValueFunc {
  (field?: Fields): string;
}
type Value = string | ValueFunc;
type Fields = Record<string, string | ValueFunc>;
interface FieldRecord {
  kind: FieldKind,
  value?: string,
  func?: ValueFunc,
}

export class Logger {
  
  fields: Record<string, FieldRecord> = {}

  constructor(fields?: Fields) {
    if (fields)
      this.withFields(fields);
  }

  withFields(fields: Fields) {
    for (let k of Object.keys(fields)) {
      let field = fields[k];
      let to = typeof field;
      console.log(`adding field ${k} (${to})`);
      switch (to) {

        case 'string':

          this.fields[k] = {
            kind: FieldKind.String,
            value: field as string,
          }
          break;

        case 'function':
          this.fields[k] = {
            kind: FieldKind.Func,
            func: field as ValueFunc,
          }
          break;

        default:
          this.fields[k] = {
            kind: FieldKind.String,
            value: field as string,
          }
      }
    }
    return this;
  }

  log(msg: string, level?: string) {
    let entry: Record<string,any> = {};
    if (level)
      entry["level"] = level;
    else
      entry["level"] = "log";

    for (let k of Object.keys(this.fields)) {
      let field: FieldRecord = this.fields[k];
      switch (field.kind) {
        case FieldKind.Func:
          if (field.func) {
            entry[k] = field.func();
          } else entry[k] = "N/A";
          break;
        default: 
          entry[k] = field;
          break;
      }
    }
    entry['msg'] = msg;
    let str = JSON.stringify(entry);
    switch (level) {
      case "error":
        console.error(str);
        break;
      case "warn":
        console.warn(str);
        break;
      case "debug":
        console.debug(str);
        break;
      case "info":
        console.info(str);
        break;
      default:
        console.log(str);
    }
  }

  debug(msg: string) {
    this.log(msg, "debug");
  }

  info(msg: string) {
    this.log(msg);
  }

  warn(msg: string) {
    this.log(msg, "warn");
  }

  error(msg: string) {
    this.log(msg, "error");
  }
}

var logger: Logger = new Logger();
export function log(msg: string, level?: string) {
  return logger.log(msg);
}

export function withFields(fields: Fields) {
  return logger.withFields(fields);
}

export function getLogger(): Logger {
  return logger;
}

export var debug = (msg: string) => { logger.debug(msg) }
export var info = (msg: string) => { logger.info(msg) }
export var warn = (msg: string) => { logger.warn(msg) }
export var error = (msg: string) => { logger.error(msg) }
