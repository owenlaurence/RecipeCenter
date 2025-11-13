"use client"
import { useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import { Button } from "./ui/button"
import { Plus, User, Settings, LogOut, ChevronDown } from "lucide-react"
import Link from "next/link";

export default function UserInfo() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    console.log(user)
  }, [user])

  return (
    <>
      {user
        ? <div className="relative">
            <div 
              className="flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
            >
              <p className="text-gray-600">{user.name}</p>
              <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </div>
            
            {isOpen && (
              <div 
                className="absolute right-0 mt-0 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50"
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
              >
                <Link 
                  href={`/profile/${user.id}`}
                  className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </Link>
                <Link 
                  href="/settings" 
                  className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </Link>
                <hr className="my-1 border-gray-200" />
                <button 
                  onClick={() => {/* better auth logout */}}
                  className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        : <Link href="/auth" className="flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Share Recipe
          </Link>
      }
    </>
  )
}