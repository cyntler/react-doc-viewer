declare type EventCallback = (...args: any[]) => void;
export declare const createEvent: (name: string, callback: EventCallback) => Function;
export declare const emitEvent: (name: string, ...args: any) => void;
export {};
