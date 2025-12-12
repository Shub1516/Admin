import { cn } from '@/lib/utils';

const gradientClasses = {
  primary: 'gradient-primary',
  purple: 'gradient-purple',
  orange: 'gradient-orange',
  green: 'gradient-green',
  red: 'gradient-red',
};

export const StatsCard = ({ title, value, change, changeType = 'neutral', icon: Icon, gradient }) => {
  return (
    <div className="glass-card rounded-xl p-6 animate-slide-up">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <h3 className="text-3xl font-bold">{value}</h3>
          {change && (
            <p
              className={cn(
                'text-sm mt-2 flex items-center gap-1',
                changeType === 'positive' && 'text-success',
                changeType === 'negative' && 'text-destructive',
                changeType === 'neutral' && 'text-muted-foreground'
              )}
            >
              {changeType === 'positive' && '↑'}
              {changeType === 'negative' && '↓'}
              {change}
            </p>
          )}
        </div>
        <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', gradientClasses[gradient])}>
          <Icon className="w-6 h-6 text-primary-foreground" />
        </div>
      </div>
    </div>
  );
};
