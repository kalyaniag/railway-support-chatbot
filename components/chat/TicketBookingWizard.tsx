"use client";

import { useState } from "react";

type WizardStep = 1 | 2 | 3 | 4;

interface PassengerInfo {
  name: string;
  age: string;
  gender: string;
  berthPreference: string;
}

interface BookingData {
  fromStation: string;
  toStation: string;
  journeyDate: string;
  travelClass: string;
  quota: string;
  passengers: PassengerInfo[];
  contactEmail: string;
  contactMobile: string;
}

interface TicketBookingWizardProps {
  onSubmit: (data: BookingData) => void;
  initialFrom?: string;
  initialTo?: string;
}

const popularStations = [
  { code: "NDLS", name: "New Delhi" },
  { code: "BCT", name: "Mumbai Central" },
  { code: "HWH", name: "Howrah Junction" },
  { code: "MAS", name: "Chennai Central" },
  { code: "SBC", name: "Bengaluru" },
  { code: "PUNE", name: "Pune Junction" },
  { code: "JP", name: "Jaipur" },
  { code: "LKO", name: "Lucknow" },
  { code: "ADI", name: "Ahmedabad" },
  { code: "HYB", name: "Hyderabad" },
];

const travelClasses = [
  { code: "1A", name: "First AC", price: "₹₹₹₹" },
  { code: "2A", name: "AC 2 Tier", price: "₹₹₹" },
  { code: "3A", name: "AC 3 Tier", price: "₹₹" },
  { code: "SL", name: "Sleeper", price: "₹" },
  { code: "2S", name: "Second Sitting", price: "₹" },
];

const quotas = [
  { code: "GN", name: "General" },
  { code: "TQ", name: "Tatkal" },
  { code: "PT", name: "Premium Tatkal" },
  { code: "LD", name: "Ladies" },
  { code: "SS", name: "Senior Citizen" },
];

