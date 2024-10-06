interface PieChartProps {
  investedValue: number;
  profit: number;
}

const PieChart: React.FC<PieChartProps> = ({ investedValue, profit }) => {
  const total = investedValue + profit;
  const investedPercentage = (investedValue / total) * 100;
  const profitPercentage = (profit / total) * 100;

  return (
    <div className="flex flex-col items-center">
      {/* Pie chart container */}
      <div
        className="relative w-64 h-64 rounded-full"
        style={{
          background: `conic-gradient(
              #3b82f6 ${investedPercentage}%, 
              #10b981 ${investedPercentage}% 100%
            )`,
        }}
      >
        {/* Center circle to make it a donut chart */}
        <div className="absolute inset-0 m-auto w-36 h-36 bg-gray-800 rounded-full"></div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex justify-center gap-4 text-white">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-blue-500 rounded-full"></span>
          <span>Invested: ₹{investedValue.toFixed(2)}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-green-500 rounded-full"></span>
          <span>Profit: ₹{profit.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default PieChart;
