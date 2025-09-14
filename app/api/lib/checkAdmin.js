import { auth } from "@clerk/nextjs/server";
import User from "@/app/api/model/";
import connectDB from "./connectDB";

export const checkAdmin = async () => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  await connectDB();

  const user = await User.findOne({ clerkId: userId });
};
