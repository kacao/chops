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
    log(msg: string): void;
}
export declare function log(msg: string): void;
export declare function addFields(fields: Fields): Logger;
export declare function getLogger(): Logger;
export {};
