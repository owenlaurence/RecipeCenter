import { auth } from "@/app/auth";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/postgres-js";

import { ingredient, recipe, session, user } from "@/drizzle/schema";
import { db } from "@/app/db"
import { eq } from "drizzle-orm";


export async function getUserById(id : string) {

  const foundUser = await db.select().from(user).where(eq(user.id, id))


  console.log(foundUser)
  return foundUser


  // const users = await db.select().from()

}