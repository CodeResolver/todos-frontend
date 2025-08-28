import Image from "next/image";
import React from "react";
import { DESIGN_TOKENS } from "@/utils/colors";

export function EmptyTasks() {
	return (
		<div className="w-full mt-16 flex flex-col items-center">
			<Image
				src="/Clipboard.png"
				alt="Empty clipboard"
				width={56}
				height={56}
				className="mb-4"
			/>
			<div className="text-center text-gray-300 max-w-[688px] max-h-[66px]">
				<p
					className="font-bold text-base mb-1 leading-[22px]"
					style={{
						color: DESIGN_TOKENS.colors.gray300,
						fontFamily: DESIGN_TOKENS.typography.fontFamily,
					}}
				>
					<span className="font-bold">
						You don&apos;t have any tasks registered yet
					</span>
					<br />
					<span className="text-sm">
						Create tasks and organize your to-do items
					</span>
				</p>
			</div>
		</div>
	);
}
