import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/db/connect";
import Task from "@/app/models/Task";
import mongoose from "mongoose";

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
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Internal Server Error" },
      { status: 500 }
    );
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
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
