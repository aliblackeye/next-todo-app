export const revalidate = 0;

// Next
import { NextResponse } from "next/server";

// Utils
import connectDB from "@/utils/connectDB";

// Models
import Todos from "@/models/TodoSchema";

// get todo list
export async function GET(req: Request) {
  try {
    await connectDB();
    const projectList = await Todos.find({});
    if (!projectList) {
      return NextResponse.json(
        {
          success: false,
          message: "There is no todo",
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: projectList,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to get todos",
      },
      { status: 500 }
    );
  }
}
