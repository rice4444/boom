import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { authManager } from "@/lib/auth";
import EditUserModal from "@/components/edit-user-modal";
import { User } from "@shared/schema";

export default function Admin() {
  const [, setLocation] = useLocation();
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const user = authManager.getUser();

  useEffect(() => {
    if (!user || !user.isAdmin) {
      setLocation("/login");
    }
  }, [user, setLocation]);

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["/api/admin/users"],
    enabled: !!user && user.isAdmin,
  });

  const handleLogout = () => {
    authManager.logout();
    setLocation("/");
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleUserUpdated = () => {
    queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
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

  if (!user || !user.isAdmin) {
    return null;
  }

  const totalInvestments = users.reduce((sum: number, u: User) => sum + u.amount, 0);

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
        {/* Admin Header */}
        <Card className="shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Admin Dashboard</h1>
              <p className="text-slate-600">Manage user investments and platform data</p>
            </div>
            <Button onClick={handleLogout} variant="outline">
              Logout
            </Button>
          </div>
        </Card>

        {/* Admin Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Total Users</p>
                <p className="text-2xl font-bold text-slate-900">{users.length}</p>
              </div>
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center text-white"
                style={{ backgroundColor: 'var(--crypto-blue)' }}
              >
                <i className="fas fa-users"></i>
              </div>
            </div>
          </Card>

          <Card className="shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Total Investments</p>
                <p 
                  className="text-2xl font-bold"
                  style={{ color: 'var(--success-green)' }}
                >
                  ${totalInvestments.toLocaleString()}
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
                <p className="text-sm text-slate-600 mb-1">Active Plans</p>
                <p 
                  className="text-2xl font-bold"
                  style={{ color: 'var(--bitcoin-gold)' }}
                >
                  {users.length}
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
                <p className="text-sm text-slate-600 mb-1">Platform Status</p>
                <p 
                  className="text-2xl font-bold"
                  style={{ color: 'var(--success-green)' }}
                >
                  Active
                </p>
              </div>
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center text-white"
                style={{ backgroundColor: 'var(--success-green)' }}
              >
                <i className="fas fa-check-circle"></i>
              </div>
            </div>
          </Card>
        </div>

        {/* User Management */}
        <Card className="shadow-lg p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-6">User Management</h2>
          
          {users.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-slate-600">No users registered yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead style={{ backgroundColor: 'var(--slate-50)' }}>
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-slate-900">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-slate-900">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-slate-900">Plan</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-slate-900">Investment</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-slate-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {users.map((user: User) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 text-sm text-slate-900">{user.name}</td>
                      <td className="px-6 py-4 text-sm text-slate-900">{user.email}</td>
                      <td className="px-6 py-4 text-sm text-slate-900">{getPlanName(user.plan)}</td>
                      <td className="px-6 py-4 text-sm text-slate-900">${user.amount.toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm">
                        <Button
                          size="sm"
                          onClick={() => handleEditUser(user)}
                          style={{ backgroundColor: 'var(--crypto-blue)' }}
                        >
                          Edit
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        {/* Edit User Modal */}
        <EditUserModal
          user={editingUser}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingUser(null);
          }}
          onUserUpdated={handleUserUpdated}
        />
      </div>
    </section>
  );
}
