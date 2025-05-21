import { Card } from "@/components/ui/card";
import React from "react";

const AdvertWidget = () => {
  return (
    <div>
      {" "}
      <Card className="p-4 space-y-3 border rounded-lg shadow-sm">
        {/* Header */}
        <div>
          <h5 className="text-lg font-semibold text-gray-500">Sponsored</h5>
        </div>

        {/* Image */}
        <img
          src="https://tse2.mm.bing.net/th?id=OIP.ZVpYsEg7j4L3SEVek9V7bwHaEh&pid=Api&P=0&h=180"
          alt="advert"
          className="w-full rounded-lg mt-2"
        />

        {/* Brand Info */}
        <div>
          <p className="text-md font-semibold text-gray-900">MikaCosmetics</p>
          <p className="text-sm text-gray-500">mikacosmetics.com</p>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600">
          Your pathway to stunning and immaculate beauty. Ensure your skin is
          exfoliated and shining like light.
        </p>
      </Card>
    </div>
  );
};

export default AdvertWidget;
