"use client";

import ChatWidget from "@/components/chat/ChatWidget";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* IRCTC Header */}
      <header className="bg-white shadow-sm border-b-4 border-orange-500">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-700 to-indigo-700 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white text-2xl font-bold">IR</span>
            </div>
            <div className="hidden md:block">
              <h1 className="text-blue-800 font-bold text-xl">
                Indian Railways
              </h1>
              <p className="text-blue-600 text-xs font-medium">
                Safety • Security • Punctuality
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="http://www.indianrail.gov.in/enquiry/PNR/PnrEnquiry.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 text-sm font-medium hover:text-orange-600 transition-colors hidden sm:inline"
            >
              PNR Status
            </a>
            <a
              href="https://www.irctc.co.in/online-charts/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 text-sm font-medium hover:text-orange-600 transition-colors hidden sm:inline"
            >
              Reservation Chart
            </a>
            <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:from-orange-600 hover:to-orange-700 transition-all shadow-md hover:shadow-lg">
              LOGIN
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section with Booking Form */}
      <div className="relative min-h-[600px] overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          {/* Train Image Background - using a gradient that mimics the IRCTC hero */}
          <div className="absolute inset-0 bg-gradient-to-br from-sky-400 via-blue-300 to-blue-200"></div>

          {/* Train Illustration Overlay */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 600'%3E%3Cpath d='M0 300 Q 300 250 600 300 T 1200 300' stroke='%23ffffff' stroke-width='3' fill='none' opacity='0.3'/%3E%3C/svg%3E")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>

          {/* Blue Overlay to match IRCTC style */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/40 via-blue-500/30 to-transparent"></div>

          {/* Decorative Rail Tracks Pattern */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-900/20 to-transparent"></div>

          {/* Decorative Train Icon - Right Side */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-20 hidden lg:block">
            <div className="text-[300px] transform translate-x-20">🚄</div>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 md:py-16">
          {/* Indian Railways Badge - More Prominent */}
          <div className="text-center md:text-left mb-8">
            <div className="inline-flex items-center gap-3 bg-white/95 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-lg border border-blue-100">
              <div className="text-4xl">🚂</div>
              <div className="text-left">
                <h1 className="text-blue-800 font-bold text-2xl tracking-tight">
                  INDIAN RAILWAYS
                </h1>
                <p className="text-blue-600 text-sm font-medium">
                  Safety • Security • Punctuality
                </p>
              </div>
            </div>
          </div>

          {/* Booking Card with Better Styling */}
          <div className="bg-white/98 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-8 max-w-5xl border-2 border-blue-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">🎫</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">BOOK TICKET</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  From
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    📍
                  </span>
                  <input
                    type="text"
                    placeholder="Enter source station"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none bg-white"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  To
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    📍
                  </span>
                  <input
                    type="text"
                    placeholder="Enter destination station"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none bg-white"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    📅
                  </span>
                  <input
                    type="date"
                    defaultValue="2026-01-18"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none bg-white"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Class
                </label>
                <select className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none bg-white appearance-none cursor-pointer">
                  <option>All Classes</option>
                  <option>Sleeper (SL)</option>
                  <option>AC 3 Tier (3A)</option>
                  <option>AC 2 Tier (2A)</option>
                  <option>AC First Class (1A)</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-6 px-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 rounded border-2 border-gray-300"
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900">
                  Person With Disability Concession
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 rounded border-2 border-gray-300"
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900">
                  Flexible With Date
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 rounded border-2 border-gray-300"
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900">
                  Railway Pass Concession
                </span>
              </label>
            </div>

            <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-lg font-bold text-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]">
              Search Trains
            </button>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Our Services
            </h2>
            <p className="text-gray-600">
              Experience seamless travel and hospitality services
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              {
                name: "Flights",
                description: "Book domestic & international flights",
                iconBg: "bg-blue-50",
                iconColor: "text-blue-600",
                borderColor: "hover:border-blue-500",
                svg: (
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                ),
              },
              {
                name: "Hotels",
                description: "Comfortable stays nationwide",
                iconBg: "bg-purple-50",
                iconColor: "text-purple-600",
                borderColor: "hover:border-purple-500",
                svg: (
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                ),
              },
              {
                name: "Bus",
                description: "Intercity bus bookings",
                iconBg: "bg-green-50",
                iconColor: "text-green-600",
                borderColor: "hover:border-green-500",
                svg: (
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                    />
                  </svg>
                ),
              },
              {
                name: "E-Catering",
                description: "Order meals on train",
                iconBg: "bg-orange-50",
                iconColor: "text-orange-600",
                borderColor: "hover:border-orange-500",
                svg: (
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                ),
              },
              {
                name: "Tour Packages",
                description: "Curated holiday experiences",
                iconBg: "bg-red-50",
                iconColor: "text-red-600",
                borderColor: "hover:border-red-500",
                svg: (
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
              },
            ].map((service, index) => (
              <div
                key={index}
                className={`bg-white border-2 border-gray-200 ${service.borderColor} rounded-xl p-6 text-center cursor-pointer transition-all hover:shadow-xl group`}
              >
                <div
                  className={`${service.iconBg} ${service.iconColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                >
                  {service.svg}
                </div>
                <h3 className="font-bold text-gray-900 text-base mb-1">
                  {service.name}
                </h3>
                <p className="text-gray-500 text-xs">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Holidays Section */}
      <div className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Holiday Packages
            </h2>
            <p className="text-gray-600">
              Discover extraordinary journeys across India and beyond
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Maharajas' Express",
                description:
                  "Redefining Royalty, Luxury and Comfort. Experience the era of bygone stately splendour.",
                category: "Luxury Travel",
                bgGradient: "from-amber-50 to-orange-50",
                accentColor: "text-amber-700",
                borderColor: "border-amber-200 hover:border-amber-400",
              },
              {
                title: "International Packages",
                description:
                  "Best deals for Thailand, Dubai, Sri Lanka, Europe, USA, Australia and more destinations.",
                category: "Global Tours",
                bgGradient: "from-blue-50 to-indigo-50",
                accentColor: "text-blue-700",
                borderColor: "border-blue-200 hover:border-blue-400",
              },
              {
                title: "Domestic Air Packages",
                description:
                  "Discover India! Tirupati, Shirdi, Vaishno Devi, Ladakh, Himalayas and more spiritual destinations.",
                category: "Explore India",
                bgGradient: "from-green-50 to-emerald-50",
                accentColor: "text-green-700",
                borderColor: "border-green-200 hover:border-green-400",
              },
            ].map((holiday, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${holiday.bgGradient} border-2 ${holiday.borderColor} rounded-2xl p-7 hover:shadow-2xl transition-all cursor-pointer group overflow-hidden relative`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/30 rounded-full -mr-16 -mt-16"></div>
                <div className="relative">
                  <div
                    className={`inline-block ${holiday.accentColor} bg-white/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold mb-4`}
                  >
                    {holiday.category}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                    {holiday.title}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed mb-6">
                    {holiday.description}
                  </p>
                  <button className="flex items-center gap-2 text-orange-600 font-semibold text-sm hover:gap-3 transition-all group-hover:text-orange-700">
                    <span>Explore Details</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex flex-wrap justify-center gap-6 mb-6">
            <a href="#" className="hover:text-orange-500 transition-colors">
              About Us
            </a>
            <a href="#" className="hover:text-orange-500 transition-colors">
              Contact Us
            </a>
            <a href="#" className="hover:text-orange-500 transition-colors">
              Terms & Conditions
            </a>
            <a href="#" className="hover:text-orange-500 transition-colors">
              Privacy Policy
            </a>
          </div>
          <p className="text-sm text-gray-400">
            Copyright © 2026 - www.irctc.co.in. All Rights Reserved
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Designed and Hosted by CRIS
          </p>
        </div>
      </footer>

      {/* Floating Chat Widget */}
      <ChatWidget />
    </main>
  );
}
