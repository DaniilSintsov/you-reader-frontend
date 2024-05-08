import { useEffect, useState } from 'react';

export const useDeviceSize = (breakpoint: number) => {
	const [width, setWidth] = useState(window.innerWidth);
	const [height, setHeight] = useState(window.innerHeight);
	const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);

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
