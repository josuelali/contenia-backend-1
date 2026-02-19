import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CategorySelector from "@/components/product-generator/CategorySelector";
import ProductDisplay from "@/components/product-generator/ProductDisplay";
import { UsageLimits } from "@/components/ui/usage-limits";
import type { Product } from "@shared/schema";
import { Loader2 } from "lucide-react";

export default function ProductGenerator() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [priceRange, setPriceRange] = useState<number>(3);
  const [trendingOnly, setTrendingOnly] = useState<boolean>(false);
  const [fastShipping, setFastShipping] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);

  const { toast } = useToast();
  const { user } = useAuth();

  const generateProductsMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/products/generate", {
        category: selectedCategory,
        priceRange,
        trendingOnly,
        fastShipping,
      });
      return response.json();
    },
    onSuccess: (data: any) => {
      setProducts(data?.products || []);
      toast({
        title: "¡Productos generados!",
        description: "Hemos encontrado algunos productos virales para ti.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error al generar productos",
        description: error?.message || "Hubo un problema. Inténtalo de nuevo.",
        variant: "destructive",
      });
    },
  });

  const handleGenerateProducts = () => {
    if (!selectedCategory) {
      toast({
        title: "Selecciona una categoría",
        description: "Por favor, selecciona una categoría antes de continuar.",
        variant: "destructive",
      });
      return;
    }

    const currentUsage = (user as any)?.monthlyProductGenerations || 0;
    const userPlan = (user as any)?.subscriptionPlan || "free";
    const limit =
      userPlan === "enterprise" ? 999999 : userPlan === "premium" ? 100 : 10;

    if (currentUsage >= limit) {
      toast({
        title: "Límite alcanzado",
        description: "Mejora tu plan para continuar generando productos.",
        variant: "destructive",
      });
      return;
    }

    generateProductsMutation.mutate();
  };

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 font-heading">
            Generador de Productos
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Selecciona tus intereses y preferencias para generar sugerencias de
            productos virales.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="bg-white shadow-sm rounded-lg border border-gray-100 p-6">
              <CategorySelector
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                priceRange={priceRange}
                onPriceRangeChange={setPriceRange}
                trendingOnly={trendingOnly}
                onTrendingOnlyChange={setTrendingOnly}
                fastShipping={fastShipping}
                onFastShippingChange={setFastShipping}
              />

              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleGenerateProducts}
                  disabled={generateProductsMutation.isPending}
                  className="px-5 py-3 rounded-lg shadow-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 flex items-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {generateProductsMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generando...
                    </>
                  ) : (
                    <>Generar sugerencias</>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <UsageLimits
              type="product"
              current={(user as any)?.monthlyProductGenerations || 0}
              limit={
                (user as any)?.subscriptionPlan === "enterprise"
                  ? 999999
                  : (user as any)?.subscriptionPlan === "premium"
                    ? 100
                    : 10
              }
            />
          </div>
        </div>

        {generateProductsMutation.isPending && (
          <div className="text-center py-12">
            <Loader2 className="h-12 w-12 mx-auto animate-spin text-primary-500" />
            <p className="mt-4 text-lg text-gray-600">
              Buscando los mejores productos para ti...
            </p>
          </div>
        )}

        {products.length > 0 && <ProductDisplay products={products} />}
      </main>

      <Footer />
    </>
  );
}
