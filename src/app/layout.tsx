import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClientProviders } from "@/components/ClientProviders";
import { Header } from "@/components/Header";
import "./globals.css";

const inter = Inter({
	subsets: ["latin"],
	display: "swap",
	weight: ["400", "500", "600", "700", "900"],
	variable: "--font-inter",
});

export const metadata: Metadata = {
	title: "Flow Tasks - Todo App",
	description: "A simple and efficient todo list application",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${inter.variable} antialiased font-inter`}>
				<ClientProviders>
					<div
						className="min-h-screen flex flex-col"
						style={{ backgroundColor: "#1A1A1A" }}
					>
						{/* Header Background - Gray 700 from Figma */}
						<div
							className="w-full h-[200px] flex items-center justify-center"
							style={{ backgroundColor: "#0D0D0D" }}
						>
							<Header />
						</div>
						{/* Main content area with proper spacing */}
						<main
							className="flex-1 w-full max-w-[736px] mx-auto px-6"
							style={{ marginTop: "-27px" }}
						>
							{children}
						</main>
					</div>
				</ClientProviders>
			</body>
		</html>
	);
}
