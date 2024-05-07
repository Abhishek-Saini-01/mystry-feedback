import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";

export async function POST(request:Request) {
    await dbConnect();
    try {
        const { username, code } = await request.json();
        const decodedUsername = decodeURIComponent(username);
        const user = await UserModel.findOne({
            username: decodedUsername
        })

        if(!user){
            return Response.json({
                success: false,
                message: "User not found"
            },{status:500})
        }
        const isCodeValid = user.verifyCode === code;
        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

        if(isCodeValid && isCodeNotExpired){
            user.isVerified = true;
            user.save();
            return Response.json({
                success: true,
                message: "User account verified successfully"
            },{status: 200})
        } else if(!isCodeNotExpired) {
            return Response.json({
                success: false,
                message: "Verification code has expired. Please sign-up again to get a new code"
            },{status: 400})
        } else {
            return Response.json({
                success: false,
                message: "Incorrect Verification code"
            },{status: 400})
        }
        
    } catch (error) {
        console.error("Error verifing user", error);
        return Response.json({
            success: false,
            message: "Error verifing user"
        },{status:500})
    }
}