import { useEffect, useState } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { DataTable } from '@/components/admin/DataTable';
import { apiService } from '@/services/api';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { MoreHorizontal, Eye, UserCheck, UserX, Ban, Crown } from 'lucide-react';
import { toast } from 'sonner';

const statusColors = {
  active: 'bg-success/20 text-success border-success/30',
  inactive: 'bg-warning/20 text-warning border-warning/30',
  blocked: 'bg-destructive/20 text-destructive border-destructive/30',
};

const roleColors = {
  premium: 'bg-primary/20 text-primary border-primary/30',
  user: 'bg-secondary text-secondary-foreground border-border',
};

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await apiService.getUsers();
      setUsers(data);
    } catch (error) {
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await apiService.updateUserStatus(id, status);
      setUsers(users.map(u => u.id === id ? { ...u, status } : u));
      toast.success(`User status updated to ${status}`);
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const columns = [
    {
      key: 'name',
      header: 'User',
      sortable: true,
      render: (item) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full gradient-purple flex items-center justify-center text-primary-foreground text-sm font-medium">
            {item.name.charAt(0)}
          </div>
          <div>
            <p className="font-medium">{item.name}</p>
            <p className="text-xs text-muted-foreground">{item.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      header: 'Role',
      render: (item) => (
        <Badge variant="outline" className={roleColors[item.role]}>
          {item.role === 'premium' && <Crown className="w-3 h-3 mr-1" />}
          {item.role}
        </Badge>
      ),
    },
    {
      key: 'joinedAt',
      header: 'Joined',
      sortable: true,
      render: (item) => (
        <span className="text-muted-foreground">{new Date(item.joinedAt).toLocaleDateString()}</span>
      ),
    },
    {
      key: 'lastActive',
      header: 'Last Active',
      render: (item) => (
        <span className="text-muted-foreground">
          {item.lastActive ? new Date(item.lastActive).toLocaleDateString() : 'Never'}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (item) => (
        <Badge variant="outline" className={statusColors[item.status]}>
          {item.status}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (item) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => { setSelectedUser(item); setViewDialogOpen(true); }}>
              <Eye className="w-4 h-4 mr-2" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStatusChange(item.id, 'active')}>
              <UserCheck className="w-4 h-4 mr-2 text-success" />
              Activate
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStatusChange(item.id, 'inactive')}>
              <UserX className="w-4 h-4 mr-2 text-warning" />
              Deactivate
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleStatusChange(item.id, 'blocked')} className="text-destructive">
              <Ban className="w-4 h-4 mr-2" />
              Block User
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <AdminHeader title="Users" subtitle="Manage registered users" />

      <div className="p-6">
        <DataTable
          data={users}
          columns={columns}
          searchKey="name"
          searchPlaceholder="Search users..."
          filterKey="status"
          filterOptions={[
            { value: 'active', label: 'Active' },
            { value: 'inactive', label: 'Inactive' },
            { value: 'blocked', label: 'Blocked' },
          ]}
        />
      </div>

      {/* View Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>Full information about the user</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full gradient-purple flex items-center justify-center text-primary-foreground text-xl font-bold">
                  {selectedUser.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{selectedUser.name}</h3>
                  <p className="text-muted-foreground">{selectedUser.email}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Phone</p>
                  <p className="font-medium">{selectedUser.phone || 'Not provided'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Role</p>
                  <Badge variant="outline" className={roleColors[selectedUser.role]}>
                    {selectedUser.role === 'premium' && <Crown className="w-3 h-3 mr-1" />}
                    {selectedUser.role}
                  </Badge>
                </div>
                <div>
                  <p className="text-muted-foreground">Joined</p>
                  <p className="font-medium">{new Date(selectedUser.joinedAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Last Active</p>
                  <p className="font-medium">
                    {selectedUser.lastActive ? new Date(selectedUser.lastActive).toLocaleDateString() : 'Never'}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Status</p>
                  <Badge variant="outline" className={statusColors[selectedUser.status]}>
                    {selectedUser.status}
                  </Badge>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Users;
