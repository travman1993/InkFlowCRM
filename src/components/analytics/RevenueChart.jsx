function RevenueChart({ data, title }) {
    if (!data || data.length === 0) {
      return (
        <div className="bg-bg-secondary rounded-xl border border-border-primary p-6">
          <h3 className="text-xl font-bold mb-4">{title}</h3>
          <div className="text-center py-12 text-text-tertiary">
            No data available
          </div>
        </div>
      );
    }
  
    const maxValue = Math.max(...data.map(d => d.value));
    const chartHeight = 200;
  
    return (
      <div className="bg-bg-secondary rounded-xl border border-border-primary p-6">
        <h3 className="text-xl font-bold mb-6">{title}</h3>
        
        <div className="relative" style={{ height: chartHeight + 40 }}>
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 bottom-10 flex flex-col justify-between text-xs text-text-tertiary">
            <span>${(maxValue).toLocaleString()}</span>
            <span>${(maxValue * 0.75).toLocaleString()}</span>
            <span>${(maxValue * 0.5).toLocaleString()}</span>
            <span>${(maxValue * 0.25).toLocaleString()}</span>
            <span>$0</span>
          </div>
  
          {/* Chart bars */}
          <div className="ml-16 h-full flex items-end gap-2 pb-10">
            {data.map((item, index) => {
              const barHeight = maxValue > 0 ? (item.value / maxValue) * chartHeight : 0;
              return (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  {/* Bar */}
                  <div className="w-full bg-bg-primary rounded-t-lg relative group cursor-pointer">
                    <div
                      className="bg-gradient-to-t from-accent-primary to-blue-400 rounded-t-lg transition-all duration-300 hover:opacity-80"
                      style={{ height: `${barHeight}px` }}
                    >
                      {/* Tooltip on hover */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-bg-tertiary rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        <div className="text-xs font-semibold">{item.label}</div>
                        <div className="text-sm text-accent-primary">${item.value.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Label */}
                  <div className="text-xs text-text-tertiary text-center">
                    {item.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
  
  export default RevenueChart;