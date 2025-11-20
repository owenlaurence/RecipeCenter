"use client"
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Badge } from "@/app/components/ui/badge";
import { Separator } from "@/app/components/ui/separator";
import { 
  User, 
  Mail, 
  MapPin, 
  Calendar, 
  Edit, 
  Save, 
  X, 
  ChefHat, 
  Clock, 
  Users,
  Star,
  BookMarked
} from "lucide-react";
import { useAuth } from "@/app/components/AuthProvider";
import { useRouter } from "next/navigation";

interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  prepTime: number;
  servings: number;
  category: string;
  author: string;
}

interface UserProfileProps {
  currentUser: { name: string; email: string };
  userRecipes: Recipe[];
  onClose: () => void;
  onUpdateProfile: (updatedUser: { name: string; email: string; bio?: string; location?: string }) => void;
}

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedBio, setEditedBio] = useState("Passionate home chef and food enthusiast. Love sharing my favorite recipes with the community!");
  const [editedLocation, setEditedLocation] = useState("New York, NY");

  const { user } = useAuth();

  const handleSaveProfile = () => {
    if (!editedName || !editedEmail) {
      // toast.error("Name and email are required");
      return;
    }

    // onUpdateProfile({
    //   name: editedName,
    //   email: editedEmail,
    //   bio: editedBio,
    //   location: editedLocation
    // });
    setIsEditing(false);
    // toast.success("Profile updated successfully!");
  };

  const handleCancelEdit = () => {
    // setEditedName(currentUser.name);
    // setEditedEmail(currentUser.email);
    setIsEditing(false);
  };

  // Calculate user stats
  // const totalRecipes = userRecipes.length;
  // const totalPrepTime = userRecipes.reduce((sum, recipe) => sum + recipe.prepTime, 0);
  // const avgPrepTime = totalRecipes > 0 ? Math.round(totalPrepTime / totalRecipes) : 0;
  // const categories = [...new Set(userRecipes.map(r => r.category))];

  const totalRecipes = 12;
  const totalPrepTime = 12
  const avgPrepTime = totalRecipes > 0 ? Math.round(totalPrepTime / totalRecipes) : 0;
  const categories = ["one", "two"]
  const userRecipes : any = [];


  const router = useRouter();

  const onClose = () => {
    router.back()
  }


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-6">
              <Avatar className="w-24 h-24 border-4 border-white">
                <AvatarFallback className="text-3xl bg-orange-300">
                  {user?.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-white mb-2">{user?.name}</h1>
                <div className="flex flex-wrap gap-4 text-orange-50">
                  <div className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{user?.email}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{editedLocation}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">Joined November 2024</span>
                  </div>
                </div>
              </div>
            </div>
            <Button variant="secondary" onClick={onClose}>
              <X className="w-4 h-4 mr-2" />
              Close
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 -mt-8 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Recipes</p>
                  <p className="text-3xl mt-1">{totalRecipes}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <ChefHat className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Followers</p>
                  <p className="text-3xl mt-1">248</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg Prep Time</p>
                  <p className="text-3xl mt-1">{avgPrepTime}<span className="text-base text-gray-500">min</span></p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Categories</p>
                  <p className="text-3xl mt-1">{categories.length}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <BookMarked className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-8">
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="recipes">My Recipes ({totalRecipes})</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* About Tab */}
          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle>About Me</CardTitle>
                <CardDescription>A little bit about my cooking journey</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-6">
                  {editedBio}
                </p>
                
                <Separator className="my-6" />
                
                <div>
                  <h3 className="mb-4">Recipe Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.length > 0 ? (
                      categories.map((category) => (
                        <Badge key={category} variant="secondary">
                          {category}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-gray-500">No recipes yet</p>
                    )}
                  </div>
                </div>

                <Separator className="my-6" />

                <div>
                  <h3 className="mb-4">Achievements</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-4 border rounded-lg">
                      <Star className="w-8 h-8 text-yellow-500" />
                      <div>
                        <p>First Recipe</p>
                        <p className="text-sm text-gray-500">Shared your first recipe</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 border rounded-lg">
                      <ChefHat className="w-8 h-8 text-orange-500" />
                      <div>
                        <p>Recipe Contributor</p>
                        <p className="text-sm text-gray-500">Shared 5 recipes</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* My Recipes Tab */}
          <TabsContent value="recipes">
            <Card>
              <CardHeader>
                <CardTitle>My Recipes</CardTitle>
                <CardDescription>Recipes you've shared with the community</CardDescription>
              </CardHeader>
              <CardContent>
                {userRecipes.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {userRecipes.map((recipe : any) => (
                      <div key={recipe.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                        <img 
                          src={recipe.image} 
                          alt={recipe.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                          <h3 className="mb-2">{recipe.title}</h3>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{recipe.description}</p>
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {recipe.prepTime} min
                            </div>
                            <Badge variant="outline">{recipe.category}</Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <ChefHat className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">You haven't shared any recipes yet</p>
                    <Button onClick={onClose}>
                      <ChefHat className="w-4 h-4 mr-2" />
                      Share Your First Recipe
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Profile Settings</CardTitle>
                    <CardDescription>Manage your account information</CardDescription>
                  </div>
                  {!isEditing && (
                    <Button onClick={() => setIsEditing(true)} variant="outline">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={editedEmail}
                      onChange={(e) => setEditedEmail(e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={editedLocation}
                      onChange={(e) => setEditedLocation(e.target.value)}
                      disabled={!isEditing}
                      placeholder="City, Country"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={editedBio}
                      onChange={(e) => setEditedBio(e.target.value)}
                      disabled={!isEditing}
                      rows={4}
                      placeholder="Tell us about yourself and your cooking journey..."
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="flex gap-3">
                    <Button onClick={handleSaveProfile}>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button onClick={handleCancelEdit} variant="outline">
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                )}

                <Separator className="my-6" />

                <div className="space-y-4">
                  <h3>Account Actions</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      Change Password
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Privacy Settings
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Notification Preferences
                    </Button>
                  </div>
                </div>

                <Separator className="my-6" />

                <div>
                  <h3 className="text-red-600 mb-4">Danger Zone</h3>
                  <Button variant="destructive" className="w-full">
                    Delete Account
                  </Button>
                  <p className="text-sm text-gray-500 mt-2">
                    This action cannot be undone. All your recipes will be permanently deleted.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
