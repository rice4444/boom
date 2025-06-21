import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { User } from "@shared/schema";

interface EditUserModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onUserUpdated: () => void;
}

export default function EditUserModal({ user, isOpen, onClose, onUserUpdated }: EditUserModalProps) {
  const [plan, setPlan] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      setPlan(user.plan);
      setAmount(user.amount.toString());
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    try {
      await apiRequest("PATCH", `/api/admin/users/${user.id}`, {
        plan,
        amount: parseInt(amount)
      });

      toast({
        title: "Success",
        description: "User investment updated successfully!",
      });

      onUserUpdated();
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update user investment",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getPlanName = (planCode: string) => {
    const plans: Record<string, string> = {
      'starter': 'Starter Plan',
      'silver': 'Silver Plan',
      'bonus': 'Bonus Plan',
      'flexible': 'Flexible Plan'
    };
    return plans[planCode] || planCode;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit User Investment</DialogTitle>
        </DialogHeader>
        
        {user && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={user.name}
                readOnly
                className="bg-slate-50"
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={user.email}
                readOnly
                className="bg-slate-50"
              />
            </div>
            
            <div>
              <Label htmlFor="plan">Plan</Label>
              <Select value={plan} onValueChange={setPlan}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="starter">Starter Plan</SelectItem>
                  <SelectItem value="silver">Silver Plan</SelectItem>
                  <SelectItem value="bonus">Bonus Plan</SelectItem>
                  <SelectItem value="flexible">Flexible Plan</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="amount">Investment Amount ($)</Label>
              <Input
                id="amount"
                type="number"
                min="100"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            
            <div className="flex gap-4 mt-6">
              <Button 
                type="submit" 
                className="flex-1" 
                disabled={isLoading}
                style={{ backgroundColor: 'var(--crypto-blue)' }}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                className="flex-1" 
                onClick={onClose}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
