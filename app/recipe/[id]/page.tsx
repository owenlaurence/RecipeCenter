import { RecipeDetail } from "@/app/@modal/(.)recipe/RecipePage";
import { getUserById, queryRecipeById } from "@/app/actions";

export default async function RecipePage({
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