import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/db/connect";
import Task from "@/app/models/Task";
import { CreateTaskSchema } from "@/app/lib/validations/task.schema";

export async function GET() {
  try {
    await dbConnect();

    const tasks = await Task.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, tasks });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
  
// POST /api/task
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

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const body = await req.json();
    const updatedTask = await Task.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, task: updatedTask });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

// ✅ DELETE /api/task/[id] — Delete Task
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const deleted = await Task.findByIdAndDelete(params.id);
    if (!deleted) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Task deleted" });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
