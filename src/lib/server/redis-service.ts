import IORedis from 'ioredis';

export class RedisService {
	private client: IORedis;

	constructor() {
		this.client = new IORedis({
			host: 'redis',
			port: 6379
		});
	}

	setJson = async (key: string, value: unknown): Promise<void> => {
		await this.client.call('json.set', key, '$', JSON.stringify(value));
	};

	setJsonField = async (key: string, path: string, value: unknown): Promise<void> => {
		await this.client.call('json.set', key, path, JSON.stringify(value));
	};

	getJson = async (key: string): Promise<unknown> => {
		const raw = (await this.client.call('json.get', key)) as string;
		return JSON.parse(raw);
	};

	listKeys = async (pattern: string): Promise<string[]> => {
		return this.client.keys(pattern);
	};

	remove = async (key: string): Promise<void> => {
		await this.client.del(key);
	};

	exists = async (key: string): Promise<boolean> => {
		return Boolean(await this.client.exists(key));
	};
}
