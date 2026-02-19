import { CheckIcon, HomeIcon, CompassIcon, ShoppingBagIcon, FilmIcon, StoreIcon, SettingsIcon } from "lucide-react";

export default function AppDemo() {
  return (
    <div className="bg-gradient-to-r from-primary-50 to-accent-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl font-heading">
              Aplicación intuitiva y fácil de usar
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Nuestra interfaz está diseñada para que puedas comenzar a vender en minutos, sin conocimientos técnicos previos.
            </p>
            
            {/* Feature List */}
            <div className="mt-8">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckIcon className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="ml-3 text-base text-gray-500">
                    <span className="font-medium text-gray-900">Formulario inteligente</span> para descubrir tus intereses de venta.
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckIcon className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="ml-3 text-base text-gray-500">
                    <span className="font-medium text-gray-900">Visualización de productos</span> con todos los detalles clave para tomar decisiones.
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckIcon className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="ml-3 text-base text-gray-500">
                    <span className="font-medium text-gray-900">Editor de contenido</span> para personalizar textos e imágenes.
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckIcon className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="ml-3 text-base text-gray-500">
                    <span className="font-medium text-gray-900">Vista previa en tiempo real</span> de cómo se verán tus productos en tienda.
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckIcon className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="ml-3 text-base text-gray-500">
                    <span className="font-medium text-gray-900">Botones de acción rápida</span> para publicar o guardar tu trabajo.
                  </p>
                </li>
              </ul>
            </div>
            
            <div className="mt-8">
              <a href="/product-generator" className="text-base font-medium text-primary-600 hover:text-primary-500 inline-flex items-center">
                Explorar todas las funciones 
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </div>
          </div>
          
          <div className="mt-12 lg:mt-0 lg:col-span-7">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Application Interface Mockup */}
              <div className="bg-gray-800 py-3 px-4 flex items-center">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="ml-4 flex-1 flex justify-center">
                  <div className="bg-gray-700 rounded-md py-1 px-3 text-sm text-gray-300">vendecon.ia/app</div>
                </div>
              </div>
              
              <div className="grid grid-cols-5 h-96">
                {/* Sidebar */}
                <div className="col-span-1 bg-gray-50 border-r border-gray-200 p-4">
                  <div className="flex items-center mb-6">
                    <span className="text-primary-500 text-lg font-bold">Vende<span className="text-secondary-500">Con</span><span className="text-accent-500">IA</span></span>
                  </div>
                  <nav className="space-y-1">
                    <a href="#" className="flex items-center px-2 py-2 text-sm font-medium text-primary-500 bg-primary-50 rounded-md">
                      <HomeIcon className="h-5 w-5 mr-3 text-primary-500" />
                      Inicio
                    </a>
                    <a href="#" className="flex items-center px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md">
                      <CompassIcon className="h-5 w-5 mr-3 text-gray-400" />
                      Nichos
                    </a>
                    <a href="#" className="flex items-center px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md">
                      <ShoppingBagIcon className="h-5 w-5 mr-3 text-gray-400" />
                      Productos
                    </a>
                    <a href="#" className="flex items-center px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md">
                      <FilmIcon className="h-5 w-5 mr-3 text-gray-400" />
                      Contenido
                    </a>
                    <a href="#" className="flex items-center px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md">
                      <StoreIcon className="h-5 w-5 mr-3 text-gray-400" />
                      Mi tienda
                    </a>
                    <a href="#" className="flex items-center px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md">
                      <SettingsIcon className="h-5 w-5 mr-3 text-gray-400" />
                      Ajustes
                    </a>
                  </nav>
                </div>
                
                {/* Main Content */}
                <div className="col-span-4 p-6 overflow-y-auto">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">¿Qué te interesa vender?</h2>
                  
                  {/* Categories Selection */}
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    <button className="bg-primary-50 border-2 border-primary-500 rounded-lg p-4 flex flex-col items-center justify-center hover:bg-primary-100 transition duration-150">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/>
                      </svg>
                      <span className="mt-2 text-sm font-medium text-gray-900">Ropa y Moda</span>
                    </button>
                    
                    <button className="bg-white border-2 border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center hover:bg-gray-50 transition duration-150">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                        <polyline points="9 22 9 12 15 12 15 22"/>
                      </svg>
                      <span className="mt-2 text-sm font-medium text-gray-900">Hogar y Decoración</span>
                    </button>
                    
                    <button className="bg-white border-2 border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center hover:bg-gray-50 transition duration-150">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                        <line x1="12" y1="18" x2="12.01" y2="18"/>
                      </svg>
                      <span className="mt-2 text-sm font-medium text-gray-900">Tecnología</span>
                    </button>
                    
                    <button className="bg-white border-2 border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center hover:bg-gray-50 transition duration-150">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="6" width="20" height="12" rx="2"/>
                        <path d="M6 12h4"/>
                        <path d="M14 12h4"/>
                      </svg>
                      <span className="mt-2 text-sm font-medium text-gray-900">Videojuegos</span>
                    </button>
                    
                    <button className="bg-white border-2 border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center hover:bg-gray-50 transition duration-150">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"/>
                      </svg>
                      <span className="mt-2 text-sm font-medium text-gray-900">Salud y Bienestar</span>
                    </button>
                    
                    <button className="bg-white border-2 border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center hover:bg-gray-50 transition duration-150">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="8" x2="12" y2="16"/>
                        <line x1="8" y1="12" x2="16" y2="12"/>
                      </svg>
                      <span className="mt-2 text-sm font-medium text-gray-900">Más Categorías</span>
                    </button>
                  </div>
                  
                  {/* Additional Preferences */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <h3 className="font-medium text-gray-900 mb-2">Preferencias adicionales</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input 
                          id="price-range" 
                          type="range" 
                          min="1" 
                          max="5" 
                          defaultValue="3"
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" 
                        />
                        <span className="ml-2 text-sm text-gray-500">Rango de precio: Medio</span>
                      </div>
                      <div className="flex items-center">
                        <input 
                          id="trend-checkbox" 
                          type="checkbox" 
                          className="h-4 w-4 text-primary-500 focus:ring-primary-400 border-gray-300 rounded" 
                        />
                        <label htmlFor="trend-checkbox" className="ml-2 block text-sm text-gray-500">Solo productos en tendencia</label>
                      </div>
                      <div className="flex items-center">
                        <input 
                          id="shipping-checkbox" 
                          type="checkbox" 
                          defaultChecked 
                          className="h-4 w-4 text-primary-500 focus:ring-primary-400 border-gray-300 rounded" 
                        />
                        <label htmlFor="shipping-checkbox" className="ml-2 block text-sm text-gray-500">Envío rápido disponible</label>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex justify-between">
                    <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                      Cancelar
                    </button>
                    <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h1"/>
                        <path d="m12 19 4-4-4-4"/>
                        <path d="M16 15H9"/>
                        <path d="M15 3h1a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-1"/>
                      </svg>
                      Generar sugerencias
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
