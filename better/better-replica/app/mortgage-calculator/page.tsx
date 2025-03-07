'use client';

import { useState } from 'react';
// import { Slider } from '@/components/ui/Slider';

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState(500000);
  const [downPayment, setDownPayment] = useState(100000);
  const [loanTerm, setLoanTerm] = useState(30);
  const [interestRate, setInterestRate] = useState(4.5);
  const [propertyTax, setPropertyTax] = useState(0.9);
  const [homeInsurance, setHomeInsurance] = useState(1200);

  // Calculations
  const loanAmount = homePrice - downPayment;
  const downPaymentPercentage = (downPayment / homePrice) * 100;
  
  // Monthly principal and interest payment
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = loanTerm * 12;
  let monthlyPayment = 0;
  
  if (interestRate > 0) {
    monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  } else {
    monthlyPayment = loanAmount / numberOfPayments;
  }
  
  // Monthly property tax
  const monthlyPropertyTax = (homePrice * (propertyTax / 100)) / 12;
  
  // Monthly home insurance
  const monthlyHomeInsurance = homeInsurance / 12;
  
  // Total monthly payment
  const totalMonthlyPayment = monthlyPayment + monthlyPropertyTax + monthlyHomeInsurance;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return value.toFixed(1) + '%';
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Mortgage Calculator
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Estimate your monthly mortgage payment based on your home price, down payment, and loan terms.
          </p>

          <div className="mt-12 bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <div className="grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-2">
                {/* Home Price */}
                <div className="sm:col-span-2">
                  <label htmlFor="home-price" className="block text-sm font-medium text-gray-700">
                    Home Price: {formatCurrency(homePrice)}
                  </label>
                  <div className="mt-2">
                    <input
                      type="range"
                      id="home-price"
                      min="50000"
                      max="2000000"
                      step="5000"
                      value={homePrice}
                      onChange={(e) => setHomePrice(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>{formatCurrency(50000)}</span>
                      <span>{formatCurrency(2000000)}</span>
                    </div>
                  </div>
                </div>

                {/* Down Payment */}
                <div className="sm:col-span-2">
                  <label htmlFor="down-payment" className="block text-sm font-medium text-gray-700">
                    Down Payment: {formatCurrency(downPayment)} ({downPaymentPercentage.toFixed(1)}%)
                  </label>
                  <div className="mt-2">
                    <input
                      type="range"
                      id="down-payment"
                      min="0"
                      max={homePrice * 0.5}
                      step="5000"
                      value={downPayment}
                      onChange={(e) => setDownPayment(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>{formatCurrency(0)}</span>
                      <span>{formatCurrency(homePrice * 0.5)}</span>
                    </div>
                  </div>
                </div>

                {/* Loan Term */}
                <div>
                  <label htmlFor="loan-term" className="block text-sm font-medium text-gray-700">
                    Loan Term: {loanTerm} years
                  </label>
                  <div className="mt-2">
                    <select
                      id="loan-term"
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(Number(e.target.value))}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    >
                      <option value="10">10 years</option>
                      <option value="15">15 years</option>
                      <option value="20">20 years</option>
                      <option value="30">30 years</option>
                    </select>
                  </div>
                </div>

                {/* Interest Rate */}
                <div>
                  <label htmlFor="interest-rate" className="block text-sm font-medium text-gray-700">
                    Interest Rate: {formatPercentage(interestRate)}
                  </label>
                  <div className="mt-2">
                    <input
                      type="range"
                      id="interest-rate"
                      min="2"
                      max="10"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>2.0%</span>
                      <span>10.0%</span>
                    </div>
                  </div>
                </div>

                {/* Property Tax */}
                <div>
                  <label htmlFor="property-tax" className="block text-sm font-medium text-gray-700">
                    Property Tax Rate: {formatPercentage(propertyTax)}
                  </label>
                  <div className="mt-2">
                    <input
                      type="range"
                      id="property-tax"
                      min="0"
                      max="5"
                      step="0.1"
                      value={propertyTax}
                      onChange={(e) => setPropertyTax(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>

                {/* Home Insurance */}
                <div>
                  <label htmlFor="home-insurance" className="block text-sm font-medium text-gray-700">
                    Annual Home Insurance: {formatCurrency(homeInsurance)}
                  </label>
                  <div className="mt-2">
                    <input
                      type="range"
                      id="home-insurance"
                      min="600"
                      max="3000"
                      step="100"
                      value={homeInsurance}
                      onChange={(e) => setHomeInsurance(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="mt-10 bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Mortgage Details</h3>
                <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                  <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
                    <dt className="text-sm font-medium text-gray-500 truncate">Loan Amount</dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900">{formatCurrency(loanAmount)}</dd>
                  </div>

                  <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
                    <dt className="text-sm font-medium text-gray-500 truncate">Principal & Interest</dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900">{formatCurrency(monthlyPayment)}</dd>
                  </div>

                  <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Monthly Payment</dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900">{formatCurrency(totalMonthlyPayment)}</dd>
                  </div>
                </dl>

                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h4 className="text-sm font-medium text-gray-500">Payment Breakdown</h4>
                    <ul className="mt-3 space-y-3">
                      <li className="flex justify-between">
                        <span className="text-sm text-gray-600">Principal & Interest:</span>
                        <span className="text-sm font-medium text-gray-900">{formatCurrency(monthlyPayment)}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-sm text-gray-600">Property Tax:</span>
                        <span className="text-sm font-medium text-gray-900">{formatCurrency(monthlyPropertyTax)}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-sm text-gray-600">Home Insurance:</span>
                        <span className="text-sm font-medium text-gray-900">{formatCurrency(monthlyHomeInsurance)}</span>
                      </li>
                      <li className="flex justify-between pt-3 border-t border-gray-200">
                        <span className="text-sm font-medium text-gray-900">Total:</span>
                        <span className="text-sm font-medium text-gray-900">{formatCurrency(totalMonthlyPayment)}</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow">
                    <h4 className="text-sm font-medium text-gray-500">Loan Summary</h4>
                    <ul className="mt-3 space-y-3">
                      <li className="flex justify-between">
                        <span className="text-sm text-gray-600">Down Payment:</span>
                        <span className="text-sm font-medium text-gray-900">{formatCurrency(downPayment)} ({downPaymentPercentage.toFixed(1)}%)</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-sm text-gray-600">Loan Amount:</span>
                        <span className="text-sm font-medium text-gray-900">{formatCurrency(loanAmount)}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-sm text-gray-600">Loan Term:</span>
                        <span className="text-sm font-medium text-gray-900">{loanTerm} years</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-sm text-gray-600">Interest Rate:</span>
                        <span className="text-sm font-medium text-gray-900">{formatPercentage(interestRate)}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}