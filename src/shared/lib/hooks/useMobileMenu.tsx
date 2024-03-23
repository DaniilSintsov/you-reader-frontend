'use client';

import { PropsWithChildren, createContext, useContext, useState } from 'react';

interface IMobileMenuContext {
	openMenu: boolean;
	setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileMenuContext = createContext<IMobileMenuContext>({
	openMenu: false,
	setOpenMenu: () => {},
});

export const MobileMenuProvider = ({ children }: PropsWithChildren) => {
	const [openMenu, setOpenMenu] = useState<boolean>(false);
	const menuContextValue = { openMenu, setOpenMenu };

	return (
		<MobileMenuContext.Provider value={menuContextValue}>{children}</MobileMenuContext.Provider>
	);
};

export const useMobileMenu = () => {
	const { openMenu, setOpenMenu } = useContext(MobileMenuContext);
	return { openMenu, setOpenMenu };
};
