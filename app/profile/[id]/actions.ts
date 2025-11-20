import { auth } from "@/app/auth";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/postgres-js";

import { session, user } from "@/drizzle/schema";
import { db } from "@/app/db"


export async function getUserById(id : string) {

  const users = await db.select({
    name: user.name,
    email: user.email
  }).from(user)


  console.log(users)


  // const users = await db.select().from()

}