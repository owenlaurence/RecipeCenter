import { queryRecipes } from "./actions";
import { RecipeExplorer } from "./components/RecipeExplorer";
import { ChefHat, Plus } from "lucide-react";
import { Button } from "./components/ui/button";
import { useAuth } from "./components/AuthProvider";
import UserInfo from "./components/UserInfo";
import { Suspense } from "react";

export default async function Page() {

  // await importData();


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ChefHat className="w-8 h-8 text-orange-500" />
            <h1 className="text-xl font-semibold">RecipeShare</h1>
          </div>
          <UserInfo />
        </div>
      </header>

      {/* Search + Grid (client-side dynamic) */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <Suspense fallback={<p>Loading...</p>}>
            <RecipeExplorer />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
