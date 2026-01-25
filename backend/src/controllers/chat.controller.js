import { generateStreamToken, upsertStreamUser } from "../lib/stream.js";
import User from "../models/User.js";

export async function getStreamToken(req, res) {
  try {
    const { targetUserId } = req.query;

    // Ensure target user exists in Stream if provided
    if (targetUserId) {
      const targetUser = await User.findById(targetUserId);
      if (targetUser) {
        try {
          await upsertStreamUser({
            id: targetUser._id.toString(),
            name: targetUser.fullName,
            image: targetUser.profilePic || "",
          });
        } catch (error) {
          console.log("Error upserting target user to Stream:", error);
        }
      }
    }

    const token = generateStreamToken(req.user.id);

    res.status(200).json({ token });
  } catch (error) {
    console.log("Error in getStreamToken controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
