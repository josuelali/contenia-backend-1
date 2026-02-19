export default function HowItWorks() {
  return (
    <div id="how-it-works" className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 font-heading">
            ¿Cómo funciona?
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Crea tu tienda online y genera contenido viral en tres sencillos pasos.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-12">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            {/* Step 1 */}
            <div className="mt-10 lg:mt-0 flex flex-col items-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 text-primary-500 text-2xl font-bold">
                1
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-lg font-medium text-gray-900 font-heading">Elige tu nicho</h3>
                <p className="mt-2 text-base text-gray-500">
                  Indica qué tipo de productos te interesa vender (ropa, hogar, mascotas, tecnología, etc.) y nuestra IA analizará el mercado.
                </p>
              </div>
              <div className="mt-6 w-full rounded-lg shadow-lg overflow-hidden">
                <img 
                  className="w-full h-56 object-cover" 
                  src="https://images.unsplash.com/photo-1603899122634-f086ca5f5ddd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=350" 
                  alt="Persona seleccionando productos en una tableta" 
                />
              </div>
            </div>

            {/* Step 2 */}
            <div className="mt-10 lg:mt-0 flex flex-col items-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-secondary-100 text-secondary-500 text-2xl font-bold">
                2
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-lg font-medium text-gray-900 font-heading">Revisa las sugerencias</h3>
                <p className="mt-2 text-base text-gray-500">
                  Nuestra IA te presentará 5 productos virales con imágenes y textos de venta optimizados para maximizar tus conversiones.
                </p>
              </div>
              <div className="mt-6 w-full rounded-lg shadow-lg overflow-hidden">
                <img 
                  className="w-full h-56 object-cover" 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=350" 
                  alt="Persona analizando productos y métricas en una pantalla" 
                />
              </div>
            </div>

            {/* Step 3 */}
            <div className="mt-10 lg:mt-0 flex flex-col items-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-accent-100 text-accent-500 text-2xl font-bold">
                3
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-lg font-medium text-gray-900 font-heading">Publica y vende</h3>
                <p className="mt-2 text-base text-gray-500">
                  Genera videos promocionales, personaliza tus portadas y publica directamente en Shopify o en tus redes sociales favoritas.
                </p>
              </div>
              <div className="mt-6 w-full rounded-lg shadow-lg overflow-hidden">
                <img 
                  className="w-full h-56 object-cover" 
                  src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=350" 
                  alt="Persona publicando contenido en redes sociales desde un teléfono" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
