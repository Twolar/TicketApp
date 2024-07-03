import User from "@/app/(models)/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const userData = await req.json();

    if (!userData.email || !userData.password) {
      return NextResponse.json(
        { message: "All fields required" },
        { status: 400 }
      );
    }

    const duplicateUser = await User.findOne({ email: userData.email })
      .lean()
      .exec();

    if (duplicateUser) {
      return NextResponse.json(
        { message: "Duplicate user exists with email" },
        { status: 409 }
      );
    }

    const hashPassword = await bcrypt.hash(userData.password, 14);
    userData.password = hashPassword;

    await User.create(userData);

    delete userData.password;
    delete userData.confirmPassword;

    return NextResponse.json(
      { message: "User created", user: userData },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
