import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Crown, Zap, AlertCircle } from "lucide-react";
import { useLocation } from "wouter";

interface UsageLimitsProps {
  type: 'product' | 'content';
  current: number;
  limit: number;
  onUpgrade?: () => void;
}

export function UsageLimits({ type, current, limit, onUpgrade }: UsageLimitsProps) {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  
  const percentage = (current / limit) * 100;
  const isNearLimit = percentage >= 80;
  const isAtLimit = current >= limit;
  
  const typeLabels = {
    product: 'productos',
    content: 'contenidos'
  };

  const handleUpgrade = () => {
    if (onUpgrade) {
      onUpgrade();
    } else {
      navigate('/pricing');
    }
  };

  if (user?.subscriptionPlan === 'enterprise') {
    return (
      <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-purple-700">
            <Crown className="h-5 w-5" />
            Plan Enterprise
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-purple-600">
            Generaciones ilimitadas de {typeLabels[type]} ∞
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`${isNearLimit ? 'border-orange-200 bg-orange-50' : 'border-gray-200'}`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm">
          {isNearLimit ? (
            <AlertCircle className="h-4 w-4 text-orange-500" />
          ) : (
            <Zap className="h-4 w-4 text-blue-500" />
          )}
          Uso mensual de {typeLabels[type]}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between text-sm">
          <span>{current} / {limit}</span>
          <span className={`font-medium ${isAtLimit ? 'text-red-600' : isNearLimit ? 'text-orange-600' : 'text-gray-600'}`}>
            {percentage.toFixed(0)}%
          </span>
        </div>
        
        <Progress 
          value={percentage} 
          className={`h-2 ${isAtLimit ? 'bg-red-100' : isNearLimit ? 'bg-orange-100' : 'bg-blue-100'}`}
        />
        
        {isAtLimit && (
          <div className="space-y-2">
            <p className="text-sm text-red-600 font-medium">
              ¡Límite alcanzado! Mejora tu plan para continuar.
            </p>
            <Button 
              onClick={handleUpgrade}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              size="sm"
            >
              <Crown className="h-4 w-4 mr-2" />
              Mejorar Plan
            </Button>
          </div>
        )}
        
        {isNearLimit && !isAtLimit && (
          <div className="space-y-2">
            <p className="text-sm text-orange-600">
              Te quedan {limit - current} generaciones este mes.
            </p>
            <Button 
              onClick={handleUpgrade}
              variant="outline"
              className="w-full border-orange-200 text-orange-600 hover:bg-orange-50"
              size="sm"
            >
              Ver Planes Premium
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}