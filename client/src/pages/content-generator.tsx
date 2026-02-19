import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContentEditor from "@/components/content-generator/ContentEditor";
import VideoPreview from "@/components/content-generator/VideoPreview";
import { Product } from "@shared/schema";
import { Loader2 } from "lucide-react";

type ContentData = {
  title: string;
  description: string;
  music: string;
  animation: string;
  cta: string;
};

const initialContent: ContentData = {
  title: "¡PRODUCTO INCREÍBLE QUE NECESITAS YA! 😍",
  description:
    "Este producto cambiará tu vida cotidiana. ¡No podrás creer su calidad y precio!",
  music: "Tendencia - Upbeat (Recomendado)",
  animation: "Zoom",
  cta: "Comprar ahora",
};

export default function ContentGenerator() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [contentData, setContentData] = useState<ContentData>(initialContent);
  const [videoUrl, setVideoUrl] = useState<string>("");

  const { toast } = useToast();

  // Título de la página (sin Helmet)
  useEffect(() => {
    document.title = "Generador de Contenido | VendeConIA";
  }, []);

  // Cargar productos recientes
  const fetchProductsMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("GET", "/api/products/recent");
      return response.json();
    },
    onSuccess: (data) => {
      setProducts(data.products || []);
      if (data.products?.length > 0) {
        setSelectedProduct(data.products[0]);
      }
    },
    onError: (error: any) => {
      toast({
        title: "Error al cargar productos",
        description:
          error?.message || "No se pudieron cargar los productos recientes.",
        variant: "destructive",
      });
    },
  });

  // Ejecutar carga al montar
  useEffect(() => {
    fetchProductsMutation.mutate();
  }, []);

  // Generar contenido
  const generateContentMutation = useMutation({
    mutationFn: async () => {
      if (!selectedProduct) {
        throw new Error("No product selected");
      }

      const response = await apiRequest("POST", "/api/content/generate", {
        productId: selectedProduct.id,
        contentData,
      });
      return response.json();
    },
    onSuccess: (data) => {
      setVideoUrl(data.videoUrl);
      toast({
        title: "¡Contenido generado!",
        description: "Tu video promocional ha sido creado con éxito.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error al generar contenido",
        description:
          error?.message ||
          "Hubo un problema al crear el contenido. Inténtalo de nuevo.",
        variant: "destructive",
      });
    },
  });

  const handleContentChange = (newContent: Partial<ContentData>) => {
    setContentData({ ...contentData, ...newContent });
  };

  const handleGenerateContent = () => {
    if (!selectedProduct) {
      toast({
        title: "Selecciona un producto",
        description:
          "Por favor, selecciona un producto antes de generar contenido.",
        variant: "destructive",
      });
      return;
    }

    generateContentMutation.mutate();
  };

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 font-heading">
            Generador de Contenido
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Crea videos promocionales y textos persuasivos para tus productos en
            minutos.
          </p>
        </div>

        {fetchProductsMutation.isPending ? (
          <div className="text-center py-12">
            <Loader2 className="h-12 w-12 mx-auto animate-spin text-primary-500" />
            <p className="mt-4 text-lg text-gray-600">
              Cargando tus productos...
            </p>
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            <VideoPreview
              product={selectedProduct}
              contentData={contentData}
              videoUrl={videoUrl}
              isGenerating={generateContentMutation.isPending}
            />

            <ContentEditor
              products={products}
              selectedProduct={selectedProduct}
              onProductSelect={setSelectedProduct}
              contentData={contentData}
              onContentChange={handleContentChange}
              onGenerateContent={handleGenerateContent}
              isGenerating={generateContentMutation.isPending}
            />
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
