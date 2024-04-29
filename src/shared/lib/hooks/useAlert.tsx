'use client';

import { PropsWithChildren, createContext, useContext, useState } from 'react';

interface IAlert {
	open: boolean;
	message: string;
	severity: 'error' | 'success';
}

interface IAlertContext {
	alert: IAlert;
	setAlert: React.Dispatch<React.SetStateAction<IAlert>>;
	clearAlert: () => void;
}

const AlertContext = createContext<IAlertContext>({
	alert: { open: false, message: '', severity: 'error' },
	setAlert: () => {},
	clearAlert: () => {},
});

export const AlertProvider = ({ children }: PropsWithChildren) => {
	const [alert, setAlert] = useState<IAlert>({ open: false, message: '', severity: 'error' });

	const clearAlert = () => {
		setAlert({ ...alert, open: false });
	};

	const alertContextValue = { alert, setAlert, clearAlert };

	return <AlertContext.Provider value={alertContextValue}>{children}</AlertContext.Provider>;
};

export const useAlert = () => {
	const { alert, setAlert, clearAlert } = useContext(AlertContext);
	return { alert, setAlert, clearAlert };
};
