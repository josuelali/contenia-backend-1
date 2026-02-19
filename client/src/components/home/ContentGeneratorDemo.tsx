import { Play } from "lucide-react";

export default function ContentGeneratorDemo() {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-primary-500 tracking-wide uppercase font-heading">Creador de contenido</h2>
          <p className="mt-1 text-3xl font-extrabold text-gray-900 sm:text-4xl font-heading">
            De la idea al reel en minutos
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Nuestro editor de contenido te permite crear videos y textos profesionales para promocionar tus productos.
          </p>
        </div>

        <div className="mt-12 lg:flex lg:items-center lg:gap-8">
          {/* Video Preview */}
          <div className="lg:w-1/2">
            <div className="bg-gray-900 rounded-xl overflow-hidden shadow-xl">
              {/* Phone Frame */}
              <div className="relative pb-[177.78%]"> {/* 16:9 aspect ratio */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Simulated video content with play icon */}
                  <img 
                    src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=900" 
                    alt="Vista previa de reel promocional" 
                    className="w-full h-full object-cover opacity-90" 
                  />
                  <div className="absolute inset-0 flex flex-col justify-between p-4">
                    {/* Top Text */}
                    <div className="text-white font-bold text-xl drop-shadow-lg">
                      ¡ORGANIZADOR QUE NECESITAS YA! 😍
                    </div>
                    
                    {/* Bottom Elements */}
                    <div className="space-y-4">
                      <div className="bg-black bg-opacity-50 p-3 rounded-lg">
                        <p className="text-white text-sm">
                          Mantén todos tus cables y accesorios organizados con este increíble gadget. ¡Solo hoy 30% OFF! 🔥
                        </p>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex space-x-3">
                          <button className="bg-white bg-opacity-20 p-2 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 fill-current" viewBox="0 0 24 24">
                              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>
                          </button>
                          <button className="bg-white bg-opacity-20 p-2 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                            </svg>
                          </button>
                          <button className="bg-white bg-opacity-20 p-2 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                              <polyline points="16 6 12 2 8 6"></polyline>
                              <line x1="12" y1="2" x2="12" y2="15"></line>
                            </svg>
                          </button>
                        </div>
                        
                        <div className="bg-secondary-500 text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse">
                          Comprar ahora
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="w-16 h-16 bg-white bg-opacity-30 rounded-full flex items-center justify-center hover:bg-opacity-40 transition duration-200">
                      <Play className="h-8 w-8 text-white ml-1" />
                    </button>
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
          </div>
          
          {/* Content Editor Controls */}
          <div className="mt-10 lg:mt-0 lg:w-1/2">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Editor de contenido</h3>
            
            {/* Editor Controls */}
            <div className="space-y-6">
              {/* Text Input */}
              <div>
                <label htmlFor="video-title" className="block text-sm font-medium text-gray-700">Título del video</label>
                <input 
                  type="text" 
                  id="video-title" 
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm" 
                  defaultValue="¡ORGANIZADOR QUE NECESITAS YA! 😍" 
                />
              </div>
              
              {/* Text Area */}
              <div>
                <label htmlFor="video-description" className="block text-sm font-medium text-gray-700">Descripción del producto</label>
                <textarea 
                  id="video-description" 
                  rows={3} 
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  defaultValue="Mantén todos tus cables y accesorios organizados con este increíble gadget. ¡Solo hoy 30% OFF! 🔥"
                ></textarea>
              </div>
              
              {/* Music Selection */}
              <div>
                <label htmlFor="video-music" className="block text-sm font-medium text-gray-700">Música de fondo</label>
                <select 
                  id="video-music" 
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                >
                  <option>Tendencia - Upbeat (Recomendado)</option>
                  <option>Energético - Electrónica</option>
                  <option>Suave - Acústica</option>
                  <option>Divertido - Pop</option>
                  <option>Profesional - Corporativo</option>
                </select>
              </div>
              
              {/* Animation Style */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Estilo de animación</label>
                <div className="mt-2 grid grid-cols-3 gap-3">
                  <div>
                    <button type="button" className="w-full bg-primary-50 border-2 border-primary-500 rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium text-primary-500 hover:bg-primary-100">
                      Zoom
                    </button>
                  </div>
                  <div>
                    <button type="button" className="w-full bg-white border-2 border-gray-200 rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium text-gray-500 hover:bg-gray-50">
                      Deslizar
                    </button>
                  </div>
                  <div>
                    <button type="button" className="w-full bg-white border-2 border-gray-200 rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium text-gray-500 hover:bg-gray-50">
                      Rebote
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Call to Action */}
              <div>
                <label htmlFor="video-cta" className="block text-sm font-medium text-gray-700">Llamada a la acción</label>
                <select 
                  id="video-cta" 
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                >
                  <option>Comprar ahora</option>
                  <option>¡Lo quiero!</option>
                  <option>Ver más</option>
                  <option>Oferta limitada</option>
                  <option>Añadir al carrito</option>
                </select>
              </div>
              
              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button className="flex-1 bg-primary-500 text-white py-2 px-4 rounded-md hover:bg-primary-600 transition duration-150 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  Descargar video
                </button>
                <button className="flex-1 bg-secondary-500 text-white py-2 px-4 rounded-md hover:bg-secondary-600 transition duration-150 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                  Publicar en Instagram
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
