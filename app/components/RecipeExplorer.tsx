"use client";
import { useState, useTransition, use, useEffect } from "react";
import { queryCategories, queryRecipes } from "../actions";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge, Clock, Search, SlidersHorizontal, Users } from "lucide-react";
import { Suspense } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter } from "./ui/card";
import { FilterPanel, FilterState } from "./FilterPanel";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";



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

  const openRecipe = (id: string) => {
    router.push(`/recipe/${id}`);
  }

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {recipes.map((r) => (
        <RecipeCard key={r.id} recipe={r} onClick={openRecipe} />
      ))}
    </div>
  );
}

interface RecipeCardProps {
  recipe: Recipe
  onClick: (id: string) => void;
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
  ingredients?: Ingredient[]
}

export type Ingredient = {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  recipeId: string;
}

export function RecipeExplorer() {
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const [category, setCategory] = useState("All");
  const [categories, setCategories] = useState<string[] | undefined>()
  const [searchTerm, setSearchTerm] = useState("");
  const [isPending, startTransition] = useTransition()

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    prepTimeRange: [0, 120],
    servingsRange: [1, 12],
    sortBy: "newest",
  });
  const [showMobileFilters, setShowMobileFilters] = useState(false);


  const filteredRecipes = recipes?.filter((recipe) => {
    // Search filter
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchTerm.toLowerCase());

    // Category filter (using both tab and advanced filter)
    const tabCategory = category === "All" || recipe.category === category;
    const advancedCategories = filters.categories.length === 0 || filters.categories.includes(recipe.category);

    // Prep time filter
    const matchesPrepTime = Number.parseInt(recipe.prepTime.split(" ")[0]) >= filters.prepTimeRange[0] &&
      Number.parseInt(recipe.prepTime.split(" ")[0]) <= filters.prepTimeRange[1];

    // Servings filter
    const matchesServings = Number.parseInt(recipe.servings) >= filters.servingsRange[0] &&
      Number.parseInt(recipe.servings) <= filters.servingsRange[1];

    return matchesSearch && tabCategory && advancedCategories && matchesPrepTime && matchesServings;
  })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case "oldest":
          return recipes.indexOf(a) - recipes.indexOf(b);
        case "prepTime-asc":
          return Number.parseInt(a.prepTime) - Number.parseInt(b.prepTime);
        case "prepTime-desc":
          return Number.parseInt(b.prepTime) - Number.parseInt(a.prepTime);
        case "servings-asc":
          return Number.parseInt(a.servings) - Number.parseInt(b.servings);
        case "servings-desc":
          return Number.parseInt(b.servings) - Number.parseInt(a.servings);
        case "newest":
        default:
          return recipes.indexOf(b) - recipes.indexOf(a);
      }
    });


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



      {isPending ? <RecipeSkeleton />
        : <>
          {/* Mobile Filter Button */}
      <div className="flex items-center justify-between mb-6">

          <Sheet open={showMobileFilters} onOpenChange={setShowMobileFilters}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden ml-2">
                <SlidersHorizontal className="w-4 h-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <FilterPanel
                  filters={filters}
                  onFiltersChange={setFilters}
                  availableCategories={categories!}
                />
              </div>
            </SheetContent>
          </Sheet>
      {/* Search */}

        <Input
          type="text"
          placeholder="Search recipes..."
          onChange={handleSearch}
          className="pl-10"
        />
        </div>

        <div className="flex gap-6">
          {/* Desktop Filter Sidebar */}
          <aside className={`${windowWidth < 1020 ? "hidden" : ""} lg:block w-64 flex-shrink-0`}>
            <FilterPanel
              filters={filters}
              onFiltersChange={setFilters}
              availableCategories={categories!}
            />
          </aside>

          {/* Recipe Grid */}
          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing {filteredRecipes?.length} {filteredRecipes?.length === 1 ? 'recipe' : 'recipes'}
              </p>
            </div>

              <RecipeList recipes={recipes} />
          </div>
        </div>
 
        </>

      }

    </div>
  );
}