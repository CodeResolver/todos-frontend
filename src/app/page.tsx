"use client";

import Link from "next/link";
import { EmptyTasks } from "@/components/EmptyTasks";
import { TaskCard } from "@/components/TaskCard";
import { TaskSkeleton } from "@/components/TaskSkeleton";
import { useTaskContext } from "@/context/TaskContext";

export default function Home() {
	const { taskStats } = useTaskContext();

	return (
		<div className="w-full">
			{/* Create Task Button */}
			<div className="w-full mb-16">
				<Link href="/tasks/new" className="w-full block">
					<button
						className="w-full flex items-center justify-center gap-2 font-bold py-4 rounded-lg transition-colors"
						style={{ backgroundColor: "#1E6F9F", color: "#F2F2F2" }}
						type="button"
					>
						<span>Create Task</span>
						<div className="w-4 h-4 relative">
							{/* SVG icon here */}
							<svg
								width="16"
								height="16"
								viewBox="0 0 16 16"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<title>Svg Icon</title>
								<g clipPath="url(#clip0_13009_81)">
									<path
										d="M7.98367 1.45158C9.27559 1.45158 10.5385 1.83468 11.6127 2.55244C12.6869 3.27019 13.5241 4.29037 14.0185 5.48395C14.5129 6.67754 14.6423 7.99092 14.3902 9.25802C14.1382 10.5251 13.5161 11.689 12.6026 12.6026C11.689 13.5161 10.5251 14.1382 9.25801 14.3903C7.99091 14.6423 6.67753 14.5129 5.48394 14.0185C4.29036 13.5241 3.27018 12.6869 2.55243 11.6127C1.83467 10.5385 1.45157 9.2756 1.45157 7.98368C1.45826 6.25332 2.14861 4.59574 3.37217 3.37218C4.59573 2.14862 6.25331 1.45827 7.98367 1.45158ZM7.98367 5.77648e-06C6.40605 0.00645971 4.86572 0.480174 3.55711 1.36134C2.24851 2.24252 1.2303 3.49164 0.631045 4.95102C0.031785 6.4104 -0.121666 8.01461 0.190064 9.56114C0.501794 11.1077 1.26473 12.5272 2.38256 13.6404C3.50038 14.7537 4.92298 15.5108 6.47076 15.8162C8.01855 16.1217 9.62212 15.9617 11.079 15.3564C12.536 14.7512 13.7809 13.7279 14.6567 12.4158C15.5326 11.1036 16 9.5613 16 7.98368C16 6.93249 15.7924 5.89165 15.3892 4.92089C14.9859 3.95014 14.3949 3.06857 13.6501 2.32679C12.9053 1.58501 12.0213 0.997618 11.0489 0.598327C10.0765 0.199035 9.03484 -0.00429452 7.98367 5.77648e-06Z"
										fill="#F2F2F2"
									/>
									<path
										d="M11.7069 7.38126H8.49534V4.16965H7.41391V7.38126H4.19867V8.46268H7.41391V11.6743H8.49534V8.46268H11.7069V7.38126Z"
										fill="#F2F2F2"
									/>
								</g>
								<defs>
									<clipPath id="clip0_13009_81">
										<rect width="16" height="16" fill="white" />
									</clipPath>
								</defs>
							</svg>
						</div>
					</button>
				</Link>
			</div>

			{/* Task Info and Counter */}
			<div className="flex justify-between items-end mb-6">
				<div className="flex items-center gap-2">
					<span className="font-bold text-sm" style={{ color: "#4EA8DE" }}>
						Tasks
					</span>
					<div
						className="
    flex flex-col justify-center items-center
    w-[24px] h-[19px]
    px-2 py-[2px]
    bg-[#333333] rounded-full
    gap-[10px]
  "
					>
						<span className="font-bold text-xs" style={{ color: "#D9D9D9" }}>
							{taskStats.total}
						</span>
					</div>
				</div>
				<div className="flex items-center gap-2">
					<span className="font-bold text-xs" style={{ color: "#8284FA" }}>
						Completed
					</span>
					<div
						className={`flex flex-col justify-center items-center h-[19px] px-2 py-[2px] bg-[#333333] rounded-full ${
							taskStats.completed === 0 ? "w-[24px]" : "w-[52px]"
						}`}
					>
						<span className="font-bold text-xs" style={{ color: "#D9D9D9" }}>
							{taskStats.completed === 0
								? taskStats.completed
								: `${taskStats.completed} of ${taskStats.total}`}
						</span>
					</div>
				</div>
			</div>

			{/* Task List or Empty State */}
			<TaskList />
		</div>
	);
}

function TaskList() {
	const { tasks, loading } = useTaskContext();

	// Show loading state while fetching tasks
	if (loading) {
		return <TaskSkeleton count={3} />;
	}

	// Only show empty state after loading is complete and no tasks exist
	if (tasks.length === 0) {
		return <EmptyTasks />;
	}

	return (
		<div className="space-y-4">
			{tasks.map((task) => (
				<TaskCard key={task.id} task={task} />
			))}
		</div>
	);
}
