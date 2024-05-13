"use server"
import { cookies } from "next/headers"

export const Logout = async ()=>{
    cookies().set("user","");
    cookies().set("token","");
}