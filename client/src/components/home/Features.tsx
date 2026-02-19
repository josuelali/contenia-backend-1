import { 
  Lightbulb, 
  Search, 
  Film, 
  ImagePlus, 
  ShoppingBag, 
  Instagram 
} from "lucide-react";

const features = [
  {
    name: "Generador de ideas de nicho",
    description: "Nuestra IA analiza tendencias del mercado y te sugiere nichos rentables basados en tus intereses y experiencia.",
    icon: Lightbulb,
    color: "primary"
  },
  {
    name: "Buscador de productos virales",
    description: "Encuentra productos con alto potencial de venta a través de nuestras integraciones con CJdropshipping y Amazon.",
    icon: Search,
    color: "secondary"
  },
  {
    name: "Creador de reels y textos",
    description: "Genera videos promocionales tipo reel con títulos animados y textos persuasivos para aumentar tus conversiones.",
    icon: Film,
    color: "accent"
  },
  {
    name: "Editor de mockups y portadas",
    description: "Crea imágenes profesionales para tus productos y portadas atractivas para tus redes sociales en segundos.",
    icon: ImagePlus,
    color: "primary"
  },
  {
    name: "Integración con Shopify",
    description: "Sube tus productos directamente a Shopify con un solo clic, ahorrando horas de trabajo manual.",
    icon: ShoppingBag,
    color: "secondary"
  },
  {
    name: "Publicación en redes sociales",
    description: "Programa y publica tu contenido directamente en Instagram, TikTok y otras plataformas populares.",
    icon: Instagram,
    color: "accent"
  }
];

export default function Features() {
  return (
    <div id="features" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-lg text-primary-500 font-semibold font-heading">Características</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl font-heading">
            Todo lo que necesitas para vender online
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            VendeConIA te ayuda a crear una tienda online exitosa utilizando el poder de la inteligencia artificial.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div 
                key={feature.name} 
                className="relative bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition duration-300 transform hover:scale-[1.03]"
              >
                <dt>
                  <div className={`absolute flex items-center justify-center h-12 w-12 rounded-md text-white bg-${feature.color}-500`}>
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
