"use client";
import { useState, useTransition, use, useEffect } from "react";
import { queryCategories, queryRecipes } from "../actions";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { Suspense } from "react";



type RecipeListProps = {
  recipes: Recipe[] | null
}

// This will suspend
function RecipeList(props: RecipeListProps) {

  const recipes = props.recipes;

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
          <img src={r.imgUrl} alt={"bad"} />
          <h3 className="text-lg font-semibold mb-2">{r.title}</h3>
          <p className="text-sm text-gray-600">{r.description}</p>
        </div>
      ))}
    </div>
  );
}

// rendered before client components load.
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

export type Recipe = {
  id: string;
  title: string;
  description: string;
  imgUrl: string;
  category: string;
  userId: string | null;
}

export function RecipeExplorer() {
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const [category, setCategory] = useState("All");
  const [categories, setCategories] = useState<string[] | undefined>()
  const [searchTerm, setSearchTerm] = useState("");
  const [isPending, startTransition] = useTransition()


  useEffect(() => {
    //  
    startTransition(async () => {
      const recipes = await queryRecipes("", "All")
      setRecipes(recipes);
      const categories = await queryCategories();
      setCategories(categories)
    })
  }, []);

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSearchTerm(value);
    startTransition(async () => {
      const recipes = await queryRecipes(value, category);
      setRecipes(recipes);

    })

  }

  function handleCategoryChange(newCategory: string) {
    setCategory(newCategory);

    startTransition(async () => {
      const recipes = await queryRecipes(searchTerm, newCategory);
      setRecipes(recipes);
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


      {isPending ? <RecipeSkeleton />
        : <>
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-8">
              {/* Reset category */}
              <Button
                key={"all"}
                variant={"All" === category ? "default" : "outline"}
                onClick={() => handleCategoryChange("All")}
              >
                {"All"}
              </Button>
            {/* All db categories */}
            {categories?.map((cat) => (
              <Button
                key={cat}
                variant={cat === category ? "default" : "outline"}
                onClick={() => handleCategoryChange(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>

          <RecipeList recipes={recipes} />
        </>

      }


    </div>
  );
}