"use server"
import { neon } from "@neondatabase/serverless";
import { auth } from "./auth";
import { Session, User } from "better-auth";
import { headers } from "next/headers";
import { db } from "./db";
import { ingredient, recipe, user } from "@/drizzle/schema";
import { and, eq, ilike, like, or, sql } from "drizzle-orm";
import { count } from "console";



export async function queryRecipes(query: string, category: string) {


  const recipes = await db
    .select()
    .from(recipe)
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



export async function queryRecipeById( id : string) {
  const foundRecipe = await db
    .select()
    .from(recipe)
    .where(eq(recipe.id, id))
  console.log(foundRecipe);

  const ingredients = await db 
    .select()
    .from(ingredient)
    .where(eq(ingredient.recipeId, id))

  return { recipe: foundRecipe[0], ingredients: ingredients};
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



export async function getUserById(id : string) {
  const userName = await db
    .select({
      name: user.name
    })
    .from(user)
    .where(eq(user.id, id))

  const userNameQuery = await db
    .select({
      name: user.name
    })
    .from(user)
    .where(eq(user.id, id)).toSQL()

    console.log("QUERY!!");
    console.log(userNameQuery);

    return userName[0].name;
}