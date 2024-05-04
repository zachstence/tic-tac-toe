export enum ClientEventName {
	Test = 'Test'
}

type DataByClientEventName = {
	[ClientEventName.Test]: Record<string, never>;
};

export type ClientEvent<EventName extends ClientEventName> = {
	name: EventName;
	data: DataByClientEventName[EventName];
};

export type ClientEventHandler<EventName extends ClientEventName> = (
	event: ClientEvent<EventName>
) => void;

export type ClientEventHandlers = {
	[EventName in ClientEventName]: ClientEventHandler<EventName>;
};
