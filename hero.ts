import { heroui } from "@heroui/react";

// Define the HeroUI theme with custom colors
export default heroui({
	themes: {
		light: {
			colors: {
				primary: {
					DEFAULT: "#8284FA", // Purple from design
					foreground: "#FFFFFF",
				},
				secondary: {
					DEFAULT: "#4EA8DE", // Blue from design
					foreground: "#FFFFFF",
				},
				danger: {
					DEFAULT: "#E25858", // Danger from design
					foreground: "#FFFFFF",
				},
			},
		},
	},
});
