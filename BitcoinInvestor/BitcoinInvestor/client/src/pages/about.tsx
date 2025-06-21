export default function About() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            About CryptoInvest Pro
          </h1>
          <p className="text-xl text-slate-600">
            Leading the future of cryptocurrency investment with innovation and trust
          </p>
        </div>

        {/* Company Image */}
        <div className="mb-12">
          <img 
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=600" 
            alt="Modern cryptocurrency trading office" 
            className="rounded-xl shadow-lg w-full h-auto" 
          />
        </div>

        <div className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Mission</h2>
          <p className="text-slate-600 mb-6">
            At CryptoInvest Pro, we believe that everyone deserves access to professional-grade cryptocurrency investment opportunities. Founded in 2019, we have built a reputation as one of the most trusted and reliable Bitcoin investment platforms in the industry.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mb-6">Why We're Different</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">Experienced Team</h3>
              <p className="text-slate-600">
                Our team consists of financial experts, blockchain specialists, and security professionals with over 50 years of combined experience in traditional and digital asset management.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Proven Track Record</h3>
              <p className="text-slate-600">
                We have successfully managed over $500 million in Bitcoin investments, delivering consistent returns to our clients across all market conditions.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Regulatory Compliance</h3>
              <p className="text-slate-600">
                We operate under strict regulatory guidelines and maintain full compliance with all applicable financial regulations and cryptocurrency laws.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Transparent Operations</h3>
              <p className="text-slate-600">
                All our investment strategies, fees, and performance metrics are fully transparent. You'll always know exactly how your money is being invested.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Commitment</h2>
          <p className="text-slate-600">
            We are committed to providing you with the highest level of service, security, and profitability. Our platform is built on trust, transparency, and a deep understanding of the cryptocurrency market dynamics.
          </p>
        </div>
      </div>
    </section>
  );
}
