import { Check, X } from "lucide-react";

const plans = [
  {
    name: "Gratis",
    description: "Ideal para comenzar y probar la plataforma.",
    price: "€0",
    popular: false,
    features: [
      { name: "Hasta 2 productos con videos al mes", available: true },
      { name: "5 sugerencias de productos", available: true },
      { name: "Generador básico de textos", available: true },
      { name: "Plantillas estándar", available: true },
      { name: "Sin conexión a Shopify", available: false }
    ],
    cta: "Comenzar gratis",
    ctaStyle: "white"
  },
  {
    name: "Premium",
    description: "Todo lo que necesitas para escalar tu negocio.",
    price: "€7",
    popular: true,
    features: [
      { name: "Productos ilimitados con videos", available: true, highlight: true },
      { name: "20 sugerencias de productos", available: true, highlight: true },
      { name: "Generador avanzado de textos y reels", available: true },
      { name: "Plantillas exclusivas para destacar", available: true, highlight: true },
      { name: "Conexión con Shopify e Instagram", available: true, highlight: true }
    ],
    cta: "Comenzar Premium",
    ctaStyle: "primary"
  },
  {
    name: "Empresa",
    description: "Para equipos y negocios establecidos.",
    price: "€19",
    popular: false,
    features: [
      { name: "Todo lo del plan Premium", available: true, highlight: true },
      { name: "Acceso para 5 usuarios del equipo", available: true, highlight: true },
      { name: "API para integraciones personalizadas", available: true, highlight: true },
      { name: "Análisis avanzados de rendimiento", available: true },
      { name: "Soporte prioritario 24/7", available: true, highlight: true }
    ],
    cta: "Contactar ventas",
    ctaStyle: "white"
  }
];

export default function Pricing() {
  return (
    <div id="pricing" className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-primary-500 tracking-wide uppercase font-heading">Precios</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl font-heading">
            Planes diseñados para tu crecimiento
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Elige el plan que mejor se adapte a tus necesidades. Comienza gratis y escala a medida que creces.
          </p>
        </div>

        <div className="mt-12 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
          {plans.map((plan) => (
            <div 
              key={plan.name}
              className={`bg-white ${plan.popular ? 'border-2 border-primary-500 shadow-lg scale-105 hover:shadow-xl' : 'border border-gray-200 shadow-sm hover:shadow-md'} rounded-lg transition duration-300 overflow-hidden flex flex-col relative`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
                  <span className="inline-flex items-center px-4 py-1 rounded-full text-xs font-medium bg-secondary-500 text-white">
                    Popular
                  </span>
                </div>
              )}
              <div className="px-6 py-8">
                <h3 className="text-2xl font-medium text-gray-900 font-heading">{plan.name}</h3>
                <p className="mt-4 text-sm text-gray-500">{plan.description}</p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                  <span className="text-base font-medium text-gray-500">/mes</span>
                </p>
                <a 
                  href="#" 
                  className={`mt-8 block w-full ${
                    plan.ctaStyle === 'primary' 
                      ? 'bg-primary-500 border border-transparent text-white hover:bg-primary-600' 
                      : 'bg-gray-100 border border-gray-200 text-gray-700 hover:bg-gray-200'
                  } rounded-md py-2 text-sm font-semibold text-center`}
                >
                  {plan.cta}
                </a>
              </div>
              <div className="flex-1 bg-gray-50 px-6 pt-6 pb-8">
                <h4 className="text-sm font-medium text-gray-900 tracking-wide uppercase">
                  Incluye:
                </h4>
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature.name} className="flex items-start">
                      <div className="flex-shrink-0">
                        {feature.available ? (
                          <Check className="h-5 w-5 text-green-500" />
                        ) : (
                          <X className="h-5 w-5 text-red-500" />
                        )}
                      </div>
                      <p className="ml-3 text-sm text-gray-700">
                        {feature.highlight ? (
                          <span className="font-bold">{feature.name}</span>
                        ) : (
                          feature.name
                        )}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
