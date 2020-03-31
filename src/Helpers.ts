export type TypeOf<T> = { new(...args: any[]): T };

export function isInstanceOf<T, R extends T>(obj: T, type: TypeOf<R>): obj is R {
    return obj instanceof type;
}