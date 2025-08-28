import { type NextRequest, NextResponse } from "next/server";

// GET all tasks
export async function GET() {
	// Database logic will go here
	return NextResponse.json({ message: "GET tasks" });
}

// POST a new task
export async function POST(req: NextRequest) {
	// Database logic will go here
	const body = await req.json();
	return NextResponse.json({ message: "POST task", data: body });
}
