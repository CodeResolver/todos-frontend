// Figma Design Colors - exact matches from design system
export const APP_COLORS: { [key: string]: string } = {
	red: "#FF3B30", // Colors/Red from Figma
	orange: "#FF9500", // Colors/Orange from Figma
	yellow: "#FFCC00", // Colors/Yellow from Figma
	green: "#34C759", // Colors/Green from Figma
	blue: "#007AFF", // Colors/Blue from Figma
	indigo: "#5856D6", // Colors/Indigo from Figma
	purple: "#AF52DE", // Colors/Purple from Figma
	pink: "#FF2D55", // Colors/Pink from Figma
	brown: "#A2845E", // Colors/Brown from Figma
};

export const COLOR_ORDER = [
	"red",
	"orange",
	"yellow",
	"green",
	"blue",
	"indigo",
	"purple",
	"pink",
	"brown",
];

// Design system variables from Figma
export const DESIGN_TOKENS = {
	// Colors from Figma
	colors: {
		blue: "#4EA8DE",
		blueDark: "#1E6F9F",
		purple: "#8284FA",
		purpleDark: "#5E60CE",
		gray100: "#F2F2F2",
		gray200: "#D9D9D9",
		gray300: "#808080",
		gray400: "#333333",
		gray500: "#262626",
		gray600: "#1A1A1A",
		gray700: "#0D0D0D",
		danger: "#E25858",
		white: "#FFFFFF",
	},
	// Spacing
	spacing: {
		xs: "8px",
		sm: "12px",
		md: "16px",
		lg: "24px",
		xl: "32px",
		xxl: "48px",
	},
	// Border radius
	borderRadius: {
		sm: "8px",
		md: "12px",
	},
	// Typography
	typography: {
		fontFamily: "Inter",
		fontWeights: {
			normal: 400,
			bold: 700,
			black: 900,
		},
		sizes: {
			sm: "14px",
			lg: "40px",
		},
		lineHeights: {
			sm: "17px",
			md: "20px",
			lg: "48px",
			percentage: "140%",
		},
	},
};
