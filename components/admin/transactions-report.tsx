"use client"

import { Button } from "@/components/ui/button"
import { Download, Filter } from "lucide-react"

export function TransactionsReport() {
  return (
    <div className="p-6 space-y-6 bg-white min-h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Transactions</h1>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="border-gray-300 bg-transparent">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" className="border-gray-300 bg-transparent">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="grid grid-cols-5 gap-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
            <div>TRANSACTION ID</div>
            <div>DATE</div>
            <div>PAYMENT METHOD</div>
            <div>ORDER SERIAL NO</div>
            <div>AMOUNT</div>
          </div>
        </div>

        <div className="px-6 py-16 text-center">
          <div className="flex flex-col items-center justify-center">
            <div className="w-32 h-32 mb-6">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <rect x="40" y="80" width="120" height="80" rx="8" fill="#E5E7EB" />
                <rect x="50" y="90" width="100" height="60" rx="4" fill="#F3F4F6" />
                <circle cx="100" cy="120" r="8" fill="#9CA3AF" />
                <circle cx="85" cy="115" r="2" fill="#6B7280" />
                <circle cx="115" cy="115" r="2" fill="#6B7280" />
                <path d="M90 130 Q100 140 110 130" stroke="#6B7280" strokeWidth="2" fill="none" />
                <rect x="70" y="40" width="60" height="40" rx="4" fill="#DBEAFE" />
                <rect x="75" y="45" width="50" height="30" rx="2" fill="#BFDBFE" />
                <circle cx="100" cy="60" r="8" fill="#93C5FD" />
                <path d="M85 50 L100 35 L115 50" stroke="#3B82F6" strokeWidth="2" fill="none" />
              </svg>
            </div>
            <p className="text-gray-500 text-lg">No data available.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
