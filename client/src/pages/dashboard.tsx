import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UsageLimits } from "@/components/ui/usage-limits";
import { 
  TrendingUp, 
  Package, 
  FileText, 
  DollarSign, 
  Users, 
  Star, 
  Crown,
  BarChart3,
  Calendar,
  Settings,
  Zap,
  AlertCircle
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "wouter";

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();

  const { data: userProducts } = useQuery({
    queryKey: ['/api/products/user'],
    enabled: isAuthenticated,
  });

  const { data: userContents } = useQuery({
    queryKey: ['/api/contents/user'],
    enabled: isAuthenticated,
  });

  const { data: userTemplates } = useQuery({
    queryKey: ['/api/templates/user'],
    enabled: isAuthenticated,
  });

  const { data: affiliateEarnings } = useQuery({
    queryKey: ['/api/affiliate/earnings'],
    enabled: isAuthenticated,
  });

  const { data: consultingServices } = useQuery({
    queryKey: ['/api/consulting/user'],
    enabled: isAuthenticated,
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Acceso requerido</h1>
          <p className="text-gray-600 mb-6">Inicia sesión para acceder a tu dashboard</p>
          <Button onClick={() => window.location.href = '/api/login'}>
            Iniciar Sesión
          </Button>
        </div>
      </div>
    );
  }

  const getUsagePercentage = (used: number, limit: number) => {
    return Math.min((used / limit) * 100, 100);
  };

  const getUsageLimits = () => {
    switch (user?.subscriptionPlan) {
      case 'premium':
        return { products: 100, contents: 50 };
      case 'enterprise':
        return { products: 999, contents: 999 };
      default:
        return { products: 10, contents: 5 };
    }
  };

  const limits = getUsageLimits();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                ¡Hola, {user?.firstName || 'Usuario'}!
              </h1>
              <p className="text-gray-600 mt-1">
                Aquí está el resumen de tu negocio
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge 
                variant={user?.subscriptionPlan === 'free' ? 'secondary' : 'default'}
                className={user?.subscriptionPlan === 'enterprise' ? 'bg-purple-600' : ''}
              >
                {user?.subscriptionPlan === 'free' && 'Plan Gratuito'}
                {user?.subscriptionPlan === 'premium' && (
                  <>
                    <Crown className="h-3 w-3 mr-1" />
                    Premium
                  </>
                )}
                {user?.subscriptionPlan === 'enterprise' && (
                  <>
                    <Crown className="h-3 w-3 mr-1" />
                    Enterprise
                  </>
                )}
              </Badge>
              <Link href="/pricing">
                <Button variant="outline" size="sm">
                  {user?.subscriptionPlan === 'free' ? 'Mejorar Plan' : 'Cambiar Plan'}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Usage Limits Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <UsageLimits
            type="product"
            current={user?.monthlyProductGenerations || 0}
            limit={limits.products}
          />
          <UsageLimits
            type="content"
            current={user?.monthlyContentGenerations || 0}
            limit={limits.contents}
          />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Productos Generados</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userProducts?.length || 0}</div>
              <p className="text-xs text-muted-foreground">
                {user?.monthlyProductGenerations || 0} este mes
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Contenidos Creados</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userContents?.length || 0}</div>
              <p className="text-xs text-muted-foreground">
                {user?.monthlyContentGenerations || 0} este mes
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ganancias Afiliado</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€{affiliateEarnings?.earnings || 0}</div>
              <p className="text-xs text-muted-foreground">
                +12% vs mes pasado
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Plantillas Vendidas</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userTemplates?.length || 0}</div>
              <p className="text-xs text-muted-foreground">
                Total activas
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Usage Progress */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Uso Mensual - Productos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Productos generados</span>
                  <span>{user?.monthlyProductGenerations || 0} / {limits.products}</span>
                </div>
                <Progress 
                  value={getUsagePercentage(user?.monthlyProductGenerations || 0, limits.products)} 
                  className="h-2"
                />
                {user?.subscriptionPlan === 'free' && (
                  <p className="text-xs text-gray-500">
                    Mejora tu plan para generar más productos
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Uso Mensual - Contenidos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Contenidos generados</span>
                  <span>{user?.monthlyContentGenerations || 0} / {limits.contents}</span>
                </div>
                <Progress 
                  value={getUsagePercentage(user?.monthlyContentGenerations || 0, limits.contents)} 
                  className="h-2"
                />
                {user?.subscriptionPlan === 'free' && (
                  <p className="text-xs text-gray-500">
                    Mejora tu plan para generar más contenidos
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Content */}
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="products">Productos</TabsTrigger>
            <TabsTrigger value="contents">Contenidos</TabsTrigger>
            <TabsTrigger value="templates">Plantillas</TabsTrigger>
            <TabsTrigger value="consulting">Consultoría</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Productos Recientes</CardTitle>
                  <Link href="/product-generator">
                    <Button>Generar Producto</Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                {userProducts?.length ? (
                  <div className="space-y-4">
                    {userProducts.slice(0, 5).map((product: any) => (
                      <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <img 
                            src={product.imageUrl} 
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div>
                            <h3 className="font-medium">{product.name}</h3>
                            <p className="text-sm text-gray-500">{product.price}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{product.tags?.[0]}</Badge>
                          <Button variant="outline" size="sm">
                            Ver Detalles
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No has generado productos aún</p>
                    <Link href="/product-generator">
                      <Button className="mt-4">Generar tu primer producto</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contents" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Contenidos Recientes</CardTitle>
                  <Link href="/content-generator">
                    <Button>Crear Contenido</Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                {userContents?.length ? (
                  <div className="space-y-4">
                    {userContents.slice(0, 5).map((content: any) => (
                      <div key={content.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h3 className="font-medium">{content.title}</h3>
                          <p className="text-sm text-gray-500">{content.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{content.animation}</Badge>
                          <Button variant="outline" size="sm">
                            Ver Contenido
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No has creado contenidos aún</p>
                    <Link href="/content-generator">
                      <Button className="mt-4">Crear tu primer contenido</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Mis Plantillas</CardTitle>
                  <Link href="/templates">
                    <Button>Ver Marketplace</Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Funcionalidad próximamente</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Pronto podrás crear y vender tus propias plantillas
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="consulting" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Servicios de Consultoría</CardTitle>
                  <Button disabled>Próximamente</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Servicios de consultoría próximamente</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Ofrece servicios de consultoría personalizada a otros emprendedores
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}