"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Button } from "@/app/components/ui/button";
import { Separator } from "@/app/components/ui/separator";
import { ChefHat, X } from "lucide-react";
import RegisterForm from "@/app/components/RegisterForm";
import LoginForm from "@/app/components/LoginForm";
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from "react";

export interface User {
  name?: string
  email?: string
  pass?: string
  confirmPass?: string
}

export default function AuthPage() {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  const pathname = usePathname();


  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if(!pathname.includes("auth")) {
    return null;
  }

  return (
    <div 
      key={pathname}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-in fade-in duration-200"
      onClick={handleBackdropClick}
    >
      <div className="relative bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-colors shadow-sm"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <div className="p-6">
          {/* Logo/Brand */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center gap-2 mb-2">
              <ChefHat className="w-12 h-12 text-orange-500" />
            </div>
            <h1 className="text-orange-600 text-2xl font-bold">RecipeShare</h1>
            <p className="text-gray-600 mt-2">Share and discover amazing recipes</p>
          </div>

          {/* Auth Card */}
          <Card>
            <CardHeader>
              <CardTitle>Welcome</CardTitle>
              <CardDescription>Login to your account or create a new one</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Social Sign In Section */}
              <div className="space-y-3 mb-6">
                {/* <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  action={handleSocialLogin("Google")}
                >
                  <Chrome className="w-5 h-5 mr-2" />
                  Continue with Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  action={handleSocialLogin("GitHub")}
                >
                  <Github className="w-5 h-5 mr-2" />
                  Continue with GitHub
                </Button> */}
              </div>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">Or continue with email</span>
                </div>
              </div>

              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                {/* Login Tab */}
                <TabsContent value="login">
                  <LoginForm />
                </TabsContent>

                {/* Sign Up Tab */}
                <TabsContent value="signup">
                  <RegisterForm />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Footer Text */}
          <p className="text-center text-sm text-gray-600 mt-6">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}