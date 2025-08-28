"use client";

import { HeroUIProvider } from "@heroui/react";
import type React from "react";

export function HeroUIWrapper({ children }: { children: React.ReactNode }) {
	return <HeroUIProvider>{children}</HeroUIProvider>;
}
