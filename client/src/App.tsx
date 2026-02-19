import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Import all pages
import Home from "@/pages/home";
import ProductGenerator from "@/pages/product-generator";
import ContentGenerator from "@/pages/content-generator";
import Pricing from "@/pages/pricing";
import Templates from "@/pages/templates";
import Dashboard from "@/pages/dashboard";
import Subscribe from "@/pages/subscribe";

function NotFound() {
  return (
    <div style={{ padding: 24, textAlign: "center" }}>
      <h2 style={{ marginBottom: 8 }}>Página no encontrada</h2>
      <p style={{ marginBottom: 12 }}>Vuelve al inicio y sigue creando.</p>
      <a href="/" style={{ textDecoration: "underline" }}>
        Ir al inicio
      </a>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      {/* Show homepage by default */}
      <Route path="/" component={Home} />
      <Route path="/product-generator" component={ProductGenerator} />
      <Route path="/content-generator" component={ContentGenerator} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/templates" component={Templates} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/subscribe" component={Subscribe} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />

        {/* Botón Amazon (visible en TODAS las páginas) */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "12px 12px",
          }}
        >
          <a
            href="https://amzn.to/4qO3lma"
            target="_blank"
            rel="nofollow sponsored"
            style={{
              padding: "12px 20px",
              backgroundColor: "#FF9900",
              color: "#000",
              fontWeight: "bold",
              borderRadius: "10px",
              textDecoration: "none",
              boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
              maxWidth: 360,
              width: "100%",
              textAlign: "center",
            }}
          >
            Ver producto recomendado en Amazon
          </a>
        </div>

        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
