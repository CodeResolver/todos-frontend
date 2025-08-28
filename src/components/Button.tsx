import Link from "next/link";
import type React from "react";

interface ButtonProps {
	children: React.ReactNode;
	variant?: "primary" | "secondary" | "danger";
	type?: "button" | "submit" | "reset";
	onClick?: () => void;
	href?: string;
	className?: string;
	disabled?: boolean;
	icon?: React.ReactNode;
}

export function Button({
	children,
	variant = "primary",
	type = "button",
	onClick,
	href,
	className = "",
	disabled = false,
	icon,
}: ButtonProps) {
	const baseStyles =
		"flex items-center justify-center gap-2 px-4 py-4 rounded-lg font-bold transition-colors focus:outline-none";

	const variantStyles = {
		primary: "bg-blue-dark hover:bg-blue text-white",
		secondary:
			"bg-gray-500 hover:bg-gray-400 text-gray-100 border border-gray-700",
		danger: "bg-danger hover:bg-danger-dark text-white",
	};

	const buttonClasses = `${baseStyles} ${variantStyles[variant]} ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`;

	const content = (
		<>
			{children}
			{icon && <span className="ml-2">{icon}</span>}
		</>
	);

	if (href) {
		return (
			<Link href={href} className={buttonClasses}>
				{content}
			</Link>
		);
	}

	return (
		<button
			type={type}
			className={buttonClasses}
			onClick={onClick}
			disabled={disabled}
		>
			{content}
		</button>
	);
}
