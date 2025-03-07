'use client';

import { useState } from 'react';

export default function Start() {
    const [step, setStep] = useState(1);
    const [loanPurpose, setLoanPurpose] = useState('');
    const [propertyType, setPropertyType] = useState('');
    const [propertyUse, setPropertyUse] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert('Form submitted! In a real app, you would now be redirected to your dashboard.');
    };

    const handleNext = () => {
        setStep((prevStep) => prevStep + 1);
        window.scrollTo(0, 0);
    };

    const handleBack = () => {
        setStep((prevStep) => prevStep - 1);
        window.scrollTo(0, 0);
    };


    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-xl">
                    {/* Progress indicator */}
                    <div className="mb-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-between">
                                {[1, 2, 3].map((stepNumber) => (
                                    <span
                                        key={stepNumber}
                                        className={`relative flex h-8 w-8 items-center justify-center rounded-full ${step >= stepNumber ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300 text-gray-500'
                                            }`}
                                    >
                                        {stepNumber}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="mt-2 flex justify-between text-sm font-medium">
                            <span className={step >= 1 ? 'text-blue-600' : 'text-gray-500'}>Loan Details</span>
                            <span className={step >= 2 ? 'text-blue-600' : 'text-gray-500'}>Property Information</span>
                            <span className={step >= 3 ? 'text-blue-600' : 'text-gray-500'}>Personal Information</span>
                        </div>
                    </div>

                    {/* Form card */}
                    <div className="bg-white shadow rounded-lg overflow-hidden">
                        <div className="px-4 py-5 sm:p-6">
                            <h1 className="text-2xl font-bold text-gray-900 mb-6">
                                {step === 1 && 'What are you looking to do?'}
                                {step === 2 && 'Tell us about the property'}
                                {step === 3 && 'Your information'}
                            </h1>

                            <form onSubmit={handleSubmit}>
                                {/* Step 1: Loan Purpose */}
                                {step === 1 && (
                                    <div className="space-y-6">
                                        <div>
                                            <label className="text-base font-medium text-gray-900">Loan Purpose</label>
                                            <div className="mt-4 space-y-4">
                                                {['Purchase a home', 'Refinance', 'Cash-out refinance'].map((purpose) => (
                                                    <div key={purpose} className="flex items-center">
                                                        <input
                                                            id={purpose.replace(/\s+/g, '-').toLowerCase()}
                                                            name="loan-purpose"
                                                            type="radio"
                                                            checked={loanPurpose === purpose}
                                                            onChange={() => setLoanPurpose(purpose)}
                                                            className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                                                        />
                                                        <label
                                                            htmlFor={purpose.replace(/\s+/g, '-').toLowerCase()}
                                                            className="ml-3 block text-sm font-medium text-gray-700"
                                                        >
                                                            {purpose}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex justify-end">
                                            <button
                                                type="button"
                                                onClick={handleNext}
                                                disabled={!loanPurpose}
                                                className={`inline-flex justify-center rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none ${!loanPurpose
                                                        ? 'bg-gray-300 cursor-not-allowed'
                                                        : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                                                    }`}
                                            >
                                                Next
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Step 2: Property Information */}
                                {step === 2 && (
                                    <div className="space-y-6">
                                        <div>
                                            <label className="text-base font-medium text-gray-900">Property Type</label>
                                            <div className="mt-4 space-y-4">
                                                {['Single-family home', 'Condo', 'Townhouse', 'Multi-family home'].map((type) => (
                                                    <div key={type} className="flex items-center">
                                                        <input
                                                            id={type.replace(/\s+/g, '-').toLowerCase()}
                                                            name="property-type"
                                                            type="radio"
                                                            checked={propertyType === type}
                                                            onChange={() => setPropertyType(type)}
                                                            className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                                                        />
                                                        <label
                                                            htmlFor={type.replace(/\s+/g, '-').toLowerCase()}
                                                            className="ml-3 block text-sm font-medium text-gray-700"
                                                        >
                                                            {type}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Property Use Dropdown */}
                                        <div>
                                            <label className="text-base font-medium text-gray-900">Property Use</label>
                                            <select
                                                value={propertyUse}
                                                onChange={(e) => setPropertyUse(e.target.value)}
                                                className="w-full border border-gray-300 rounded p-2"
                                            >
                                                <option value="">Select Use</option>
                                                <option value="Personal">Personal</option>
                                                <option value="Rental">Rental</option>
                                                <option value="Investment">Investment</option>
                                            </select>
                                        </div>

                                        <div className="flex justify-between">
                                            <button type="button" onClick={handleBack} className="bg-gray-300 px-4 py-2 rounded">
                                                Back
                                            </button>
                                            <button type="button" onClick={handleNext} className="bg-blue-600 text-white px-4 py-2 rounded">
                                                Next
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Step 3: Personal Information */}
                                {step === 3 && (
                                    <div className="space-y-6">
                                        <div>
                                            <label className="text-base font-medium text-gray-900">Your Details</label>
                                            <div className="mt-4 space-y-4">
                                                <input
                                                    type="text"
                                                    placeholder="First Name"
                                                    value={firstName}
                                                    onChange={(e) => setFirstName(e.target.value)}
                                                    className="w-full border border-gray-300 rounded p-2"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Last Name"
                                                    value={lastName}
                                                    onChange={(e) => setLastName(e.target.value)}
                                                    className="w-full border border-gray-300 rounded p-2"
                                                />
                                                <input
                                                    type="email"
                                                    placeholder="Email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="w-full border border-gray-300 rounded p-2"
                                                />
                                                <input
                                                    type="tel"
                                                    placeholder="Phone"
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    className="w-full border border-gray-300 rounded p-2"
                                                />
                                            </div>                        </div>

                                        <div className="flex justify-between">
                                            <button type="button" onClick={handleBack} className="bg-gray-300 px-4 py-2 rounded">
                                                Back
                                            </button>
                                            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
