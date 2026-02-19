import { FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Product } from "@shared/schema";

type ContentData = {
  title: string;
  description: string;
  music: string;
  animation: string;
  cta: string;
};

interface ContentEditorProps {
  products: Product[];
  selectedProduct: Product | null;
  onProductSelect: (product: Product) => void;
  contentData: ContentData;
  onContentChange: (data: Partial<ContentData>) => void;
  onGenerateContent: () => void;
  isGenerating: boolean;
}

export default function ContentEditor({
  products,
  selectedProduct,
  onProductSelect,
  contentData,
  onContentChange,
  onGenerateContent,
  isGenerating
}: ContentEditorProps) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onGenerateContent();
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-lg font-bold text-gray-900 mb-6">Editor de contenido</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product Selection */}
        <div>
          <Label htmlFor="product-select" className="mb-2 block">Selecciona un producto</Label>
          <Select
            value={selectedProduct?.id.toString() || ""}
            onValueChange={(value) => {
              const product = products.find(p => p.id.toString() === value);
              if (product) onProductSelect(product);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecciona un producto" />
            </SelectTrigger>
            <SelectContent>
              {products.map((product) => (
                <SelectItem key={product.id} value={product.id.toString()}>
                  {product.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Title Input */}
        <div>
          <Label htmlFor="video-title" className="mb-2 block">Título del video</Label>
          <Input
            id="video-title"
            value={contentData.title}
            onChange={(e) => onContentChange({ title: e.target.value })}
            maxLength={60}
          />
          <p className="text-xs text-gray-500 mt-1">
            {contentData.title.length}/60 caracteres - Usa emojis y mayúsculas para captar atención
          </p>
        </div>
        
        {/* Description Textarea */}
        <div>
          <Label htmlFor="video-description" className="mb-2 block">Descripción del producto</Label>
          <Textarea
            id="video-description"
            rows={3}
            value={contentData.description}
            onChange={(e) => onContentChange({ description: e.target.value })}
            maxLength={200}
          />
          <p className="text-xs text-gray-500 mt-1">
            {contentData.description.length}/200 caracteres - Resalta beneficios y urgencia
          </p>
        </div>
        
        {/* Music Selection */}
        <div>
          <Label htmlFor="video-music" className="mb-2 block">Música de fondo</Label>
          <Select
            value={contentData.music}
            onValueChange={(value) => onContentChange({ music: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecciona un estilo de música" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Tendencia - Upbeat (Recomendado)">Tendencia - Upbeat (Recomendado)</SelectItem>
              <SelectItem value="Energético - Electrónica">Energético - Electrónica</SelectItem>
              <SelectItem value="Suave - Acústica">Suave - Acústica</SelectItem>
              <SelectItem value="Divertido - Pop">Divertido - Pop</SelectItem>
              <SelectItem value="Profesional - Corporativo">Profesional - Corporativo</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Animation Style */}
        <div>
          <Label className="mb-2 block">Estilo de animación</Label>
          <div className="grid grid-cols-3 gap-3">
            <Button
              type="button"
              variant={contentData.animation === "Zoom" ? "secondary" : "outline"}
              onClick={() => onContentChange({ animation: "Zoom" })}
              className="justify-center"
            >
              Zoom
            </Button>
            <Button
              type="button"
              variant={contentData.animation === "Deslizar" ? "secondary" : "outline"}
              onClick={() => onContentChange({ animation: "Deslizar" })}
              className="justify-center"
            >
              Deslizar
            </Button>
            <Button
              type="button"
              variant={contentData.animation === "Rebote" ? "secondary" : "outline"}
              onClick={() => onContentChange({ animation: "Rebote" })}
              className="justify-center"
            >
              Rebote
            </Button>
          </div>
        </div>
        
        {/* Call to Action */}
        <div>
          <Label htmlFor="video-cta" className="mb-2 block">Llamada a la acción</Label>
          <Select
            value={contentData.cta}
            onValueChange={(value) => onContentChange({ cta: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecciona una llamada a la acción" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Comprar ahora">Comprar ahora</SelectItem>
              <SelectItem value="¡Lo quiero!">¡Lo quiero!</SelectItem>
              <SelectItem value="Ver más">Ver más</SelectItem>
              <SelectItem value="Oferta limitada">Oferta limitada</SelectItem>
              <SelectItem value="Añadir al carrito">Añadir al carrito</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Action Buttons */}
        <div className="flex space-x-3 pt-4">
          <Button 
            type="submit" 
            className="flex-1 bg-primary-500 hover:bg-primary-600"
            disabled={isGenerating || !selectedProduct}
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generando...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h1"/>
                  <path d="m12 19 4-4-4-4"/>
                  <path d="M16 15H9"/>
                  <path d="M15 3h1a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-1"/>
                </svg>
                Generar video
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
