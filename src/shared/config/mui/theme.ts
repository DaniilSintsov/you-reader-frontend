'use client';
import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const roboto = Roboto({
	weight: ['300', '400', '500', '700'],
	subsets: ['latin'],
	display: 'swap',
});

declare module '@mui/material/styles' {
	interface BreakpointOverrides {
		xs: true;
		sm: true;
		md: true;
		lg: true;
		xl: true;
		mobileMid: true;
	}
}

const theme = createTheme({
	breakpoints: {
		values: {
			xs: 0,
			mobileMid: 375,
			sm: 600,
			md: 900,
			lg: 1200,
			xl: 1536,
		},
	},
	typography: {
		fontFamily: roboto.style.fontFamily,
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: 'none',
				},
				text: {
					fontSize: '1rem',
					letterSpacing: '0.03em',
				},
			},
		},
	},
});

export default theme;
