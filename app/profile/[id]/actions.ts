import { auth } from "@/app/auth";
import { neon } from "@neondatabase/serverless";


export async function getUserById(id : string) {
  const sql = neon(process.env.DATABASE_URL!);
  const users = await sql`SELECT id FROM users`;
  console.log(users);
}