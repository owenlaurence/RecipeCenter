"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/app/components/ui/dialog";
import { Badge } from "@/app/components/ui/badge";
import { Clock, Users, ChefHat } from "lucide-react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Separator } from "@/app/components/ui/separator";
import { Ingredient, Recipe } from "@/app/components/RecipeExplorer";
import { useRouter } from "next/navigation";



interface RecipeDetailProps {
  recipe: Recipe | null;
  ingredients: Ingredient[] | null
  userName : string
}

export function RecipeDetail({ recipe, ingredients, userName }: RecipeDetailProps) {
  if (!recipe) return null;

  const router = useRouter();

  return (
    <Dialog open={true} onOpenChange={() => { router.back(); } }>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>{recipe.title}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[calc(90vh-100px)]">
          <div className="space-y-4">
            <div className="aspect-video relative overflow-hidden rounded-lg">
              <img
                src={recipe.imgUrl}
                alt={recipe.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <Badge>{recipe.category}</Badge>
              <div className="flex items-center gap-1 text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{recipe.prepTime}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <Users className="w-4 h-4" />
                <span>{recipe.servings} servings</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <ChefHat className="w-4 h-4" />
                <span>by {userName}</span>
              </div>
            </div>

            <p className="text-gray-600">{recipe.description}</p>

            <Separator />

            <div>
              <h3 className="mb-3">Ingredients</h3>
              <ul className="space-y-2">
                {ingredients?.map((ingredient, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>{ingredient.quantity} {ingredient.unit} <b>{ingredient.name}</b></span>
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

            <div>
              <h3 className="mb-3">Instructions</h3>
              {/* <ol className="space-y-3">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm">
                      {index + 1}
                    </span>
                  </li>
                ))}
              </ol> */}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
