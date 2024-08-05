import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getToken } from "next-auth/jwt";

export async function POST(req) {
  try {
    // Extract the user token
    const token = await getToken({ req });
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const feedback = await req.json();

    // Check for required fields
    if (!feedback.suggestion) {
      return NextResponse.json(
        { message: "Post title, status, and blog ID are required" },
        { status: 400 }
      );
    }

    // Create the new suggestion
    const newFeedback = await prisma.feedback.create({
      data: {
        suggestion: feedback.suggestion,
        userId: token.id,
      },
    });

    return NextResponse.json(
      { message: "Feedback created", feedback: newFeedback },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
