// Next
import { NextResponse } from "next/server";

// Utils
import connectDB from "@/utils/connectDB";

// Models
import Todos from "@/models/TodoSchema";

// get todo list
export async function POST(req: Request) {
	try {
		const { text } = await req.json();
		await connectDB();

		const isCreated = await Todos.create({
			text,
		});

		if (!isCreated) {
			return NextResponse.json(
				{
					success: false,
					message: "Todo oluşturulamadı!",
				},
				{ status: 404 }
			);
		}

		return NextResponse.json(
			{
				success: true,
				data: isCreated,
			},
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{
				success: false,
				message: "Todo oluşturulurken bir hata oluştu!",
			},
			{ status: 500 }
		);
	}
}
