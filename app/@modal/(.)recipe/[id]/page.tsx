import { getUserById, queryRecipeById } from "@/app/actions";
import { RecipeDetail } from "../RecipePage";
import { ChefHat, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Separator } from "@radix-ui/react-separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import LoginForm from "@/app/components/LoginForm";
import RegisterForm from "@/app/components/RegisterForm";


export default async function AuthPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const open = true;


  const recipe = await queryRecipeById(id);
  const userName = await getUserById(recipe.recipe.userId!);
  return <RecipeDetail recipe={recipe.recipe} ingredients={recipe.ingredients} userName={userName} />

}

