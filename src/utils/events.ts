type EventCallback = (...args: any[]) => void;

interface ICoreEvent {
    id: string | number;
    name: string;
    callback: EventCallback;
}

const events: ICoreEvent[] = [];

export const createEvent = (name: string, callback: EventCallback): Function => {
    const uniqueId = Array(16).fill(0).map(() => Math.floor(Math.random() * 16).toString(32)).join('');

    events.push({
        id: uniqueId,
        name,
        callback
    });

    return () => {
        events.splice(events.findIndex(event => event.id === uniqueId), 1);
    }
}

export const emitEvent = (name: string, ...args: any) => {
    return events
        .filter(event => event.name === name)
        .forEach(event => event.callback(...args));
}