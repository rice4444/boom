import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { authManager } from "@/lib/auth";

export default function Navigation() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isAuthenticated = authManager.isAuthenticated();
  const isAdmin = authManager.isAdmin();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/investment", label: "Investment Plans" },
    { path: "/contact", label: "Contact" },
  ];

  const handleLogout = () => {
    authManager.logout();
    window.location.href = "/";
  };

  return (
    <nav className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <i className="fab fa-bitcoin text-2xl mr-2" style={{ color: 'var(--bitcoin-gold)' }}></i>
            <span className="text-xl font-bold" style={{ color: 'var(--crypto-blue)' }}>CryptoInvest Pro</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    location === item.path
                      ? "border-b-2 border-blue-600"
                      : "text-slate-600 hover:text-blue-600"
                  }`}
                  style={{
                    color: location === item.path ? 'var(--crypto-blue)' : 'var(--slate-600)',
                    borderColor: location === item.path ? 'var(--crypto-blue)' : 'transparent'
                  }}
                >
                  {item.label}
                </Link>
              ))}
              
              {isAuthenticated ? (
                <div className="flex items-center space-x-2">
                  <Link
                    href={isAdmin ? "/admin" : "/dashboard"}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                    style={{ backgroundColor: 'var(--crypto-blue)' }}
                  >
                    {isAdmin ? "Admin Panel" : "Dashboard"}
                  </Link>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    size="sm"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link href="/signup">
                    <Button size="sm" style={{ backgroundColor: 'var(--crypto-blue)' }}>
                      Sign Up
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button variant="outline" size="sm">
                      Login
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <i className="fas fa-bars text-xl"></i>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-slate-200">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="block w-full text-left px-3 py-2 text-slate-600 hover:text-blue-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {isAuthenticated ? (
              <>
                <Link
                  href={isAdmin ? "/admin" : "/dashboard"}
                  className="block w-full text-left px-3 py-2 font-medium"
                  style={{ color: 'var(--crypto-blue)' }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {isAdmin ? "Admin Panel" : "Dashboard"}
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-slate-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/signup"
                  className="block w-full text-left px-3 py-2 font-medium"
                  style={{ color: 'var(--crypto-blue)' }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
                <Link
                  href="/login"
                  className="block w-full text-left px-3 py-2 text-slate-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
