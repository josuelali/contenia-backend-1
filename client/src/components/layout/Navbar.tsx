import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, User, LogOut, Settings, Crown } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type AuthUser = {
  firstName?: string;
  lastName?: string;
  email?: string;
  profileImageUrl?: string;
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  // 👇 Forzamos tipado para evitar los errores TS de user: {}
  const auth = useAuth() as unknown as {
    user?: AuthUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
  };

  const user = auth.user ?? null;
  const isAuthenticated = auth.isAuthenticated;
  const isLoading = auth.isLoading;

  const showAuthUI = !isLoading && isAuthenticated;

  const isActive = (path: string) => location === path;

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  const desktopLinkClass = (path: string) =>
    `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
      isActive(path)
        ? "border-blue-500 text-gray-900"
        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
    }`;

  const mobileLinkClass = (path: string) =>
    `block px-3 py-2 rounded-md text-base font-medium ${
      isActive(path)
        ? "bg-blue-50 text-blue-600"
        : "text-gray-700 hover:bg-gray-50"
    }`;

  const closeMobileMenu = () => setIsMenuOpen(false);

  const initials = (user?.firstName?.trim()?.[0] || "U").toUpperCase();

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center">
                <span className="text-blue-600 text-2xl font-bold">
                  Vende<span className="text-purple-600">Con</span>
                  <span className="text-green-600">IA</span>
                </span>
              </Link>
            </div>

            {/* Desktop menu */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/" className={desktopLinkClass("/")}>
                Inicio
              </Link>
              <Link
                href="/product-generator"
                className={desktopLinkClass("/product-generator")}
              >
                Productos
              </Link>
              <Link
                href="/content-generator"
                className={desktopLinkClass("/content-generator")}
              >
                Contenido
              </Link>
              <Link
                href="/templates"
                className={desktopLinkClass("/templates")}
              >
                Plantillas
              </Link>
              <Link href="/pricing" className={desktopLinkClass("/pricing")}>
                Precios
              </Link>
            </div>
          </div>

          {/* Right */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {showAuthUI ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={user?.profileImageUrl || ""}
                        alt={user?.firstName || ""}
                      />
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {(user?.firstName || "").trim()}{" "}
                        {(user?.lastName || "").trim()}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email || ""}
                      </p>
                    </div>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem onSelect={() => {}}>
                    <Link
                      href="/dashboard"
                      className="flex items-center w-full"
                    >
                      <User className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem onSelect={() => {}}>
                    <Link href="/pricing" className="flex items-center w-full">
                      <Crown className="mr-2 h-4 w-4" />
                      Suscripción
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem disabled>
                    <Settings className="mr-2 h-4 w-4" />
                    Configuración
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Cerrar sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={handleLogin}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Iniciar sesión
              </Button>
            )}
          </div>

          {/* Mobile button */}
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Abrir menú principal</span>
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className={mobileLinkClass("/")}
              onClick={closeMobileMenu}
            >
              Inicio
            </Link>

            <Link
              href="/product-generator"
              className={mobileLinkClass("/product-generator")}
              onClick={closeMobileMenu}
            >
              Productos
            </Link>

            <Link
              href="/content-generator"
              className={mobileLinkClass("/content-generator")}
              onClick={closeMobileMenu}
            >
              Contenido
            </Link>

            <Link
              href="/templates"
              className={mobileLinkClass("/templates")}
              onClick={closeMobileMenu}
            >
              Plantillas
            </Link>

            <Link
              href="/pricing"
              className={mobileLinkClass("/pricing")}
              onClick={closeMobileMenu}
            >
              Precios
            </Link>
          </div>

          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4 space-x-3">
              {showAuthUI ? (
                <div className="flex items-center space-x-3 w-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={user?.profileImageUrl || ""}
                      alt={user?.firstName || ""}
                    />
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">
                      {(user?.firstName || "").trim()}{" "}
                      {(user?.lastName || "").trim()}
                    </div>
                    <div className="text-xs text-gray-500">
                      {user?.email || ""}
                    </div>
                  </div>

                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={handleLogin}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Iniciar sesión
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
