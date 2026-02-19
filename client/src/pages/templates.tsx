import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Download, Search, Filter } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Templates() {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: templates, isLoading } = useQuery({
    queryKey: ['/api/templates', selectedCategory],
    enabled: true,
  });

  const categories = [
    "Todos",
    "Tecnología",
    "Hogar",
    "Deportes",
    "Moda",
    "Belleza",
    "Gadgets",
    "Cocina",
    "Jardín",
    "Automóvil"
  ];

  const filteredTemplates = templates?.filter(template => 
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.description.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handlePurchase = async (templateId: number, price: number) => {
    if (!isAuthenticated) {
      window.location.href = '/api/login';
      return;
    }

    try {
      await apiRequest("POST", `/api/templates/${templateId}/purchase`, { price });
      toast({
        title: "¡Compra exitosa!",
        description: "La plantilla ha sido añadida a tu colección.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo completar la compra. Inténtalo de nuevo.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Marketplace de Plantillas
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descubre plantillas profesionales creadas por expertos para acelerar tu negocio
          </p>
        </div>

        {/* Filtros */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar plantillas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category === "Todos" ? "" : category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Grid de plantillas */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold group-hover:text-blue-600 transition-colors">
                      {template.name}
                    </CardTitle>
                    <Badge variant="secondary" className="mt-2">
                      {template.category}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">
                      €{template.price}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {template.rating || 5.0}
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <CardDescription className="text-sm">
                  {template.description}
                </CardDescription>
                
                {template.previewUrl && (
                  <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    <img 
                      src={template.previewUrl} 
                      alt={template.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Download className="h-4 w-4" />
                    {template.downloads || 0} descargas
                  </div>
                  
                  <Button 
                    onClick={() => handlePurchase(template.id, template.price)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Comprar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No se encontraron plantillas que coincidan con tu búsqueda.
            </p>
          </div>
        )}

        {/* Sección de creadores */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-sm">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              ¿Eres creador de contenido?
            </h2>
            <p className="text-gray-600">
              Únete a nuestro marketplace y monetiza tus plantillas
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">70%</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Comisión del creador
              </h3>
              <p className="text-gray-600">
                Gana el 70% de cada venta de tus plantillas
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">24h</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Aprobación rápida
              </h3>
              <p className="text-gray-600">
                Revisamos y aprobamos tus plantillas en menos de 24 horas
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">∞</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Ingresos pasivos
              </h3>
              <p className="text-gray-600">
                Tus plantillas generan ingresos automáticamente
              </p>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Button 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              onClick={() => window.location.href = isAuthenticated ? '/dashboard' : '/api/login'}
            >
              Convertirse en Creador
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}