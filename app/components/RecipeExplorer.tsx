"use client";

import { useState, useTransition } from "react";
import { queryRecipes } from "../actions";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

interface Recipe {
  id: number;
  title: string;
  description: string;
  category: string;
}

const categories = ["All", "Breakfast", "Lunch", "Dinner"];

export function RecipeExplorer({ initialRecipes }: { initialRecipes: Recipe[] }) {
  const [recipes, setRecipes] = useState(initialRecipes);
  const [category, setCategory] = useState("All");
  const [pending, startTransition] = useTransition();

  async function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    startTransition(async () => {
      const newRecipes = await queryRecipes(value, category);
      setRecipes(newRecipes);
    });
  }

  async function handleCategoryChange(newCategory: string) {
    setCategory(newCategory);
    startTransition(async () => {
      const newRecipes = await queryRecipes("", newCategory);
      setRecipes(newRecipes);
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
      {pending && (
        <p className="text-gray-400 text-sm mb-4">Loading recipes...</p>
      )}

      {/* Grid */}
      {recipes.length === 0 ? (
        <p className="text-gray-500 text-center">No recipes found.</p>
      ) : (
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
      )}
    </div>
  );
}
