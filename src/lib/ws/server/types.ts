export enum ServerEventName {
	Test = 'Test'
}

type DataByServerEventName = {
	[ServerEventName.Test]: Record<string, never>;
};

export type ServerEvent<EventName extends ServerEventName> = {
	name: EventName;
	data: DataByServerEventName[EventName];
};

export type ServerEventHandler<EventName extends ServerEventName> = (
	event: ServerEvent<EventName>
) => void;

export type ServerEventHandlers = {
	[EventName in ServerEventName]: ServerEventHandler<EventName>;
};
