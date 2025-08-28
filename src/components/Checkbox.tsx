"use client";

import { Checkbox as HeroCheckbox } from "@heroui/checkbox";
import type React from "react";

interface CheckboxProps {
	isSelected: boolean;
	onValueChange?: (isSelected: boolean) => void;
	isDisabled?: boolean;
	size?: "sm" | "md" | "lg";
	className?: string;
	disableAnimation?: boolean;
}

export function Checkbox({
	isSelected,
	onValueChange,
	isDisabled = false,
	size = "md",
	className = "",
	disableAnimation = false,
}: CheckboxProps) {
	const handleChange = (isSelected: boolean) => {
		if (!isDisabled && onValueChange) {
			onValueChange(isSelected);
		}
	};

	return (
		<HeroCheckbox
			isSelected={isSelected}
			onValueChange={handleChange}
			isDisabled={isDisabled}
			size={size}
			radius="full"
			className={className}
			disableAnimation={disableAnimation}
			classNames={{
				base: "focus:ring-2 focus:ring-[#4ea8de] focus:ring-offset-2",
				wrapper: `
            before:border-[#4ea8de] 
            after:bg-[#cb30e0]
            group-data-[selected=true]:after:bg-[#cb30e0]
            group-data-[hover=true]:before:bg-[rgba(255,255,255,0.08)]
            group-data-[hover=true]:after:bg-[#cb30e0]
            group-data-[focus-visible=true]:!ring-[#4ea8de]
        `,
				icon: "text-white",
			}}
		/>
	);
}
