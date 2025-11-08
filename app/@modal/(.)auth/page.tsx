"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Button } from    "@/app/components/ui/button";
import { Input } from     "@/app/components/ui/input";
import { Label } from     "@/app/components/ui/label";
import { Separator } from "@/app/components/ui/separator";
import { handleSocialLogin } from "./actions";

import { ChefHat } from "lucide-react";
import RegisterForm from "@/app/components/RegisterForm";
import LoginForm from "@/app/components/LoginForm";


export interface User {
  name?: string
  email?: string
  pass?: string
  confirmPass?: string

}


export default function AuthPage() {



  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center gap-2 mb-2">
            <ChefHat className="w-12 h-12 text-orange-500" />
          </div>
          <h1 className="text-orange-600">RecipeShare</h1>
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
                <LoginForm/>
              </TabsContent>

              {/* Sign Up Tab */}
              <TabsContent value="signup">
                <RegisterForm/>
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
  );
}
