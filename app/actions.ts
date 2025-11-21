"use server"
import { neon } from "@neondatabase/serverless";
import { auth } from "./auth";
import { Session, User } from "better-auth";
import { headers } from "next/headers";
import { db } from "./db";
import { recipe } from "@/drizzle/schema";
import { and, eq, ilike, like, or, sql } from "drizzle-orm";



export async function queryRecipes(query: string, category: string) {


  const recipes = await db
    .select()
    .from(recipe)
    // .where((like(recipe.title, query) || like(recipe.description, query)) && eq(recipe.category, category))
    .where(
      and(
        or(
          ilike(recipe.title, `%${query}%`),
          ilike(recipe.description, `%${query}%`)
        ),
        category === "All" ? undefined : like(recipe.category, `%${category}%`)
      )
    )


  return recipes;
}

export async function queryCategories() {
  const categories = await db.selectDistinct({
    category: recipe.category
  }).from(recipe)


  const val = categories.map((c) => c.category);
  console.log(val);
  return val;
}

export type AuthenticationResponse = {
  user: User,
  session: Session
}

export async function getAuthenticatedUser() {
  // retrieve session which contains user data.
  return await auth.api.getSession({
    headers: await headers(),
    query: {
      disableCookieCache: true
    },
    asResponse: false
  }).then(response => {
    if (response) {
      const val: AuthenticationResponse = {
        session: response.session,
        user: response.user
      }
      return val
    }
    else {
      console.log("NO VAL")
      // return something else
    }

  })
    .catch(err => {
      console.log("ERROR")
      console.log(err)
      return undefined;
    })




}