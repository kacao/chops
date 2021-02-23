'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = exports.warn = exports.info = exports.debug = exports.getLogger = exports.withFields = exports.log = exports.Logger = void 0;
var FieldKind;
(function (FieldKind) {
    FieldKind[FieldKind["String"] = 1] = "String";
    FieldKind[FieldKind["Func"] = 2] = "Func";
})(FieldKind || (FieldKind = {}));
var Logger = /** @class */ (function () {
    function Logger(fields) {
        this.fields = {};
        if (fields)
            this.withFields(fields);
    }
    Logger.prototype.withFields = function (fields) {
        for (var _i = 0, _a = Object.keys(fields); _i < _a.length; _i++) {
            var k = _a[_i];
            var field = fields[k];
            var to = typeof field;
            console.log("adding field " + k + " (" + to + ")");
            switch (to) {
                case 'string':
                    this.fields[k] = {
                        kind: FieldKind.String,
                        value: field,
                    };
                    break;
                case 'function':
                    this.fields[k] = {
                        kind: FieldKind.Func,
                        func: field,
                    };
                    break;
                default:
                    this.fields[k] = {
                        kind: FieldKind.String,
                        value: field,
                    };
            }
        }
        return this;
    };
    Logger.prototype.log = function (msg, level) {
        var entry = {};
        if (level)
            entry["level"] = level;
        else
            entry["level"] = "log";
        for (var _i = 0, _a = Object.keys(this.fields); _i < _a.length; _i++) {
            var k = _a[_i];
            var field = this.fields[k];
            switch (field.kind) {
                case FieldKind.Func:
                    if (field.func) {
                        entry[k] = field.func();
                    }
                    else
                        entry[k] = "N/A";
                    break;
                default:
                    entry[k] = field;
                    break;
            }
        }
        entry['msg'] = msg;
        var str = JSON.stringify(entry);
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
    };
    Logger.prototype.debug = function (msg) {
        this.log(msg, "debug");
    };
    Logger.prototype.info = function (msg) {
        this.log(msg);
    };
    Logger.prototype.warn = function (msg) {
        this.log(msg, "warn");
    };
    Logger.prototype.error = function (msg) {
        this.log(msg, "error");
    };
    return Logger;
}());
exports.Logger = Logger;
var logger = new Logger();
function log(msg, level) {
    return logger.log(msg);
}
exports.log = log;
function withFields(fields) {
    return logger.withFields(fields);
}
exports.withFields = withFields;
function getLogger() {
    return logger;
}
exports.getLogger = getLogger;
var debug = function (msg) { logger.debug(msg); };
exports.debug = debug;
var info = function (msg) { logger.info(msg); };
exports.info = info;
var warn = function (msg) { logger.warn(msg); };
exports.warn = warn;
var error = function (msg) { logger.error(msg); };
exports.error = error;
