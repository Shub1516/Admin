import { useState } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { User, Shield, Bell, Database, Save, Mail, Phone, Building, MapPin, Calendar, Briefcase } from 'lucide-react';
import { toast } from 'sonner';

const Settings = () => {
  const { admin } = useAuth();
  const [profileData, setProfileData] = useState({
    name: admin?.name || 'HR Admin',
    email: admin?.email || 'hradmin@cloudutility.in',
    phone: '+91 9876543210',
    designation: 'HR Manager',
    department: 'Human Resources',
    location: 'Indore, India',
    bio: 'Responsible for managing internship applications and recruitment processes at Cloud Utility.',
    joinedDate: '2024-01-15',
  });
  const [notifications, setNotifications] = useState({
    newApplications: true,
    userSignups: true,
    projectUpdates: false,
    weeklyReports: true,
  });

  const handleSaveProfile = () => {
    toast.success('Profile updated successfully');
  };

  const handleSaveNotifications = () => {
    toast.success('Notification preferences saved');
  };

  return (
    <div className="min-h-screen">
      <AdminHeader title="Settings" subtitle="Manage your admin preferences" />

      <div className="p-6">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-secondary/50">
            <TabsTrigger value="profile" className="gap-2">
              <User className="w-4 h-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="w-4 h-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Shield className="w-4 h-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="api" className="gap-2">
              <Database className="w-4 h-4" />
              API Config
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Card */}
              <Card className="glass-card lg:col-span-1">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-3xl font-bold mb-4">
                      {profileData.name?.charAt(0) || 'A'}
                    </div>
                    <h3 className="text-xl font-semibold">{profileData.name}</h3>
                    <p className="text-muted-foreground">{profileData.designation}</p>
                    <Badge variant="outline" className="mt-2 bg-primary/20 text-primary border-primary/30">
                      {admin?.role === 'super_admin' ? 'Super Admin' : 'Admin'}
                    </Badge>
                    
                    <div className="w-full mt-6 space-y-3 text-left">
                      <div className="flex items-center gap-3 text-sm">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span>{profileData.email}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span>{profileData.phone}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Building className="w-4 h-4 text-muted-foreground" />
                        <span>{profileData.department}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>{profileData.location}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>Joined {new Date(profileData.joinedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                      </div>
                    </div>
                    
                    <Button variant="outline" size="sm" className="mt-6 w-full">
                      Change Avatar
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Edit Profile Form */}
              <Card className="glass-card lg:col-span-2">
                <CardHeader>
                  <CardTitle>Edit Profile</CardTitle>
                  <CardDescription>Update your admin profile information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        className="bg-secondary/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        className="bg-secondary/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        className="bg-secondary/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="designation">Designation</Label>
                      <Input
                        id="designation"
                        value={profileData.designation}
                        onChange={(e) => setProfileData({ ...profileData, designation: e.target.value })}
                        className="bg-secondary/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Input
                        id="department"
                        value={profileData.department}
                        onChange={(e) => setProfileData({ ...profileData, department: e.target.value })}
                        className="bg-secondary/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={profileData.location}
                        onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                        className="bg-secondary/50"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      className="bg-secondary/50 min-h-[100px]"
                      placeholder="Write a short bio about yourself..."
                    />
                  </div>

                  <Button onClick={handleSaveProfile} className="gap-2 gradient-primary">
                    <Save className="w-4 h-4" />
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose what notifications you receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">New Applications</p>
                    <p className="text-sm text-muted-foreground">Get notified when someone applies</p>
                  </div>
                  <Switch
                    checked={notifications.newApplications}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, newApplications: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">User Signups</p>
                    <p className="text-sm text-muted-foreground">Get notified for new user registrations</p>
                  </div>
                  <Switch
                    checked={notifications.userSignups}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, userSignups: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Project Updates</p>
                    <p className="text-sm text-muted-foreground">Get notified for project changes</p>
                  </div>
                  <Switch
                    checked={notifications.projectUpdates}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, projectUpdates: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Weekly Reports</p>
                    <p className="text-sm text-muted-foreground">Receive weekly analytics summary</p>
                  </div>
                  <Switch
                    checked={notifications.weeklyReports}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, weeklyReports: checked })}
                  />
                </div>

                <Button onClick={handleSaveNotifications} className="gap-2 gradient-primary">
                  <Save className="w-4 h-4" />
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your account security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" className="bg-secondary/50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" className="bg-secondary/50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" className="bg-secondary/50" />
                </div>

                <Button className="gap-2 gradient-primary">
                  <Save className="w-4 h-4" />
                  Update Password
                </Button>

                <div className="pt-6 border-t border-border">
                  <h4 className="font-medium mb-4">Two-Factor Authentication</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Add an extra layer of security to your account
                  </p>
                  <Button variant="outline">Enable 2FA</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* API Config Tab */}
          <TabsContent value="api">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>API Configuration</CardTitle>
                <CardDescription>Configure your backend API connection</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-warning/10 border border-warning/30">
                  <p className="text-sm text-warning">
                    <strong>Note:</strong> The admin panel is currently using mock data. To connect to your real backend:
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="apiUrl">API Base URL</Label>
                  <Input
                    id="apiUrl"
                    placeholder="https://your-api.com/api"
                    className="bg-secondary/50"
                    defaultValue="http://localhost:5000/api"
                  />
                  <p className="text-xs text-muted-foreground">
                    Set VITE_API_URL in your environment or update src/services/api.js
                  </p>
                </div>

                <div className="pt-4 border-t border-border">
                  <h4 className="font-medium mb-2">Integration Steps:</h4>
                  <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                    <li>Update the API_BASE_URL in src/services/api.js</li>
                    <li>Uncomment the actual API fetch calls</li>
                    <li>Remove mock data arrays</li>
                    <li>Ensure your backend CORS allows this domain</li>
                  </ol>
                </div>

                <Button className="gap-2 gradient-primary">
                  <Save className="w-4 h-4" />
                  Save Configuration
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
