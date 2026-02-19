import { Link } from "wouter";

export default function CTA() {
  return (
    <div className="bg-primary-600">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl font-heading">
          <span className="block">¿Listo para empezar a vender?</span>
          <span className="block text-primary-200">Primeros 100 usuarios reciben 1 mes de Premium gratis.</span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow">
            <Link href="/product-generator">
              <a className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50">
                Registrarse ahora
              </a>
            </Link>
          </div>
          <div className="ml-3 inline-flex rounded-md shadow">
            <a href="#how-it-works" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-500 hover:bg-primary-700">
              Ver demostración
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
