import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import dbConnect from '@/app/lib/db/connect';
import Task from '@/app/models/Task';
import mongoose from 'mongoose';


import { CreateTaskSchema } from "@/app/lib/validations/task.schema";

export async function GET() {
    try {
        await dbConnect();

        const tasks = await Task.find().sort({ createdAt: -1 }); 
        return NextResponse.json({ success: true, tasks });
    } catch (e: unknown) {
        const message = e instanceof Error ? e.message : 'Internal Server Error';
        return NextResponse.json({ error: message }, { status: 500 });
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
    } catch (e: unknown) {
        const message = e instanceof Error ? e.message : 'Internal Server Error';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}


// ✅ PATCH /api/tasks/[id] — Update a task
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid Task ID" }, { status: 400 });
    }

    const body = await req.json();
    const updatedTask = await Task.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, task: updatedTask });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}


export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid Task ID" }, { status: 400 });
    }

    const deleted = await Task.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Task deleted" });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}