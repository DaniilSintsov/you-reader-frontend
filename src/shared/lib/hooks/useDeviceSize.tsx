import { useEffect, useState } from 'react';

export const useDeviceSize = (breakpoint: number) => {
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);
	const [isMobile, setIsMobile] = useState<null | boolean>(null);

	useEffect(() => {
		const handleWindowResize = () => {
			setWidth(window.innerWidth);
			setHeight(window.innerHeight);
			setIsMobile(window.innerWidth < breakpoint);
		};

		handleWindowResize();
		window.addEventListener('resize', handleWindowResize, { passive: true });

		return () => window.removeEventListener('resize', handleWindowResize);
	}, []);

	return { width, height, isMobile };
};
