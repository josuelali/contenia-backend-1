import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, Crown, Building } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Pricing() {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();

  const { data: plans, isLoading } = useQuery({
    queryKey: ['/api/subscription-plans'],
    enabled: true,
  });

  const handleSubscribe = async (planId: string, stripeId: string) => {
    if (!isAuthenticated) {
      window.location.href = '/api/login';
      return;
    }

    try {
      const response = await apiRequest("POST", "/api/create-subscription", { planId: stripeId });
      const { clientSecret } = response;
      
      if (clientSecret) {
        // Redirect to Stripe checkout
        window.location.href = `/subscribe?client_secret=${clientSecret}`;
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo crear la suscripción. Inténtalo de nuevo.",
        variant: "destructive",
      });
    }
  };

  const defaultPlans = [
    {
      id: "free",
      name: "Gratuito",
      price: 0,
      currency: "EUR",
      interval: "mes",
      features: [
        "10 productos generados por mes",
        "5 contenidos generados por mes",
        "Acceso a plantillas básicas",
        "Soporte por email",
        "Comisiones de afiliado estándar"
      ],
      icon: <Zap className="h-6 w-6" />,
      popular: false,
    },
    {
      id: "premium",
      name: "Premium",
      price: 7,
      currency: "EUR",
      interval: "mes",
      features: [
        "100 productos generados por mes",
        "50 contenidos generados por mes",
        "Acceso a todas las plantillas",
        "Análisis de tendencias avanzado",
        "Integración con Shopify",
        "Soporte prioritario",
        "Comisiones de afiliado premium"
      ],
      icon: <Crown className="h-6 w-6" />,
      popular: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: 19,
      currency: "EUR",
      interval: "mes",
      features: [
        "Productos ilimitados",
        "Contenidos ilimitados",
        "Plantillas exclusivas",
        "API personalizada",
        "Integración con Instagram",
        "Consultoría personalizada",
        "Soporte dedicado 24/7",
        "Comisiones de afiliado máximas"
      ],
      icon: <Building className="h-6 w-6" />,
      popular: false,
    },
  ];

  const plansToDisplay = plans?.length > 0 ? plans : defaultPlans;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Planes de Suscripción
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Elige el plan perfecto para hacer crecer tu negocio con VendeConIA
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plansToDisplay.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative transition-all duration-300 hover:shadow-xl ${
                plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500">
                  Más Popular
                </Badge>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className={`p-3 rounded-full ${
                    plan.popular ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {plan.icon}
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="text-lg">
                  <span className="text-4xl font-bold text-gray-900">
                    €{plan.price}
                  </span>
                  <span className="text-gray-500">/{plan.interval}</span>
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : 'bg-gray-600 hover:bg-gray-700'
                  }`}
                  onClick={() => handleSubscribe(plan.id, plan.stripe_price_id || plan.id)}
                  disabled={user?.subscriptionPlan === plan.id}
                >
                  {user?.subscriptionPlan === plan.id ? 'Plan Actual' : 'Elegir Plan'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            ¿Preguntas sobre los planes?
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">
                ¿Puedo cambiar de plan en cualquier momento?
              </h3>
              <p className="text-gray-600">
                Sí, puedes actualizar o degradar tu plan en cualquier momento desde tu dashboard.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">
                ¿Hay garantía de devolución?
              </h3>
              <p className="text-gray-600">
                Ofrecemos una garantía de 30 días. Si no estás satisfecho, te devolvemos el dinero.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">
                ¿Qué incluye el soporte?
              </h3>
              <p className="text-gray-600">
                Soporte por email para todos los planes, y soporte prioritario 24/7 para Enterprise.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}