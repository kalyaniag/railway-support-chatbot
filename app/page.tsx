'use client';

import ChatWidget from '@/components/chat/ChatWidget';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* IRCTC Header */}
      <header className="bg-gradient-to-r from-blue-700 to-indigo-700 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-blue-700 text-xl font-bold">IR</span>
            </div>
            <div className="hidden md:block">
              <h1 className="text-white font-semibold text-lg">Indian Railways</h1>
              <p className="text-blue-100 text-xs">Safety • Security • Punctuality</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="http://www.indianrail.gov.in/enquiry/PNR/PnrEnquiry.html" target="_blank" rel="noopener noreferrer" className="text-white text-sm hover:text-blue-100 transition-colors hidden sm:inline">
              PNR Status
            </a>
            <a href="https://www.irctc.co.in/online-charts/" target="_blank" rel="noopener noreferrer" className="text-white text-sm hover:text-blue-100 transition-colors hidden sm:inline">
              Reservation Chart
            </a>
            <button className="bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-50 transition-colors shadow-sm">
              LOGIN
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section with Booking Form */}
      <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 py-12 md:py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.05) 10px, rgba(255,255,255,.05) 20px)',
          }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          {/* Indian Railways Badge */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
              <span className="text-2xl">🚂</span>
              <div className="text-left">
                <h1 className="text-white font-bold text-lg">INDIAN RAILWAYS</h1>
                <p className="text-blue-200 text-xs">Safety • Security • Punctuality</p>
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 max-w-4xl mx-auto border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Book Train Tickets</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
                <input 
                  type="text" 
                  placeholder="Enter source station"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none bg-gray-50"
                />
              </div>
              
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                <input 
                  type="text" 
                  placeholder="Enter destination station"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none bg-gray-50"
                />
              </div>
              
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input 
                  type="date" 
                  defaultValue="2026-01-17"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none bg-gray-50"
                />
              </div>
              
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
                <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none bg-gray-50">
                  <option>All Classes</option>
                  <option>Sleeper (SL)</option>
                  <option>AC 3 Tier (3A)</option>
                  <option>AC 2 Tier (2A)</option>
                  <option>AC First Class (1A)</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                <span className="text-sm text-gray-600">Person With Disability Concession</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                <span className="text-sm text-gray-600">Flexible With Date</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                <span className="text-sm text-gray-600">Railway Pass Concession</span>
              </label>
            </div>

            <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg">
              Search Trains
            </button>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">
            Our Services
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { icon: '✈️', name: 'Flight', color: 'from-blue-500 to-blue-600' },
              { icon: '🏨', name: 'Hotels', color: 'from-purple-500 to-purple-600' },
              { icon: '🚌', name: 'Bus', color: 'from-green-500 to-green-600' },
              { icon: '🍽️', name: 'E-Catering', color: 'from-red-500 to-red-600' },
              { icon: '🎄', name: 'Holiday Packages', color: 'from-orange-500 to-orange-600' },
            ].map((service, index) => (
              <div key={index} className={`bg-gradient-to-br ${service.color} p-6 rounded-xl text-center text-white cursor-pointer hover:scale-105 transition-transform shadow-lg`}>
                <div className="text-4xl mb-3">{service.icon}</div>
                <h3 className="font-bold text-sm">{service.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Holidays Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">HOLIDAYS</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                title: "Maharajas' Express", 
                description: "Redefining Royalty, Luxury and Comfort. Experience the era of bygone stately splendour.",
                icon: '👑'
              },
              { 
                title: "International Packages", 
                description: "Best deals for Thailand, Dubai, Sri Lanka, Europe, USA, Australia etc.",
                icon: '🌍'
              },
              { 
                title: "Domestic Air Packages", 
                description: "Discover India! Tirupati, Shirdi, Vaishno Devi, Ladakh, Himalayas and more.",
                icon: '🏔️'
              },
            ].map((holiday, index) => (
              <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-orange-500 hover:shadow-lg transition-all cursor-pointer">
                <div className="text-5xl mb-4">{holiday.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{holiday.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{holiday.description}</p>
                <button className="text-orange-600 font-semibold text-sm hover:text-orange-700">
                  Read More →
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex flex-wrap justify-center gap-6 mb-6">
            <a href="#" className="hover:text-orange-500 transition-colors">About Us</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Contact Us</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Terms & Conditions</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Privacy Policy</a>
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
