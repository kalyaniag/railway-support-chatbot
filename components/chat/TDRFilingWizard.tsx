"use client";

import { useState } from "react";

type WizardStep = 1 | 2 | 3 | 4;

interface TDRData {
  pnr: string;
  reason: string;
  description: string;
  bankAccount: string;
  ifscCode: string;
}

interface TDRFilingWizardProps {
  onSubmit: (data: TDRData) => void;
}

export default function TDRFilingWizard({ onSubmit }: TDRFilingWizardProps) {
  const [currentStep, setCurrentStep] = useState<WizardStep>(1);
  const [formData, setFormData] = useState<TDRData>({
    pnr: "",
    reason: "",
    description: "",
    bankAccount: "",
    ifscCode: "",
  });

  const tdrReasons = [
    "Train Cancelled",
    "Train Delayed (>3 hours)",
    "Coach Deficiency",
    "AC Not Working",
    "No Water/Bedroll",
    "Ticket Booking Error",
    "Other",
  ];

  const updateFormData = (field: keyof TDRData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.pnr.length === 10;
      case 2:
        return formData.reason !== "" && formData.description.length >= 20;
      case 3:
        return (
          formData.bankAccount.length >= 8 && formData.ifscCode.length === 11
        );
      case 4:
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < 4 && canProceed()) {
      setCurrentStep((prev) => (prev + 1) as WizardStep);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as WizardStep);
    }
  };

  const handleSubmit = () => {
    if (canProceed()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-blue-200 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white">
        <div className="flex items-center gap-2 mb-3">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <div>
            <h3 className="font-bold text-lg">
              File TDR (Ticket Deposit Receipt)
            </h3>
            <p className="text-sm text-blue-100">Step-by-step refund claim</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-2 mt-4">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center flex-1">
              <div
                className={`h-2 rounded-full flex-1 transition-all ${
                  step <= currentStep ? "bg-white" : "bg-white/30"
                }`}
              />
              {step < 4 && <div className="w-1" />}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-1 text-xs text-blue-100">
          <span>Ticket Info</span>
          <span>Issue</span>
          <span>Bank</span>
          <span>Review</span>
        </div>
      </div>

      <div className="p-4 min-h-[300px]">
        {/* Step 1: Ticket Information */}
        {currentStep === 1 && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                1
              </div>
              <h4 className="font-semibold text-gray-900">
                Enter Ticket Details
              </h4>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                PNR Number *
              </label>
              <input
                type="text"
                maxLength={10}
                value={formData.pnr}
                onChange={(e) =>
                  updateFormData("pnr", e.target.value.replace(/\D/g, ""))
                }
                placeholder="Enter 10-digit PNR"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="mt-1 text-xs text-gray-500">
                {formData.pnr.length}/10 digits
              </p>
            </div>

            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-xs text-blue-800 flex items-start gap-2">
                <svg
                  className="w-4 h-4 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>
                  TDR must be filed within 72 hours for refund claims. Ensure
                  your PNR is valid.
                </span>
              </p>
            </div>
          </div>
        )}

        {/* Step 2: Issue Details */}
        {currentStep === 2 && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                2
              </div>
              <h4 className="font-semibold text-gray-900">
                Describe the Issue
              </h4>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Reason *
              </label>
              <div className="grid grid-cols-2 gap-2">
                {tdrReasons.map((reason) => (
                  <button
                    key={reason}
                    onClick={() => updateFormData("reason", reason)}
                    className={`px-3 py-2 rounded-lg border-2 text-sm font-medium transition-all text-left ${
                      formData.reason === reason
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 bg-white text-gray-600 hover:border-blue-200"
                    }`}
                  >
                    {reason}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Detailed Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => updateFormData("description", e.target.value)}
                placeholder="Please provide detailed information about the issue (minimum 20 characters)..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
              <p className="mt-1 text-xs text-gray-500">
                {formData.description.length}/20 characters minimum
              </p>
            </div>
          </div>
        )}

        {/* Step 3: Bank Details */}
        {currentStep === 3 && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                3
              </div>
              <h4 className="font-semibold text-gray-900">
                Bank Account Details
              </h4>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bank Account Number *
              </label>
              <input
                type="text"
                value={formData.bankAccount}
                onChange={(e) =>
                  updateFormData(
                    "bankAccount",
                    e.target.value.replace(/\D/g, ""),
                  )
                }
                placeholder="Enter account number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                IFSC Code *
              </label>
              <input
                type="text"
                maxLength={11}
                value={formData.ifscCode}
                onChange={(e) =>
                  updateFormData("ifscCode", e.target.value.toUpperCase())
                }
                placeholder="Enter IFSC code"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase"
              />
              <p className="mt-1 text-xs text-gray-500">
                11-character IFSC code (e.g., SBIN0001234)
              </p>
            </div>

            <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-xs text-yellow-800 flex items-start gap-2">
                <svg
                  className="w-4 h-4 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>
                  Ensure bank details match your ticket booking. Refunds will be
                  credited to this account.
                </span>
              </p>
            </div>
          </div>
        )}

        {/* Step 4: Review & Submit */}
        {currentStep === 4 && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                4
              </div>
              <h4 className="font-semibold text-gray-900">Review Your TDR</h4>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">PNR Number</p>
                <p className="font-semibold text-gray-900">{formData.pnr}</p>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Reason</p>
                <p className="font-semibold text-gray-900">{formData.reason}</p>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Description</p>
                <p className="text-sm text-gray-700">{formData.description}</p>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Bank Account</p>
                <p className="font-semibold text-gray-900">
                  •••• •••• {formData.bankAccount.slice(-4)}
                </p>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">IFSC Code</p>
                <p className="font-semibold text-gray-900">
                  {formData.ifscCode}
                </p>
              </div>
            </div>

            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
              <p className="text-xs text-green-800 flex items-start gap-2">
                <svg
                  className="w-4 h-4 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>
                  Your TDR will be submitted immediately. You&apos;ll receive a
                  confirmation with TDR number via SMS and email.
                </span>
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex gap-2">
        {currentStep > 1 && (
          <button
            onClick={handleBack}
            className="flex-1 py-2 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all"
          >
            Back
          </button>
        )}
        {currentStep < 4 ? (
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex-1 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-orange-700 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="flex-1 py-2 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg font-semibold hover:from-green-700 hover:to-green-600 transition-all"
          >
            Submit TDR
          </button>
        )}
      </div>
    </div>
  );
}
