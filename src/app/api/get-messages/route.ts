import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import mongoose from 'mongoose';
import { getServerSession, User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

export async function GET(request:Request) {
    await dbConnect();
    const session = await getServerSession(authOptions);

    const user: User = session?.user as User;
    if(!session || !session.user){
        return Response.json({
            success: false,
            message: "Not Authenticated"
        },{status: 401})
    }
    const userId = new mongoose.Types.ObjectId(user._id);

    try {
        const user = await UserModel.aggregate([
           {$match: {id: userId}},
           {$unwind: '$messages'},
           {$sort: {'messages.createdAt': -1}},
           {$group: {_id: "$_id", messages: {$push: "$messages"}}}
        ])
        if(!user || user.length === 0){
            return Response.json({
                success: false,
                message: "User not found"
            },{status: 404})
        }
        return Response.json({
            success: true,
            message: "User Messages fetched successfully",
            messages: user[0].messages
        },{status: 200})
        
    } catch (error) {
        console.error("Failed to fetch User Messages",error)
        return Response.json({
            success: true,
            message: "Failed to fetch User Messages"
        },{status: 500})
    }
}
