import { useState } from "react";
import { Play, Heart, MessageCircle, Share2, ShoppingCart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from "@shared/schema";

interface VideoPreviewProps {
  product: Product | null;
  contentData: {
    title: string;
    description: string;
    music: string;
    animation: string;
    cta: string;
  };
  videoUrl: string;
  isGenerating: boolean;
}

export default function VideoPreview({ 
  product, 
  contentData,
  videoUrl,
  isGenerating 
}: VideoPreviewProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Toggle play state (would trigger actual video in a real implementation)
  const togglePlay = () => {
    if (!videoUrl) return;
    setIsPlaying(!isPlaying);
  };
  
  if (!product) {
    return (
      <Card className="relative bg-gray-100 rounded-xl overflow-hidden aspect-[9/16] flex items-center justify-center">
        <div className="text-center p-6">
          <p className="text-gray-500 mb-4">Selecciona un producto para generar contenido</p>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        </div>
      </Card>
    );
  }
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-lg font-bold text-gray-900 mb-6">Vista previa del contenido</h3>
      
      <div className="bg-gray-900 rounded-xl overflow-hidden shadow-xl">
        {/* Phone Frame */}
        <div className="relative pb-[177.78%]"> {/* 16:9 aspect ratio */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Simulated video content with play icon */}
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="w-full h-full object-cover opacity-90" 
            />
            <div className="absolute inset-0 flex flex-col justify-between p-4">
              {/* Top Text */}
              <div className="text-white font-bold text-xl drop-shadow-lg">
                {contentData.title}
              </div>
              
              {/* Bottom Elements */}
              <div className="space-y-4">
                <div className="bg-black bg-opacity-50 p-3 rounded-lg">
                  <p className="text-white text-sm">
                    {contentData.description}
                  </p>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex space-x-3">
                    <Button variant="ghost" size="icon" className="bg-white bg-opacity-20 text-white rounded-full h-10 w-10 p-2">
                      <Heart className="h-5 w-5 text-red-500 fill-current" />
                    </Button>
                    <Button variant="ghost" size="icon" className="bg-white bg-opacity-20 text-white rounded-full h-10 w-10 p-2">
                      <MessageCircle className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="bg-white bg-opacity-20 text-white rounded-full h-10 w-10 p-2">
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>
                  
                  <div className="bg-secondary-500 text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse flex items-center">
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    {contentData.cta}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Button 
                onClick={togglePlay} 
                variant="ghost" 
                size="icon" 
                className="w-16 h-16 bg-white bg-opacity-30 rounded-full flex items-center justify-center hover:bg-opacity-40 transition duration-200"
                disabled={isGenerating || !videoUrl}
              >
                {isGenerating ? (
                  <div className="h-8 w-8 border-t-2 border-white rounded-full animate-spin"></div>
                ) : (
                  <Play className="h-8 w-8 text-white ml-1" />
                )}
              </Button>
            </div>
            
            {/* Instagram-like Interface Elements */}
            <div className="absolute top-4 left-4 flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">VC</span>
              </div>
              <span className="text-white text-sm font-medium">vendeconia</span>
            </div>
          </div>
        </div>
      </div>
      
      {videoUrl ? (
        <div className="mt-6 text-center">
          <div className="flex space-x-3">
            <Button className="flex-1 bg-primary-500 hover:bg-primary-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Descargar video
            </Button>
            <Button className="flex-1 bg-secondary-500 hover:bg-secondary-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              Publicar en Instagram
            </Button>
          </div>
        </div>
      ) : (
        <div className="mt-6 text-center text-gray-500">
          {isGenerating ? 
            "Generando video, espera un momento..." : 
            "Haz clic en 'Generar video' para crear el contenido"
          }
        </div>
      )}
    </div>
  );
}
