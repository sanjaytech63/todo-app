import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/db/connect";
import Task from "@/app/models/Task";
import { CreateTaskSchema } from "@/app/lib/validations/task.schema";

export async function GET() {
    try {
        await dbConnect();

        const tasks = await Task.find().sort({ createdAt: -1 }); // Sort latest first
        return NextResponse.json({ success: true, tasks });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error?.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}

// ✅ POST /api/task — Create a Task
export async function POST(req: Request) {
    try {
        await dbConnect();

        const body = await req.json();
        const parsed = CreateTaskSchema.parse(body);

        const newTask = await Task.create(parsed);
        return NextResponse.json({ success: true, task: newTask }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error?.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}