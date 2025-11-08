// components/RecipeExplorer.tsx
"use client";
import { useState, useTransition, use } from "react";
import { queryRecipes } from "../actions";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { Suspense } from "react";

interface Recipe {
  id: number;
  title: string;
  description: string;
  category: string;
}

const categories = ["All", "Breakfast", "Lunch", "Dinner"];

// Recipe List Component - this will be suspended
function RecipeList({ recipesPromise }: { recipesPromise: Promise<Recipe[]> }) {
  const recipes = use(recipesPromise);

  if (!recipes || recipes.length === 0) {
    return <p className="text-gray-500 text-center">No recipes found.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((r) => (
        <div
          key={r.id}
          className="border bg-white rounded-md shadow-sm p-4 hover:shadow-md transition"
        >
          <h3 className="text-lg font-semibold mb-2">{r.title}</h3>
          <p className="text-sm text-gray-600">{r.description}</p>
        </div>
      ))}
    </div>
  );
}

// Loading skeleton component
function RecipeSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="border bg-white rounded-md shadow-sm p-4 animate-pulse"
        >
          <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
        </div>
      ))}
    </div>
  );
}

export function RecipeExplorer() {
  const [recipesPromise, setRecipesPromise] = useState<Promise<Recipe[]>>(
    queryRecipes("", "All")
  );
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSearchTerm(value);
    
    startTransition(() => {
      setRecipesPromise(queryRecipes(value, category));
    });
  }

  function handleCategoryChange(newCategory: string) {
    setCategory(newCategory);
    
    startTransition(() => {
      setRecipesPromise(queryRecipes(searchTerm, newCategory));
    });
  }

  return (
    <div>
      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Search recipes..."
          onChange={handleSearch}
          className="pl-10"
        />
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={cat === category ? "default" : "outline"}
            onClick={() => handleCategoryChange(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Loading State */}
      {isPending && (
        <p className="text-gray-400 text-sm mb-4">Loading recipes...</p>
      )}

      {/* Suspense Boundary */}
      <Suspense key={recipesPromise.toString()} fallback={<RecipeSkeleton />}>
        <RecipeList recipesPromise={recipesPromise} />
      </Suspense>
    </div>
  );
}

// Don't forget to import Suspense at the top
// import { Suspense } from "react";