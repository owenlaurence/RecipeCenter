import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Checkbox } from "./ui/checkbox";
import { Slider } from "./ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { X } from "lucide-react";

export interface FilterState {
  categories: string[];
  prepTimeRange: [number, number];
  servingsRange: [number, number];
  sortBy: "newest" | "oldest" | "prepTime-asc" | "prepTime-desc" | "servings-asc" | "servings-desc";
}

interface FilterPanelProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  availableCategories: string[];
}

export function FilterPanel({ filters, onFiltersChange, availableCategories }: FilterPanelProps) {
  const handleCategoryToggle = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, category]
      : filters.categories.filter((c) => c !== category);
    onFiltersChange({ ...filters, categories: newCategories });
  };

  const handlePrepTimeChange = (value: number[]) => {
    onFiltersChange({ ...filters, prepTimeRange: [value[0], value[1]] });
  };

  const handleServingsChange = (value: number[]) => {
    onFiltersChange({ ...filters, servingsRange: [value[0], value[1]] });
  };

  const handleSortChange = (value: string) => {
    onFiltersChange({ ...filters, sortBy: value as FilterState["sortBy"] });
  };

  const handleReset = () => {
    onFiltersChange({
      categories: [],
      prepTimeRange: [0, 120],
      servingsRange: [1, 12],
      sortBy: "newest",
    });
  };

  const hasActiveFilters = 
    filters.categories.length > 0 ||
    filters.prepTimeRange[0] !== 0 ||
    filters.prepTimeRange[1] !== 120 ||
    filters.servingsRange[0] !== 1 ||
    filters.servingsRange[1] !== 12 ||
    filters.sortBy !== "newest";

  return (
    <Card className="sticky top-24">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>Filters</CardTitle>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={handleReset}>
              <X className="w-4 h-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Sort By */}
        <div className="space-y-2">
          <Label>Sort By</Label>
          <Select value={filters.sortBy} onValueChange={handleSortChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="prepTime-asc">Prep Time (Low to High)</SelectItem>
              <SelectItem value="prepTime-desc">Prep Time (High to Low)</SelectItem>
              <SelectItem value="servings-asc">Servings (Low to High)</SelectItem>
              <SelectItem value="servings-desc">Servings (High to Low)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Categories */}
        <div className="space-y-3">
          <Label>Categories</Label>
          <div className="space-y-2">
            {availableCategories?.filter(c => c !== "All").map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category}`}
                  checked={filters.categories.includes(category)}
                  onCheckedChange={(checked) => handleCategoryToggle(category, checked as boolean)}
                />
                <label
                  htmlFor={`category-${category}`}
                  className="text-sm cursor-pointer select-none"
                >
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Prep Time Range */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Prep Time</Label>
            <span className="text-sm text-gray-500">
              {filters.prepTimeRange[0]} - {filters.prepTimeRange[1]}+ min
            </span>
          </div>
          <Slider
            min={0}
            max={120}
            step={5}
            value={filters.prepTimeRange}
            onValueChange={handlePrepTimeChange}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>0 min</span>
            <span>120+ min</span>
          </div>
        </div>

        {/* Servings Range */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Servings</Label>
            <span className="text-sm text-gray-500">
              {filters.servingsRange[0]} - {filters.servingsRange[1]}
            </span>
          </div>
          <Slider
            min={1}
            max={12}
            step={1}
            value={filters.servingsRange}
            onValueChange={handleServingsChange}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>1</span>
            <span>12+</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}