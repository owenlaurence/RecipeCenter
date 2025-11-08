"use server"
import { neon } from "@neondatabase/serverless";
import { auth } from "./auth";

export async function getSqlVersion() {
  const sql = neon(process.env.DATABASE_URL!);
  const response = await sql`SELECT version()`;
  return response[0].version;
}

export async function queryRecipes(query: string, category: string) {
  // needs to be db call
  const allRecipes = [
    { id: 1, title: "Pancakes", description: "Fluffy pancakes", category: "Breakfast" },
    { id: 2, title: "Spaghetti", description: "Classic Italian", category: "Dinner" },
  ];


  return allRecipes.filter((r) => {
    const matchesQuery = r.title.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === "All" || r.category === category;
    return matchesQuery && matchesCategory;
  });
}


export async function getAuthenticatedUser() {
  // retrieve session which contains user data.
  const response = await auth.api.getSession({
    headers: {},
    query: {
      disableCookieCache: true
    },
    asResponse: false
  })

  console.log(response);
  return response;

}