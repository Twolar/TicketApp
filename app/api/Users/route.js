import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const userData = await req.json();

    if (!userData.email || !userData.password) {
      return NextResponse.json(
        { message: "All fields required" },
        { status: 400 }
      );
    }

    const duplicateUser = await prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (duplicateUser) {
      return NextResponse.json(
        { message: "Duplicate user exists with email" },
        { status: 409 }
      );
    }

    const hashPassword = await bcrypt.hash(userData.password, 14);
    userData.password = hashPassword;

    const newUser = await prisma.user.create({
      data: {
        email: userData.email,
        password: userData.password,
        name: userData.name,
        username: userData.username,
      },
    });

    delete newUser.password;

    return NextResponse.json(
      { message: "User created", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
