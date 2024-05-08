'use client';

import { useState } from 'react';

interface IFetcherOptions {
	defaultData?: any;
	args?: any[];
}

export default function useFetcher(func: (...args: any) => Promise<any>, options: IFetcherOptions) {
	const [data, setData] = useState(options.defaultData ?? null);
	const [error, setError] = useState<unknown>(null);
	const [isLoading, setIsLoading] = useState(false);

	const execute = async (args?: any[]) => {
		if (!args) {
			args = options.args ?? [];
		}
		setIsLoading(true);
		setError(null);
		try {
			const res = await func(...args);
			setData(res);
			return res;
		} catch (error) {
			setError(error);
			throw error;
		} finally {
			setIsLoading(false);
		}
	};

	return { data, error, isLoading, execute };
}
