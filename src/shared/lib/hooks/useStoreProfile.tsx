'use client';

import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import { IAuthResponse } from '../../models/authResponse.model';
import { LocalStorageService } from '../services/localStorage.service';
import AuthService from '../services/auth.service';
import { ClientError } from 'graphql-request';

interface IProfileContext {
	isAuth: boolean;
	setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
	profile: IAuthResponse;
	setProfile: React.Dispatch<React.SetStateAction<IAuthResponse>>;
}

const ProfileContext = createContext<IProfileContext>({
	isAuth: false,
	setIsAuth: () => {},
	profile: {} as IAuthResponse,
	setProfile: () => {},
});

export const ProfileProvider = ({ children }: PropsWithChildren) => {
	const [isAuth, setIsAuth] = useState<boolean>(false);
	const [profile, setProfile] = useState<IAuthResponse>({} as IAuthResponse);
	const profileContextValue = { isAuth, setIsAuth, profile, setProfile };

	return (
		<ProfileContext.Provider value={profileContextValue}>{children}</ProfileContext.Provider>
	);
};

export const useProfile = () => {
	const { isAuth, setIsAuth, profile, setProfile } = useContext(ProfileContext);

	useEffect(() => {
		async function checkAuth() {
			if (LocalStorageService.get('token')) {
				try {
					const res = await AuthService.refresh();
					if (!res) {
						throw new Error('Unauthorized');
					}
					LocalStorageService.set('token', res.accessToken);
					setIsAuth(true);
					setProfile(res);
				} catch (error) {
					if (error instanceof ClientError && error.response.errors?.length) {
						console.error(error.response.errors[0].message);
					} else if (error instanceof Error) {
						console.error(error.message);
					} else {
						console.error(error);
					}
				}
			}
		}

		checkAuth();
	}, []);

	return { isAuth, setIsAuth, profile, setProfile };
};