export default function TicketBookingWizard({
  onSubmit,
  initialFrom = "",
  initialTo = "",
}: TicketBookingWizardProps) {
  const [currentStep, setCurrentStep] = useState<WizardStep>(1);
  const [formData, setFormData] = useState<BookingData>({
    fromStation: initialFrom,
    toStation: initialTo,
    journeyDate: "",
    travelClass: "3A",
    quota: "GN",
    passengers: [
      { name: "", age: "", gender: "M", berthPreference: "No Preference" },
    ],
    contactEmail: "",
    contactMobile: "",
  });

  const updateFormData = (
    field: keyof BookingData,
    value: string | PassengerInfo[],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updatePassenger = (
    index: number,
    field: keyof PassengerInfo,
    value: string,
  ) => {
    const updatedPassengers = [...formData.passengers];
    updatedPassengers[index] = { ...updatedPassengers[index], [field]: value };
    updateFormData("passengers", updatedPassengers);
  };

  const addPassenger = () => {
    if (formData.passengers.length < 6) {
      updateFormData("passengers", [
        ...formData.passengers,
        { name: "", age: "", gender: "M", berthPreference: "No Preference" },
      ]);
    }
  };

  const removePassenger = (index: number) => {
    if (formData.passengers.length > 1) {
      const updatedPassengers = formData.passengers.filter(
        (_, i) => i !== index,
      );
      updateFormData("passengers", updatedPassengers);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return (
          formData.fromStation !== "" &&
          formData.toStation !== "" &&
          formData.journeyDate !== "" &&
          formData.fromStation !== formData.toStation
        );
      case 2:
        return formData.passengers.every(
          (p) =>
            p.name.length >= 3 &&
            p.age !== "" &&
            parseInt(p.age) > 0 &&
            parseInt(p.age) < 120,
        );
      case 3:
        return (
          formData.contactEmail.includes("@") &&
          formData.contactMobile.length === 10
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

  // Get tomorrow's date as minimum date
  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  // Get max date (120 days from now)
  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 120);
    return maxDate.toISOString().split("T")[0];
  };

  return (
    <div className="bg-white rounded-lg border border-orange-200 overflow-hidden mt-3">
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 text-white">
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
              d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
            />
          </svg>
          <div>
            <h3 className="font-bold text-lg">Book Train Ticket</h3>
            <p className="text-sm text-orange-100">
              Quick booking in 4 easy steps
            </p>
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
        <div className="flex justify-between mt-1 text-xs text-orange-100">
          <span>Journey</span>
          <span>Passengers</span>
          <span>Contact</span>
          <span>Confirm</span>
        </div>
      </div>

      <div className="p-4 min-h-[320px]">
        {/* Step 1: Journey Details */}
        {currentStep === 1 && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold">
                1
              </div>
              <h4 className="font-semibold text-gray-900">Journey Details</h4>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  From Station *
                </label>
                <select
                  value={formData.fromStation}
                  onChange={(e) =>
                    updateFormData("fromStation", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                >
                  <option value="">Select</option>
                  {popularStations.map((station) => (
                    <option key={station.code} value={station.code}>
                      {station.name} ({station.code})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  To Station *
                </label>
                <select
                  value={formData.toStation}
                  onChange={(e) => updateFormData("toStation", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                >
                  <option value="">Select</option>
                  {popularStations.map((station) => (
                    <option key={station.code} value={station.code}>
                      {station.name} ({station.code})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Journey Date *
              </label>
              <input
                type="date"
                value={formData.journeyDate}
                min={getMinDate()}
                max={getMaxDate()}
                onChange={(e) => updateFormData("journeyDate", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Class
                </label>
                <select
                  value={formData.travelClass}
                  onChange={(e) =>
                    updateFormData("travelClass", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                >
                  {travelClasses.map((cls) => (
                    <option key={cls.code} value={cls.code}>
                      {cls.name} {cls.price}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quota
                </label>
                <select
                  value={formData.quota}
                  onChange={(e) => updateFormData("quota", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                >
                  {quotas.map((q) => (
                    <option key={q.code} value={q.code}>
                      {q.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {formData.fromStation === formData.toStation &&
              formData.fromStation !== "" && (
                <p className="text-red-500 text-sm">
                  From and To stations cannot be the same
                </p>
              )}
          </div>
        )}

        {/* Step 2: Passenger Details */}
        {currentStep === 2 && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold">
                  2
                </div>
                <h4 className="font-semibold text-gray-900">
                  Passenger Details
                </h4>
              </div>
              {formData.passengers.length < 6 && (
                <button
                  onClick={addPassenger}
                  className="text-sm text-orange-600 hover:text-orange-700 font-medium"
                >
                  + Add Passenger
                </button>
              )}
            </div>

            <div className="space-y-3 max-h-[250px] overflow-y-auto">
              {formData.passengers.map((passenger, index) => (
                <div
                  key={index}
                  className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Passenger {index + 1}
                    </span>
                    {formData.passengers.length > 1 && (
                      <button
                        onClick={() => removePassenger(index)}
                        className="text-red-500 hover:text-red-600 text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Full Name *"
                      value={passenger.name}
                      onChange={(e) =>
                        updatePassenger(index, "name", e.target.value)
                      }
                      className="px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-orange-500"
                    />
                    <input
                      type="number"
                      placeholder="Age *"
                      min="1"
                      max="120"
                      value={passenger.age}
                      onChange={(e) =>
                        updatePassenger(index, "age", e.target.value)
                      }
                      className="px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-orange-500"
                    />
                    <select
                      value={passenger.gender}
                      onChange={(e) =>
                        updatePassenger(index, "gender", e.target.value)
                      }
                      className="px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-orange-500"
                    >
                      <option value="M">Male</option>
                      <option value="F">Female</option>
                      <option value="T">Transgender</option>
                    </select>
                    <select
                      value={passenger.berthPreference}
                      onChange={(e) =>
                        updatePassenger(
                          index,
                          "berthPreference",
                          e.target.value,
                        )
                      }
                      className="px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-orange-500"
                    >
                      <option value="No Preference">No Preference</option>
                      <option value="Lower">Lower</option>
                      <option value="Middle">Middle</option>
                      <option value="Upper">Upper</option>
                      <option value="Side Lower">Side Lower</option>
                      <option value="Side Upper">Side Upper</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-gray-500">
              Maximum 6 passengers per booking. Name should match ID proof.
            </p>
          </div>
        )}

        {/* Step 3: Contact Details */}
        {currentStep === 3 && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold">
                3
              </div>
              <h4 className="font-semibold text-gray-900">Contact Details</h4>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.contactEmail}
                onChange={(e) => updateFormData("contactEmail", e.target.value)}
                placeholder="your.email@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                E-ticket will be sent to this email
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Number *
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-gray-600 text-sm">
                  +91
                </span>
                <input
                  type="tel"
                  maxLength={10}
                  value={formData.contactMobile}
                  onChange={(e) =>
                    updateFormData(
                      "contactMobile",
                      e.target.value.replace(/\D/g, ""),
                    )
                  }
                  placeholder="9876543210"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Booking updates will be sent via SMS
              </p>
            </div>

            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-xs text-blue-800">
                <strong>Note:</strong> Please ensure contact details are
                correct. Ticket confirmation and journey updates will be sent
                here.
              </p>
            </div>
          </div>
        )}

        {/* Step 4: Review & Confirm */}
        {currentStep === 4 && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold">
                4
              </div>
              <h4 className="font-semibold text-gray-900">Review Booking</h4>
            </div>

            <div className="bg-gray-50 rounded-lg p-3 space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">Journey</span>
                <span className="font-semibold text-gray-900">
                  {popularStations.find((s) => s.code === formData.fromStation)
                    ?.name || formData.fromStation}{" "}
                  →{" "}
                  {popularStations.find((s) => s.code === formData.toStation)
                    ?.name || formData.toStation}
                </span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">Date</span>
                <span className="font-semibold text-gray-900">
                  {new Date(formData.journeyDate).toLocaleDateString("en-IN", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">Class / Quota</span>
                <span className="font-semibold text-gray-900">
                  {
                    travelClasses.find((c) => c.code === formData.travelClass)
                      ?.name
                  }{" "}
                  / {quotas.find((q) => q.code === formData.quota)?.name}
                </span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">Passengers</span>
                <span className="font-semibold text-gray-900">
                  {formData.passengers.length}
                </span>
              </div>
              <div className="pt-1">
                <span className="text-sm text-gray-600">Passenger Names:</span>
                <div className="mt-1 space-y-1">
                  {formData.passengers.map((p, i) => (
                    <div key={i} className="text-sm text-gray-800">
                      {i + 1}. {p.name} (
                      {p.gender === "M"
                        ? "Male"
                        : p.gender === "F"
                          ? "Female"
                          : "Other"}
                      , {p.age} yrs)
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-xs text-yellow-800">
                <strong>Demo Mode:</strong> This is a demonstration. In
                production, this would redirect to IRCTC payment gateway.
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
            className="flex-1 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="flex-1 py-2 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg font-semibold hover:from-green-700 hover:to-green-600 transition-all"
          >
            Proceed to Pay
          </button>
        )}
      </div>
    </div>
  );
}
