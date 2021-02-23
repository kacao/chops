declare enum FieldKind {
    String = 1,
    Func = 2
}
export interface ValueFunc {
    (field?: Fields): string;
}
declare type Fields = Record<string, string | ValueFunc>;
interface FieldRecord {
    kind: FieldKind;
    value?: string;
    func?: ValueFunc;
}
export declare class Logger {
    fields: Record<string, FieldRecord>;
    constructor(fields?: Fields);
    withFields(fields: Fields): this;
    log(msg: string, level?: string): void;
    debug(msg: string): void;
    info(msg: string): void;
    warn(msg: string): void;
    error(msg: string): void;
}
export declare function log(msg: string, level?: string): void;
export declare function withFields(fields: Fields): Logger;
export declare function getLogger(): Logger;
export declare var debug: (msg: string) => void;
export declare var info: (msg: string) => void;
export declare var warn: (msg: string) => void;
export declare var error: (msg: string) => void;
export {};
