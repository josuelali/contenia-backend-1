import { useMemo, useState } from "react";
import {
  Star,
  StarHalf,
  DownloadIcon,
  Share2Icon,
  ShoppingCart,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Product } from "@shared/schema";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

interface ProductDisplayProps {
  products: Product[];
}

async function safeJson(response: Response) {
  const text = await response.text();

  // Si viene HTML (doctype) u otra cosa, evitamos JSON.parse
  if (text.trim().startsWith("<")) {
    return {
      __nonJson: true,
      raw: text,
    };
  }

  try {
    return JSON.parse(text);
  } catch {
    return {
      __nonJson: true,
      raw: text,
    };
  }
}

function extractErrorMessage(payload: any) {
  if (!payload) return "Error desconocido";
  if (typeof payload === "string") return payload;
  if (payload?.message) return payload.message;
  if (payload?.error?.message) return payload.error.message;
  if (payload?.__nonJson)
    return "El servidor devolvió una respuesta no válida (no JSON).";
  return "No se pudo completar la operación.";
}

export default function ProductDisplay({ products }: ProductDisplayProps) {
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null,
  );
  const { toast } = useToast();

  const baseUrl = useMemo(() => {
    try {
      return window.location.origin;
    } catch {
      return "";
    }
  }, []);

  /**
   * GUARDAR
   * Requiere endpoint: POST /api/products/:id/save
   */
  const saveProductMutation = useMutation({
    mutationFn: async (productId: number) => {
      const response = await apiRequest(
        "POST",
        `/api/products/${productId}/save`,
        { action: "save" },
      );

      const data = await safeJson(response);

      if (!response.ok) {
        throw new Error(
          data?.message || `Error ${response.status} al guardar el producto.`,
        );
      }

      return data;
    },
    onSuccess: () => {
      toast({
        title: "Producto guardado",
        description: "El producto ha sido guardado en tu lista.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error al guardar",
        description:
          error?.message ||
          "No se pudo guardar el producto. Inténtalo de nuevo.",
        variant: "destructive",
      });
    },
    onSettled: () => setSelectedProductId(null),
  });

  /**
   * AÑADIR
   * Reutiliza /save con action:"add"
   */
  const addProductMutation = useMutation({
    mutationFn: async (productId: number) => {
      const response = await apiRequest(
        "POST",
        `/api/products/${productId}/save`,
        { action: "add" },
      );

      const data = await safeJson(response);

      if (!response.ok) {
        throw new Error(
          data?.message || `Error ${response.status} al añadir el producto.`,
        );
      }

      return data;
    },
    onSuccess: () => {
      toast({
        title: "Añadido",
        description: "Producto añadido correctamente.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error al añadir",
        description:
          error?.message ||
          "No se pudo añadir el producto. Inténtalo de nuevo.",
        variant: "destructive",
      });
    },
    onSettled: () => setSelectedProductId(null),
  });

  const handleSaveProduct = (productId: number) => {
    setSelectedProductId(productId);
    saveProductMutation.mutate(productId);
  };

  const handleAddProduct = (productId: number) => {
    setSelectedProductId(productId);
    addProductMutation.mutate(productId);
  };

  const handleShareProduct = async (product: Product) => {
    try {
      const url = baseUrl
        ? `${baseUrl}/products/${product.id}`
        : `Producto: ${product.name}`;

      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        toast({
          title: "Enlace copiado",
          description: "Ya puedes pegarlo en WhatsApp/Instagram.",
        });
        return;
      }

      toast({
        title: "Compartir",
        description: url,
      });
    } catch (error: any) {
      toast({
        title: "No se pudo compartir",
        description:
          error?.message || "Inténtalo de nuevo o copia el texto manualmente.",
        variant: "destructive",
      });
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`star-${i}`}
          className="h-4 w-4 text-yellow-400 fill-yellow-400"
        />,
      );
    }

    if (hasHalfStar) {
      stars.push(
        <StarHalf
          key="half-star"
          className="h-4 w-4 text-yellow-400 fill-yellow-400"
        />,
      );
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-star-${i}`} className="h-4 w-4 text-yellow-400" />,
      );
    }

    return stars;
  };

  const isBusy = (productId: number) =>
    selectedProductId === productId &&
    (saveProductMutation.isPending || addProductMutation.isPending);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Productos sugeridos
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card
            key={product.id}
            className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            {product.imageUrl && (
              <div className="h-60 overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}

            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-3">
                {product.trending && (
                  <Badge
                    variant="outline"
                    className="bg-accent-50 text-accent-500 hover:bg-accent-50"
                  >
                    Tendencia
                  </Badge>
                )}
                {product.views && (
                  <span className="text-sm text-gray-500">
                    Vistas: {product.views}
                  </span>
                )}
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {product.name}
              </h3>

              <p className="text-gray-600 text-sm mb-4">
                {product.description}
              </p>

              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-bold text-secondary-500">
                  {product.price}
                </span>
                {product.rating && (
                  <div className="flex items-center">
                    <div className="flex mr-1">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-sm text-gray-500">
                      ({product.reviews})
                    </span>
                  </div>
                )}
              </div>

              {product.tags && product.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {product.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-blue-50 text-blue-800 hover:bg-blue-50"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>

            <CardFooter className="bg-gray-50 px-6 py-4 flex justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSaveProduct(product.id)}
                disabled={isBusy(product.id)}
              >
                <DownloadIcon className="h-4 w-4 mr-2" />
                Guardar
              </Button>

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-accent-600 border-accent-200 hover:bg-accent-50"
                  onClick={() => handleShareProduct(product)}
                  disabled={isBusy(product.id)}
                >
                  <Share2Icon className="h-4 w-4 mr-2" />
                  Compartir
                </Button>

                <Button
                  size="sm"
                  onClick={() => handleAddProduct(product.id)}
                  disabled={isBusy(product.id)}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Añadir
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
