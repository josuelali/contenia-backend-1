import { Star, StarHalf } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Organizador Multifuncional para Gadgets",
    description: "Mantén todos tus cables, cargadores y accesorios electrónicos organizados con este elegante estuche resistente al agua.",
    price: "€19.99",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=350",
    rating: 4.5,
    reviews: 342,
    trending: true,
    views: "15k+",
    tags: ["Tecnología", "Organización", "Unisex"]
  },
  {
    id: 2,
    name: "Botella Motivacional con Indicador de Tiempo",
    description: "Mantente hidratado a lo largo del día con esta botella que te recuerda cuándo debes beber agua. Libre de BPA.",
    price: "€24.99",
    image: "https://pixabay.com/get/ge1501c97962eed23b0a39fe285bfc80f0d7ba3579b28c1a262637be0782034bd7f30aa43ffa072d1cbad2bf58c3fa3d241b6549bd0211da2fb8bcd52f33725e2_1280.jpg",
    rating: 5,
    reviews: 687,
    trending: true,
    viral: true,
    views: "32k+",
    tags: ["Fitness", "Ecológico", "Bestseller"]
  },
  {
    id: 3,
    name: "Luz LED Inteligente Multicolor",
    description: "Transforma el ambiente de tu hogar con esta luz LED que ofrece 16 millones de colores y control por voz y app.",
    price: "€29.99",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=350",
    rating: 4,
    reviews: 429,
    popular: true,
    views: "24k+",
    tags: ["Smart Home", "Decoración", "WiFi"]
  }
];

export default function ProductDemo() {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="h-5 w-5 text-yellow-400 fill-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="h-5 w-5 text-yellow-400 fill-yellow-400" />);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-star-${i}`} className="h-5 w-5 text-yellow-400" />);
    }
    
    return stars;
  };

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-primary-500 tracking-wide uppercase font-heading">Demostración</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl font-heading">
            Así se ven las sugerencias de productos
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Aquí tienes un ejemplo de lo que nuestra IA puede generar para ti en cuestión de segundos.
          </p>
        </div>

        {/* Product Suggestion Cards */}
        <div className="mt-12 grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div key={product.id} className="bg-white overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition duration-300 transform hover:scale-[1.03]">
              <img 
                className="h-60 w-full object-cover" 
                src={product.image} 
                alt={product.name} 
              />
              <div className="p-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-accent-500 bg-accent-50 py-1 px-2 rounded-full">
                    {product.trending ? "Tendencia" : product.viral ? "Viral" : "Popular"}
                  </span>
                  <span className="text-sm font-medium text-gray-500">Vistas: {product.views}</span>
                </div>
                <h3 className="mt-3 text-lg font-bold text-gray-900">{product.name}</h3>
                <p className="mt-2 text-gray-600 text-sm">
                  {product.description}
                </p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-xl font-bold text-secondary-500">{product.price}</span>
                  <div className="flex items-center">
                    {renderStars(product.rating)}
                    <span className="ml-1 text-sm text-gray-500">({product.reviews})</span>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span 
                      key={`${product.id}-${tag}`} 
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a 
            href="/product-generator" 
            className="px-6 py-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 inline-flex items-center"
          >
            Ver más productos 
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
