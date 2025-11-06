import { getSqlVersion, queryRecipes } from "./actions";
import { RecipeExplorer } from "./components/RecipeExplorer";
import { ChefHat, Plus } from "lucide-react";
import { Button } from "./components/ui/button";

export default async function Page() {
  const initialRecipes = await queryRecipes("", "All");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <p>Version: {getSqlVersion()}</p>
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ChefHat className="w-8 h-8 text-orange-500" />
            <h1 className="text-xl font-semibold">RecipeShare</h1>
          </div>
          <Button as="a" >
            <Plus className="w-4 h-4 mr-2" />
            Share Recipe
          </Button>
        </div>
      </header>

      {/* Search + Grid (client-side dynamic) */}
      <main className="container mx-auto px-4 py-8">
        <RecipeExplorer initialRecipes={initialRecipes} />
      </main>
    </div>
  );
}
