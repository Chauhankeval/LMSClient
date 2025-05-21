import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

const Premium = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-6 p-6">
      {/* Left Small Card */}
      <Card className="w-full md:w-1/3 bg-gray-800 bg-opacity-80 border border-white/10 shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:border-white">
        <CardHeader>
          <CardTitle className="text-white text-lg">Basic Plan</CardTitle>
          <CardDescription className="text-white">
            Access basic features.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-white text-sm">• Limited features</p>
          <p className="text-white text-sm">• 5 GB Storage</p>
        </CardContent>
        <CardFooter>
          <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all duration-300">
            Choose Plan
          </button>
        </CardFooter>
      </Card>

      {/* Middle Large Card */}
      <Card className="w-full md:w-2/3 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 shadow-xl text-white transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Premium Plan</CardTitle>
          <CardDescription className="text-lg">
            Unlock all premium features and benefits!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-white text-lg">• Unlimited features</p>
          <p className="text-white text-lg">• 1 TB Storage</p>
          <p className="text-white text-lg">• Priority Support</p>
        </CardContent>
        <CardFooter>
          <button className="w-full bg-yellow-500 text-white py-3 rounded-lg text-lg hover:bg-yellow-600 transition-all duration-300">
            Go Premium
          </button>
        </CardFooter>
      </Card>

      {/* Right Small Card */}
      <Card className="w-full md:w-1/3 bg-gray-800 bg-opacity-80 border border-white/10 shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:border-white">
        <CardHeader>
          <CardTitle className="text-white text-lg">Pro Plan</CardTitle>
          <CardDescription className="text-white">
            Advanced tools for professionals.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-white text-sm">• Advanced features</p>
          <p className="text-white text-sm">• 500 GB Storage</p>
        </CardContent>
        <CardFooter>
          <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-all duration-300">
            Choose Plan
          </button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Premium;
