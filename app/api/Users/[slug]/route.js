import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getToken } from "next-auth/jwt";

// Function to get a user by ID
async function getUser(id) {
  const user = await prisma.user.findUnique({
    where: { id: id },
  });
  return user;
}

// GET method to fetch a user
export async function GET(req, { params }) {
  try {
    const token = await getToken({ req });
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Fetch the user with the given ID
    const user = await getUser(params.slug);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Avoid sending sensitive information like password
    delete user.password;

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

// PUT method to update a user
export async function PUT(req, { params }) {
  try {
    const token = await getToken({ req });
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = params.slug;
    const userData = await req.json(); // Parse the request body

    // Check for required fields
    if (!userData.email || !userData.name || !userData.username) {
      return NextResponse.json(
        { message: "Email, name, and username are required" },
        { status: 400 }
      );
    }

    // Fetch the existing user
    const existingUser = await getUser(userId);
    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Update the user details
    const updatedUser = await prisma.user.update({
      where: { id: userId }, // Use the slug to identify the user
      data: {
        email: userData.email,
        name: userData.name,
        username: userData.username,
      },
    });

    // Avoid sending sensitive information like password
    delete updatedUser.password;

    return NextResponse.json(
      { message: "User updated", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
