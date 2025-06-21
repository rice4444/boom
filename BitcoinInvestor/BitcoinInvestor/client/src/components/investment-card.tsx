import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { authManager } from "@/lib/auth";
import { Link } from "wouter";

interface InvestmentPlan {
  id: string;
  name: string;
  range: string;
  returnRate: string;
  features: string[];
  isPopular?: boolean;
}

interface InvestmentCardProps {
  plan: InvestmentPlan;
  detailed?: boolean;
}

export default function InvestmentCard({ plan, detailed = false }: InvestmentCardProps) {
  const [showAmountInput, setShowAmountInput] = useState(false);
  const [amount, setAmount] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();
  const user = authManager.getUser();

  const selectPlan = async () => {
    if (!user || user.isAdmin) {
      // Store selected plan for signup page
      localStorage.setItem('selectedPlan', plan.id);
      return;
    }

    setShowAmountInput(true);
  };

  const updateUserPlan = async () => {
    if (!user || !amount) return;

    setIsUpdating(true);
    try {
      await apiRequest("PATCH", `/api/user/${user.id}`, {
        plan: plan.id,
        amount: parseInt(amount)
      });

      toast({
        title: "Plan Updated!",
        description: `Successfully updated to ${plan.name}`,
      });

      // Update user data and refresh queries
      const updatedUser = { ...user, plan: plan.id, amount: parseInt(amount) };
      authManager.setUser(updatedUser);
      queryClient.invalidateQueries({ queryKey: [`/api/user/${user.id}`] });
      
      setShowAmountInput(false);
      setAmount("");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update plan",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Card className={`hover:shadow-xl transition-shadow relative ${
      plan.isPopular ? 'border-2' : 'border'
    }`} style={{
      borderColor: plan.isPopular ? 'var(--bitcoin-gold)' : 'var(--border)'
    }}>
      {plan.isPopular && (
        <div 
          className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold text-white"
          style={{ backgroundColor: 'var(--bitcoin-gold)' }}
        >
          {detailed ? "MOST POPULAR" : "POPULAR"}
        </div>
      )}
      
      <CardContent className={detailed ? "p-8" : "p-6"}>
        <div className="text-center">
          <h3 className={`font-bold mb-${detailed ? '4' : '2'} ${detailed ? 'text-2xl' : 'text-xl'}`}>
            {plan.name}
          </h3>
          <div 
            className={`font-bold mb-2 ${detailed ? 'text-4xl' : 'text-3xl'}`}
            style={{ color: 'var(--crypto-blue)' }}
          >
            {plan.range}
          </div>
          <div 
            className={`font-semibold mb-${detailed ? '6' : '4'} ${detailed ? 'text-lg' : ''}`}
            style={{ color: 'var(--success-green)' }}
          >
            {plan.returnRate} Monthly Return
          </div>
        </div>
        
        <ul className={`space-y-${detailed ? '3' : '2'} mb-${detailed ? '8' : '4'} ${detailed ? '' : 'text-sm'} text-slate-600`}>
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <i className="fas fa-check mr-3" style={{ color: 'var(--success-green)' }}></i>
              {feature}
            </li>
          ))}
        </ul>
        
        {showAmountInput ? (
          <div className="space-y-4">
            <div>
              <Label htmlFor="amount">Investment Amount ($)</Label>
              <Input
                id="amount"
                type="number"
                min="100"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
              />
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={updateUserPlan}
                disabled={isUpdating || !amount}
                className="flex-1 font-semibold"
                style={{ backgroundColor: 'var(--crypto-blue)' }}
              >
                {isUpdating ? "Updating..." : "Update Plan"}
              </Button>
              <Button 
                variant="outline"
                onClick={() => setShowAmountInput(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : user && !user.isAdmin ? (
          <Button 
            className="w-full font-semibold transition-colors"
            style={{
              backgroundColor: plan.isPopular ? 'var(--bitcoin-gold)' : 'var(--crypto-blue)',
              color: 'white'
            }}
            onClick={selectPlan}
          >
            Select Plan
          </Button>
        ) : (
          <Link href="/signup">
            <Button 
              className="w-full font-semibold transition-colors"
              style={{
                backgroundColor: plan.isPopular ? 'var(--bitcoin-gold)' : 'var(--crypto-blue)',
                color: 'white'
              }}
              onClick={selectPlan}
            >
              Sign Up & Select Plan
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );
}
