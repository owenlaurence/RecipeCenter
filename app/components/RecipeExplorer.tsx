"use client";
import { useState, useTransition, use, useEffect } from "react";
import { queryCategories, queryRecipes } from "../actions";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge, Clock, Search, Users } from "lucide-react";
import { Suspense } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter } from "./ui/card";



type RecipeListProps = {
  recipes: Recipe[] | null
}

// This will suspend
function RecipeList(props: RecipeListProps) {

  const recipes = props.recipes;

  const router = useRouter();

  if (!recipes || recipes.length === 0) {
    return <p className="text-gray-500 text-center">No recipes found.</p>;
  }

  const openRecipe = (id : string) => {
    router.push(`/recipe/${id}`);
  }

  return (
    <div 
    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {recipes.map((r) => (
        <RecipeCard recipe={r} onClick={openRecipe}/>
      ))}
    </div>
  );
}

interface RecipeCardProps {
  recipe : Recipe
  onClick: (id : string) => void;
}

function RecipeCard({
  recipe,
  onClick,
}: RecipeCardProps) {
  return (
    <Card
      className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => onClick(recipe.id)}
    >
      <div className="aspect-video relative overflow-hidden">
        <img
          src={recipe.imgUrl}
          alt={recipe.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <Badge className="absolute top-3 right-3">{recipe.category}</Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="mb-2">{recipe.title}</h3>
        <p className="text-gray-600 line-clamp-2">{recipe.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between text-gray-500">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{recipe.prepTime} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span className="text-sm">{recipe.servings}</span>
          </div>
        </div>
        {/* <span className="text-sm">by {author}</span> */}
      </CardFooter>
    </Card>
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
  prepTime: string;
  servings: string;
  category: string;
  userId: string | null;
  ingredients? : Ingredient[]
}

export type Ingredient = {
  id : string;
  name : string;
  quantity : number;
  unit : string;
  recipeId : string;
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