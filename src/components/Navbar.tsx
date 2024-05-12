"use client"

import { User } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";


const Navbar = () => {
    const { data: session } = useSession();
    const user:User = session?.user as User

    return (
            <nav className="p-4 md:p-6 bg-gray-900 text-white shadow-md">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <Link  className="text-xl font-bold mb-4 md:mb-0" href="/">Mystry Feedback</Link>
                { session ? (
                    <>
                        <span className="mr-4">Welcome, {user.username || user.email}</span>
                        <Button className="w-full bg-black md:w-auto hover:border-white hover:border " onClick={()=>signOut()}>Logout</Button>
                    </>
                ) : (
                    <Link href="/sign-in">
                        <Button className="w-full bg-black md:w-auto hover:border-white hover:border">Login</Button>
                    </Link>
                ) }
            </div>
        </nav>
    )
}

export default Navbar