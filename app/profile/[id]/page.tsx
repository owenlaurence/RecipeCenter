import UserInfo from "@/app/components/UserInfo"
import Profile from "./Profile"
import { ChefHat } from "lucide-react"
import { getUserById } from "./actions"

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  
  getUserById("");
  

  return <div>
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ChefHat className="w-8 h-8 text-orange-500" />
            <h1 className="text-xl font-semibold">RecipeShare</h1>
          </div>
          <UserInfo/>
        </div>
      </header>
    <Profile/>
  </div>
}