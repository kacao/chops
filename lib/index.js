'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLogger = exports.addFields = exports.log = exports.Logger = void 0;
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
        var _a;
        for (var _i = 0, _b = Object.keys(fields); _i < _b.length; _i++) {
            var k = _b[_i];
            var field = this.fields[k];
            var to = typeof field;
            switch (to) {
                case 'string':
                    this.fields[k] = {
                        kind: FieldKind.String,
                        value: field.value,
                    };
                    break;
                case 'function':
                    this.fields[k] = {
                        kind: FieldKind.Func,
                        func: field.func,
                    };
                    break;
                default:
                    this.fields[k] = {
                        kind: FieldKind.String,
                        value: (_a = field.value) === null || _a === void 0 ? void 0 : _a.toString(),
                    };
            }
        }
        return this;
    };
    Logger.prototype.log = function (msg) {
        var entry = {};
        for (var _i = 0, _a = Object.keys(this.fields); _i < _a.length; _i++) {
            var k = _a[_i];
            var field = this.fields[k];
            switch (field.kind) {
                case FieldKind.Func:
                    if (field.func) {
                        entry[k] = field === null || field === void 0 ? void 0 : field.func();
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
        console.log(JSON.stringify(entry));
    };
    return Logger;
}());
exports.Logger = Logger;
var logger = new Logger();
function log(msg) {
    return logger.log(msg);
}
exports.log = log;
function addFields(fields) {
    return logger.withFields(fields);
}
exports.addFields = addFields;
function getLogger() {
    return logger;
}
exports.getLogger = getLogger;
