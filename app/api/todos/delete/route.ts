import connectDB from "@/utils/connectDB";

// Models
import Todos from "@/models/TodoSchema";
import { NextResponse } from "next/server";

// get todo list
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const _id = searchParams.get("id");
    await connectDB();

    if (!_id) {
      return NextResponse.json(
        {
          success: false,
          message: "Todo bulunamadı!",
        },
        { status: 400 }
      );
    }

    const isDeleted = await Todos.findByIdAndDelete(_id);

    if (!isDeleted) {
      return NextResponse.json(
        {
          success: false,
          message: "Todo silinemedi!",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Todo silindi!",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Todo silinirken bir hata oluştu!",
      },
      { status: 500 }
    );
  }
}
