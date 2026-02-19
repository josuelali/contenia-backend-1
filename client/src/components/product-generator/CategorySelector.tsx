import { Shirt, Home, Smartphone, Gamepad, HeartPulse, Plus } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface CategorySelectorProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  priceRange: number;
  onPriceRangeChange: (value: number) => void;
  trendingOnly: boolean;
  onTrendingOnlyChange: (value: boolean) => void;
  fastShipping: boolean;
  onFastShippingChange: (value: boolean) => void;
}

const categories = [
  { id: "ropa", name: "Ropa y Moda", icon: Shirt },
  { id: "hogar", name: "Hogar y Decoración", icon: Home },
  { id: "tecnologia", name: "Tecnología", icon: Smartphone },
  { id: "videojuegos", name: "Videojuegos", icon: Gamepad },
  { id: "salud", name: "Salud y Bienestar", icon: HeartPulse },
  { id: "otros", name: "Más Categorías", icon: Plus }
];

const getPriceRangeLabel = (value: number) => {
  switch (value) {
    case 1: return "Muy económico";
    case 2: return "Económico";
    case 3: return "Medio";
    case 4: return "Premium";
    case 5: return "Lujo";
    default: return "Medio";
  }
};

export default function CategorySelector({
  selectedCategory,
  onSelectCategory,
  priceRange,
  onPriceRangeChange,
  trendingOnly,
  onTrendingOnlyChange,
  fastShipping,
  onFastShippingChange
}: CategorySelectorProps) {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4">¿Qué te interesa vender?</h2>
      
      {/* Categories Selection */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {categories.map((category) => {
          const Icon = category.icon;
          const isSelected = selectedCategory === category.id;
          
          return (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`
                rounded-lg p-4 flex flex-col items-center justify-center transition duration-150
                ${isSelected 
                  ? 'bg-primary-50 border-2 border-primary-500 text-primary-500' 
                  : 'bg-white border-2 border-gray-200 hover:bg-gray-50 text-gray-400'}
              `}
            >
              <Icon className={`h-8 w-8 ${isSelected ? 'text-primary-500' : 'text-gray-400'}`} />
              <span className={`mt-2 text-sm font-medium ${isSelected ? 'text-gray-900' : 'text-gray-900'}`}>
                {category.name}
              </span>
            </button>
          );
        })}
      </div>
      
      {/* Additional Preferences */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h3 className="font-medium text-gray-900 mb-4">Preferencias adicionales</h3>
        <div className="space-y-6">
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="price-range">Rango de precio</Label>
              <span className="text-sm text-gray-500">{getPriceRangeLabel(priceRange)}</span>
            </div>
            <Slider
              id="price-range"
              min={1}
              max={5}
              step={1}
              value={[priceRange]}
              onValueChange={(values) => onPriceRangeChange(values[0])}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="trending-only"
              checked={trendingOnly}
              onCheckedChange={(checked) => onTrendingOnlyChange(checked as boolean)}
            />
            <Label htmlFor="trending-only" className="text-sm text-gray-500">Solo productos en tendencia</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="fast-shipping"
              checked={fastShipping}
              onCheckedChange={(checked) => onFastShippingChange(checked as boolean)}
            />
            <Label htmlFor="fast-shipping" className="text-sm text-gray-500">Envío rápido disponible</Label>
          </div>
        </div>
      </div>
    </div>
  );
}
