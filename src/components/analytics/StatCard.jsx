function StatCard({ title, value, subtitle, icon: Icon, trend, color = 'accent-primary' }) {
    return (
      <div className="bg-bg-secondary rounded-xl border border-border-primary p-6 hover:border-accent-primary/50 transition">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-lg bg-${color}/10`}>
            {Icon && <Icon className={`w-6 h-6 text-${color}`} />}
          </div>
          
          {trend && (
            <div className={`text-sm font-semibold ${
              trend > 0 ? 'text-accent-success' : 'text-accent-danger'
            }`}>
              {trend > 0 ? '+' : ''}{trend}%
            </div>
          )}
        </div>
  
        <div className="mb-1">
          <div className="text-sm text-text-tertiary">{title}</div>
          <div className={`text-3xl font-bold text-${color}`}>
            {value}
          </div>
        </div>
        
        {subtitle && (
          <div className="text-xs text-text-tertiary mt-2">{subtitle}</div>
        )}
      </div>
    );
  }
  
  export default StatCard;