import React, { useEffect } from "react";
import Logo from "./Logo";
import { useGetUserProfileQuery } from "@/Features/api/authApi";
import { useCreateCheckOutSessionCoinMutation } from "@/Features/api/purchaseApi";
import { toast } from "sonner";

const SpecialPrice = ({ course }) => {
  const { data: userData, refetch } = useGetUserProfileQuery();

  const [createCheckOutSessionCoin, { data, isLoading, isError, error }] =
    useCreateCheckOutSessionCoinMutation();

  console.log("<<<data", data);
  const handlePayment = async () => {
    console.log("<<handlePaymentcalled");
    try {
      const response = await createCheckOutSessionCoin({
        courseId: course._id,
        requiredCoins: course?.requiredCoins,
        earnCoins: course?.earnCoins,
      }).unwrap();

      console.log("<<<response", response);
      if (response.success) {
        // If fully paid with coins, no need for Razorpay
        if (response.amount === 0) {
          await refetch(); // Refresh user profile to update coin balance
          return;
        }

        console.log("Response Data:", response);
      } else {
        toast.error(response.message || "Failed to complete payment.");
      }
    } catch (error) {
      console.error("Failed to initiate payment:", error);
      toast.error(error.data?.message || "Failed to initiate payment.");
    }
  };

  useEffect(() => {
    if (data) {
      const {
        orderId,
        key,
        amount,
        currency,
        name,
        description,
        image,
        successUrl,
        cancelUrl,
        number,
      } = data;

      if (!orderId) {
        toast.error("Invalid response from the server.");
        return;
      }

      const options = {
        key,
        amount,
        currency,
        name,
        description,
        image,
        number,
        order_id: orderId,
        handler: (response) => {
          console.log("Payment Response:", response);
          toast.success("Payment successful!");
          window.location.href = successUrl;
        },
        prefill: {
          name: userData?.user?.name,
          email: userData?.user?.email,
          contact: userData?.user?.number,
        },
        theme: { color: "#f43f5e" },
        modal: {
          ondismiss: () => {
            toast.warning("Payment cancelled.");
            window.location.href = cancelUrl;
          },
        },
      };

      console.log("Razorpay Options:", options);
      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    }

    if (isError) {
      toast.error(error?.data?.message || "Failed to create checkout session.");
    }
  }, [data, isError, error]);

  return (
    <button className="w-full" onClick={handlePayment} disabled={isLoading}>
      {/* Special Price Section */}
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-white p-3 rounded-xl flex justify-between items-center">
        <div className="flex items-center space-x-2 text-lg font-semibold">
          <span>₹{course?.specialPrice}</span>+
          <span className="flex items-center bg-red-600 text-white px-2 py-1 rounded-full mx-2 text-sm gap-1">
            <Logo className="w-5 h-5" />
            <p className="text-sm font-semibold">{course?.requiredCoins}</p>
          </span>
        </div>
        <div>
          <Logo className="w-8 h-8" />
        </div>
      </div>

      {/* Earnings Section */}
      <div className="bg-gradient-to-r from-green-500 to-black text-white p-1 mt-2 rounded-xl flex justify-center items-center">
        <span>You earn</span>
        <span className="flex items-center bg-red-600 text-white px-2 py-1 rounded-full mx-2 text-sm gap-1">
          <Logo className="w-5 h-5" />
          <p className="text-sm font-semibold">{course?.earnCoins}</p>
        </span>
        <span>on this product</span>
      </div>
    </button>
  );
};

export default SpecialPrice;
