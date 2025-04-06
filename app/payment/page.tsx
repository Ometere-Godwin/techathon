"use client";

import React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";

export default function PaymentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left side - Image */}
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src="/payment-image.jpg" // You'll need to add this image to your public folder
              alt="Payment illustration"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Right side - Bank Details */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-purple-900">Payment Details</h1>
            <p className="text-gray-600 mb-8">
              Please make your payment to either of the following bank accounts:
            </p>

            {/* Bank Account Cards */}
            <div className="space-y-4">
              <Card className="p-6 border-2 border-purple-100">
                <h2 className="text-xl font-semibold text-purple-900 mb-4">United Bank for Africa</h2>
                <div className="space-y-2">
                  <p className="flex justify-between">
                    <span className="text-gray-600">Account Name:</span>
                    <span className="font-medium">TECHEDU SKILLUP LIMITED</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600">Account Number:</span>
                    <span className="font-medium">1028114830</span>
                  </p>
                </div>
              </Card>

              <Card className="p-6 border-2 border-purple-100">
                <h2 className="text-xl font-semibold text-purple-900 mb-4">United Bank for Africa</h2>
                <div className="space-y-2">
                  <p className="flex justify-between">
                    <span className="text-gray-600">Account Name:</span>
                    <span className="font-medium">TECHEDU SKILLUP LIMITED</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600">Account Number:</span>
                    <span className="font-medium">3004771006</span>
                  </p>
                </div>
              </Card>
            </div>

            {/* Payment Instructions */}
            <div className="mt-8 p-4 bg-purple-50 rounded-lg">
              <h3 className="text-sm font-semibold text-purple-900 mb-2">Important Note:</h3>
              <p className="text-sm text-gray-600">
                After making the payment, please save your payment receipt and send it to this phone number: 08137627522. You will need it for verification.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}