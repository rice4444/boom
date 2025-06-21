import InvestmentCard from "@/components/investment-card";

const investmentPlans = [
  {
    id: "starter",
    name: "Starter Plan",
    range: "$100 - $999",
    returnRate: "5-8%",
    features: [
      "Basic Bitcoin portfolio",
      "Email support",
      "Monthly performance reports",
      "Mobile app access",
      "Basic market analysis"
    ]
  },
  {
    id: "silver",
    name: "Silver Plan",
    range: "$1,000 - $4,999",
    returnRate: "8-12%",
    features: [
      "Diversified crypto portfolio",
      "Priority support",
      "Weekly performance reports",
      "Advanced market analysis",
      "Risk management tools"
    ]
  },
  {
    id: "bonus",
    name: "Bonus Plan",
    range: "$5,000 - $19,999",
    returnRate: "12-18%",
    features: [
      "Premium portfolio management",
      "24/7 priority support",
      "Daily performance reports",
      "Personal account manager",
      "Advanced trading strategies"
    ],
    isPopular: true
  },
  {
    id: "flexible",
    name: "Flexible Plan",
    range: "$20,000+",
    returnRate: "18-25%",
    features: [
      "Custom portfolio strategy",
      "Dedicated investment manager",
      "Real-time performance updates",
      "Exclusive market insights",
      "VIP customer service"
    ]
  }
];

export default function InvestmentPlans() {
  return (
    <section className="py-20" style={{ backgroundColor: 'var(--slate-50)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Investment Plans
          </h1>
          <p className="text-xl text-slate-600">
            Choose the investment plan that aligns with your financial goals
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {investmentPlans.map((plan) => (
            <InvestmentCard key={plan.id} plan={plan} detailed />
          ))}
        </div>

        {/* Plan Comparison */}
        <div className="mt-16 bg-white rounded-xl shadow-lg overflow-hidden">
          <div 
            className="px-6 py-4 text-white"
            style={{ backgroundColor: 'var(--crypto-blue)' }}
          >
            <h3 className="text-xl font-semibold">Plan Comparison</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead style={{ backgroundColor: 'var(--slate-50)' }}>
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-slate-900">Feature</th>
                  <th className="px-6 py-3 text-center text-sm font-medium text-slate-900">Starter</th>
                  <th className="px-6 py-3 text-center text-sm font-medium text-slate-900">Silver</th>
                  <th className="px-6 py-3 text-center text-sm font-medium text-slate-900">Bonus</th>
                  <th className="px-6 py-3 text-center text-sm font-medium text-slate-900">Flexible</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="px-6 py-4 text-sm text-slate-900">Monthly Returns</td>
                  <td className="px-6 py-4 text-sm text-center">5-8%</td>
                  <td className="px-6 py-4 text-sm text-center">8-12%</td>
                  <td className="px-6 py-4 text-sm text-center">12-18%</td>
                  <td className="px-6 py-4 text-sm text-center">18-25%</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-slate-900">Customer Support</td>
                  <td className="px-6 py-4 text-sm text-center">Email</td>
                  <td className="px-6 py-4 text-sm text-center">Priority</td>
                  <td className="px-6 py-4 text-sm text-center">24/7</td>
                  <td className="px-6 py-4 text-sm text-center">VIP</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-slate-900">Reporting Frequency</td>
                  <td className="px-6 py-4 text-sm text-center">Monthly</td>
                  <td className="px-6 py-4 text-sm text-center">Weekly</td>
                  <td className="px-6 py-4 text-sm text-center">Daily</td>
                  <td className="px-6 py-4 text-sm text-center">Real-time</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
