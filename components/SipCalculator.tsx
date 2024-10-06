"use client";

import { useState } from "react";
import PieChart from "./PieChart";

interface SipCalculatorProps {}

const SipCalculator: React.FC<SipCalculatorProps> = () => {
  const [sipAmount, setSipAmount] = useState<number>(25000);
  const [years, setYears] = useState<number>(10);
  const [expectedReturn, setExpectedReturn] = useState<number>(12);
  const [stepUp, setStepUp] = useState<number>(10);
  const [futureValue, setFutureValue] = useState<number | null>(null);
  const [investedValue, setInvestedValue] = useState<number | null>(null);
  const [profit, setProfit] = useState<number | null>(null);

  const handleCalculate = () => {
    let monthlyRate = expectedReturn / 100 / 12;
    let months = years * 12;
    let totalInvested = 0;
    let totalReturn = 0;

    // Loop over each month to calculate the future value and invested value
    for (let i = 0; i < months; i++) {
      let yearlyStepUp = Math.floor(i / 12);
      let currentSIP = sipAmount * Math.pow(1 + stepUp / 100, yearlyStepUp);
      totalInvested += currentSIP; // Sum of all SIP investments
      totalReturn += currentSIP * Math.pow(1 + monthlyRate, months - i); // Compounded future value
    }

    setInvestedValue(totalInvested);
    setFutureValue(totalReturn);
    setProfit(totalReturn - totalInvested); // Profit = Future Value - Invested Value
  };

  return (
    <div className="w-full mx-auto bg-gray-800 shadow-lg rounded-lg text-white p-3 md:p-5 flex flex-wrap justify-between">
      <div
        className={`w-full ${
          futureValue !== null && investedValue !== null && profit !== null
            ? "md:w-[48%]"
            : "md:w-full"
        }`}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-200 font-clashdisplay">
          SIP Calculator
        </h2>

        {/* Monthly SIP Input */}
        <div className="mb-6">
          <label htmlFor="sipAmount" className="block text-gray-400 mb-2">
            Monthly SIP Amount (₹)
          </label>
          <input
            type="number"
            id="sipAmount"
            value={sipAmount}
            onChange={(e) => setSipAmount(parseFloat(e.target.value))}
            className="w-full p-3 border border-gray-600 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        {/* Investment Duration Input */}
        <div className="mb-6">
          <label htmlFor="years" className="block text-gray-400 mb-2">
            Investment Duration (Years)
          </label>
          <input
            type="number"
            id="years"
            value={years}
            onChange={(e) => setYears(parseFloat(e.target.value))}
            className="w-full p-3 border border-gray-600 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter years"
          />
        </div>

        {/* Expected Return Input */}
        <div className="mb-6">
          <label htmlFor="expectedReturn" className="block text-gray-400 mb-2">
            Expected Return (%) per annum
          </label>
          <input
            type="number"
            id="expectedReturn"
            value={expectedReturn}
            onChange={(e) => setExpectedReturn(parseFloat(e.target.value))}
            className="w-full p-3 border border-gray-600 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter expected return"
          />
        </div>

        {/* Step-up Percentage Input */}
        <div className="mb-6">
          <label htmlFor="stepUp" className="block text-gray-400 mb-2">
            Step-up (%) per year
          </label>
          <input
            type="number"
            id="stepUp"
            value={stepUp}
            onChange={(e) => setStepUp(parseFloat(e.target.value))}
            className="w-full p-3 border border-gray-600 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter step-up percentage"
          />
        </div>

        {/* Calculate Button */}
        <button
          onClick={handleCalculate}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded hover:bg-blue-700 transition-all duration-300"
        >
          Calculate
        </button>
      </div>

      {/* Display Results */}
      {futureValue !== null && investedValue !== null && profit !== null && (
        <div
          className={`w-full mt-4 md:mt-0 ${
            futureValue !== null && investedValue !== null && profit !== null
              ? "md:w-[45%]"
              : "md:w-full"
          } p-6 bg-gray-700 rounded-lg`}
        >
          <h3 className="text-xl font-bold mb-4">Results:</h3>
          <p className="text-gray-300 mb-2">
            <strong>Invested Value:</strong> ₹{investedValue.toFixed(2)}
          </p>
          <p className="text-gray-300 mb-2">
            <strong>Expected Return:</strong> ₹{futureValue.toFixed(2)}
          </p>
          <p className="text-gray-300 mb-2">
            <strong>Profit Amount:</strong> ₹{profit.toFixed(2)}
          </p>
          <div>
            <PieChart investedValue={investedValue} profit={profit} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SipCalculator;
