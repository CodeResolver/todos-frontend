import Image from "next/image";
import Link from "next/link";
import React from "react";

export function Header() {
	return (
		<div className="flex items-center gap-3">
			<Link href="/" className="flex items-center gap-3">
				<Image
					src="/rocket.svg"
					alt="Todo App Logo"
					width={20}
					height={30}
					priority
					style={{ transform: "translateY(2px)" }}
				/>
				<h1 className="text-[40px] font-black leading-[48px]">
					<span className="text-blue">Todo</span>
					<span className="text-purple-dark"> App</span>
				</h1>
			</Link>
		</div>
	);
}
