import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import InvestmentCard from "@/components/investment-card";

const investmentPlans = [
  {
    id: "starter",
    name: "Starter Plan",
    range: "$100 - $999",
    returnRate: "5-8%",
    features: ["Basic portfolio", "Email support", "Monthly reports"]
  },
  {
    id: "silver",
    name: "Silver Plan",
    range: "$1,000 - $4,999",
    returnRate: "8-12%",
    features: ["Diversified portfolio", "Priority support", "Weekly reports"]
  },
  {
    id: "bonus",
    name: "Bonus Plan",
    range: "$5,000 - $19,999",
    returnRate: "12-18%",
    features: ["Premium portfolio", "24/7 support", "Daily reports"],
    isPopular: true
  },
  {
    id: "flexible",
    name: "Flexible Plan",
    range: "$20,000+",
    returnRate: "18-25%",
    features: ["Custom portfolio", "Dedicated manager", "Real-time updates"]
  }
];

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="gradient-crypto text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Invest in Bitcoin with Confidence
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Professional investment platform with proven strategies and secure transactions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button 
                  size="lg" 
                  className="text-slate-900 font-semibold"
                  style={{ backgroundColor: 'var(--bitcoin-gold)' }}
                >
                  Start Investing
                </Button>
              </Link>
              <Link href="/investment">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-600"
                >
                  View Plans
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Choose CryptoInvest Pro?
            </h2>
            <p className="text-xl text-slate-600">
              Professional-grade investment platform with industry-leading security
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white"
                style={{ backgroundColor: 'var(--crypto-blue)' }}
              >
                <i className="fas fa-shield-alt text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Bank-Level Security</h3>
              <p className="text-slate-600">
                Your investments are protected with military-grade encryption and multi-factor authentication.
              </p>
            </div>
            <div className="text-center p-6">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white"
                style={{ backgroundColor: 'var(--success-green)' }}
              >
                <i className="fas fa-chart-line text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Proven Returns</h3>
              <p className="text-slate-600">
                Track record of consistent returns with transparent performance reporting.
              </p>
            </div>
            <div className="text-center p-6">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white"
                style={{ backgroundColor: 'var(--bitcoin-gold)' }}
              >
                <i className="fas fa-clock text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">24/7 Support</h3>
              <p className="text-slate-600">
                Round-the-clock customer support and real-time investment monitoring.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Plans Preview */}
      <section className="py-20" style={{ backgroundColor: 'var(--slate-50)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Investment Plans
            </h2>
            <p className="text-xl text-slate-600">
              Choose the plan that fits your investment goals
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {investmentPlans.map((plan) => (
              <InvestmentCard key={plan.id} plan={plan} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/investment">
              <Button 
                size="lg"
                style={{ backgroundColor: 'var(--crypto-blue)' }}
              >
                View All Plans
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
