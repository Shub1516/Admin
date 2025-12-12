import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Cloud, Shield, ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="text-center relative z-10 max-w-2xl mx-auto">
        <div className="mx-auto w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center mb-6 animate-scale-in">
          <Cloud className="w-10 h-10 text-primary-foreground" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
          Cloud <span className="text-gradient">Utility</span>
        </h1>
        
        <p className="text-xl text-muted-foreground mb-8 animate-slide-up">
          Your existing Cloud Utility website is ready. Access the admin panel to manage your platform.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <Link to="/admin">
            <Button size="lg" className="gap-2 gradient-primary w-full sm:w-auto">
              <Shield className="w-5 h-5" />
              Admin Dashboard
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="mt-12 p-6 rounded-xl glass-card animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <h3 className="font-semibold mb-2">Admin Panel Features</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
            <div className="p-3 rounded-lg bg-secondary/30">Dashboard Analytics</div>
            <div className="p-3 rounded-lg bg-secondary/30">Applicant Management</div>
            <div className="p-3 rounded-lg bg-secondary/30">User Management</div>
            <div className="p-3 rounded-lg bg-secondary/30">Project Management</div>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Demo login: admin@cloudutility.com / admin123
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
