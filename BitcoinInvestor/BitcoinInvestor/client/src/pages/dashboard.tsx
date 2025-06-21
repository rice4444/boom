import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { authManager } from "@/lib/auth";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const user = authManager.getUser();

  useEffect(() => {
    if (!user || user.isAdmin) {
      setLocation("/login");
    }
  }, [user, setLocation]);

  const { data: userData, isLoading } = useQuery({
    queryKey: [`/api/user/${user?.id}`],
    enabled: !!user && !user.isAdmin,
  });

  const handleLogout = () => {
    authManager.logout();
    setLocation("/");
  };

  if (!user || user.isAdmin) {
    return null;
  }

  const getPlanName = (planCode: string) => {
    const plans: Record<string, string> = {
      'starter': 'Starter Plan',
      'silver': 'Silver Plan',
      'bonus': 'Bonus Plan',
      'flexible': 'Flexible Plan'
    };
    return plans[planCode] || planCode;
  };

  const getReturnRate = (planCode: string) => {
    const rates: Record<string, number> = {
      'starter': 6.5,
      'silver': 10,
      'bonus': 15,
      'flexible': 21.5
    };
    return rates[planCode] || 5;
  };

  const currentData = userData || user;
  const returnRate = getReturnRate(currentData.plan);
  const monthlyReturn = currentData.amount * (returnRate / 100);

  if (isLoading) {
    return (
      <section className="py-8 min-h-screen" style={{ backgroundColor: 'var(--slate-50)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <Skeleton className="h-32 w-full" />
            <div className="grid md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-32" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 min-h-screen" style={{ backgroundColor: 'var(--slate-50)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Dashboard Header */}
        <Card className="shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Investment Dashboard</h1>
              <p className="text-slate-600">Welcome back, {currentData.name}</p>
            </div>
            <Button onClick={handleLogout} variant="outline">
              Logout
            </Button>
          </div>
        </Card>

        {/* Investment Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Total Investment</p>
                <p className="text-2xl font-bold text-slate-900">
                  ${currentData.amount.toLocaleString()}
                </p>
              </div>
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center text-white"
                style={{ backgroundColor: 'var(--crypto-blue)' }}
              >
                <i className="fas fa-wallet"></i>
              </div>
            </div>
          </Card>

          <Card className="shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Current Return</p>
                <p 
                  className="text-2xl font-bold"
                  style={{ color: 'var(--success-green)' }}
                >
                  ${monthlyReturn.toFixed(0)}
                </p>
              </div>
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center text-white"
                style={{ backgroundColor: 'var(--success-green)' }}
              >
                <i className="fas fa-chart-line"></i>
              </div>
            </div>
          </Card>

          <Card className="shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Active Plan</p>
                <p className="text-2xl font-bold text-slate-900">
                  {getPlanName(currentData.plan)}
                </p>
              </div>
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center text-white"
                style={{ backgroundColor: 'var(--bitcoin-gold)' }}
              >
                <i className="fas fa-star"></i>
              </div>
            </div>
          </Card>

          <Card className="shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Monthly Profit</p>
                <p 
                  className="text-2xl font-bold"
                  style={{ color: 'var(--success-green)' }}
                >
                  {returnRate.toFixed(1)}%
                </p>
              </div>
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center text-white"
                style={{ backgroundColor: 'var(--success-green)' }}
              >
                <i className="fas fa-percentage"></i>
              </div>
            </div>
          </Card>
        </div>

        {/* Investment Details */}
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="shadow-lg p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Investment History</h2>
            <div className="space-y-4">
              <div 
                className="flex justify-between items-center p-4 rounded-lg"
                style={{ backgroundColor: 'var(--slate-50)' }}
              >
                <div>
                  <p className="font-semibold">Initial Investment</p>
                  <p className="text-sm text-slate-600">
                    {new Date(currentData.joinDate).toLocaleDateString()}
                  </p>
                </div>
                <span 
                  className="font-semibold"
                  style={{ color: 'var(--success-green)' }}
                >
                  +${currentData.amount.toLocaleString()}
                </span>
              </div>
              <div 
                className="flex justify-between items-center p-4 rounded-lg"
                style={{ backgroundColor: 'var(--slate-50)' }}
              >
                <div>
                  <p className="font-semibold">Monthly Return</p>
                  <p className="text-sm text-slate-600">Estimated</p>
                </div>
                <span 
                  className="font-semibold"
                  style={{ color: 'var(--success-green)' }}
                >
                  +${monthlyReturn.toFixed(0)}
                </span>
              </div>
            </div>
          </Card>

          <Card className="shadow-lg p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Account Information</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-slate-600">Email:</span>
                <span className="font-semibold">{currentData.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Plan:</span>
                <span className="font-semibold">{getPlanName(currentData.plan)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Investment Amount:</span>
                <span className="font-semibold">${currentData.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Join Date:</span>
                <span className="font-semibold">
                  {new Date(currentData.joinDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
