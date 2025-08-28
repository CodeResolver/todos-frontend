import React from "react";

interface TaskSkeletonProps {
	count?: number;
}

export function TaskSkeleton({ count = 3 }: TaskSkeletonProps) {
	// Predefined widths to avoid hydration mismatch from Math.random()
	const skeletonWidths = ["75%", "65%", "80%", "70%", "85%"];

	return (
		<div className="space-y-4">
			{Array.from({ length: count }).map((_, index) => (
				<div
					key={index}
					className="relative flex items-center gap-3 p-4 mb-3 rounded-lg animate-pulse"
					style={{
						backgroundColor: "#262626",
						borderWidth: "1px",
						borderStyle: "solid",
						borderColor: "#333333",
						boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.06)",
					}}
				>
					{/* Skeleton Checkbox */}
					<div className="flex-shrink-0">
						<div
							className="w-5 h-5 rounded-full bg-gray-600"
							style={{ backgroundColor: "#404040" }}
						/>
					</div>

					{/* Skeleton Title */}
					<div className="flex-grow">
						<div
							className="h-4 rounded"
							style={{
								backgroundColor: "#404040",
								width: skeletonWidths[index % skeletonWidths.length],
							}}
						/>
					</div>

					{/* Skeleton Delete Button */}
					<div className="flex-shrink-0">
						<div
							className="w-6 h-6 rounded bg-gray-600"
							style={{ backgroundColor: "#404040" }}
						/>
					</div>
				</div>
			))}
		</div>
	);
}
