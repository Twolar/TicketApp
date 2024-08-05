import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getToken } from "next-auth/jwt";

// Function to get feedback by ID
async function getFeedback(id) {
  const feedback = await prisma.feedback.findUnique({
    where: { id: id },
    include: {
      user: true, // Include related user info if needed
    },
  });
  return feedback;
}

// GET method to fetch feedback
export async function GET(req, { params }) {
  try {
    const token = await getToken({ req });
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Fetch the feedback with the given ID
    const feedback = await getFeedback(params.slug);

    if (!feedback) {
      return NextResponse.json(
        { message: "Feedback not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ feedback }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

// PUT method to update feedback
export async function PUT(req, { params }) {
  try {
    const token = await getToken({ req });
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const slug = params.slug;
    const feedbackData = await req.json(); // Parse the request body

    // Check for required fields
    if (!feedbackData.suggestion) {
      return NextResponse.json(
        { message: "Suggestion is required" },
        { status: 400 }
      );
    }

    // Fetch the existing feedback
    const existingFeedback = await getFeedback(slug);
    if (!existingFeedback) {
      return NextResponse.json(
        { message: "Feedback not found" },
        { status: 404 }
      );
    }

    // Update the feedback details
    const updatedFeedback = await prisma.feedback.update({
      where: { id: slug }, // Use the slug to identify the feedback
      data: {
        suggestion: feedbackData.suggestion,
        isRead: feedbackData.isRead,
      },
    });

    return NextResponse.json(
      { message: "Feedback updated", feedback: updatedFeedback },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating feedback:", error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
