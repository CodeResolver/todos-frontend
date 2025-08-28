"use client";

import { HeroUIProvider } from "@heroui/react";
import type React from "react";
import { TaskProvider } from "@/context/TaskContext";

export function ClientProviders({ children }: { children: React.ReactNode }) {
	return (
		<HeroUIProvider>
			<TaskProvider>{children}</TaskProvider>
		</HeroUIProvider>
	);
}
