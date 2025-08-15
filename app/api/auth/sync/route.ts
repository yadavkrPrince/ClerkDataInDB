// app/api/auth/sync/route.ts
// This code :- save the data into  MongoDB if user already exist then update the data other wise create new 

import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { connectToDB } from "../../../lib/db";
import User from "@/../../models/User"

export async function GET() {
  const user = await currentUser();
  if (!user) return new NextResponse("Unauthenticated", { status: 401 });

  await connectToDB();

  await User.findOneAndUpdate(
    { clerkId: user.id },
    {
      clerkId: user.id,
      email: user.primaryEmailAddress?.emailAddress || "",
      firstName: user.firstName || "",
      lastName: user.lastName || "",
    },
    { upsert: true }
  );

  return NextResponse.json({ synced: true });
}
