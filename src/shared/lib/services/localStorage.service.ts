export class LocalStorageService {
	static set(key: string, value: any): void {
		if (this.get(key)) {
			this.remove(key);
		}
		localStorage.setItem(key, JSON.stringify(value));
	}

	static get(key: string): any {
		return JSON.parse(localStorage.getItem(key) as string);
	}

	static remove(key: string): void {
		if (this.get(key)) {
			localStorage.removeItem(key);
		}
	}
}
