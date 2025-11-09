"use client"
import { useEffect } from "react";
import { useAuth } from "./AuthProvider";
import { Button } from "./ui/button"
import { Plus } from "lucide-react"
import Link from "next/link";

export default function UserInfo() {
  const { user } = useAuth();
  useEffect(() => {
    console.log(user)
  }, [user])


  return (

    <>
      {user
        ? <div>
          <p className="text-gray-600 mt-2">{user.name}</p>
        </div>
        : <Link href="/auth">
          <Plus className="w-4 h-4 mr-2" />
          Share Recipe
        </Link>

      }
    </>
  )
}