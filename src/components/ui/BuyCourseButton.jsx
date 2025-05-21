import React, { useEffect } from "react";
import { Button } from "./button";
import { toast } from "sonner";

import { useCreateCheckOutSessionMutation } from "@/Features/api/purchaseApi";
import { Loader2 } from "lucide-react";
import { useGetUserProfileQuery } from "@/Features/api/authApi";

const BuyCourseButton = ({ course }) => {
  const { data: userData, refetch } = useGetUserProfileQuery();

  const [
    createCheckOutSession,
    { data, isLoading, isSuccess, isError, error },
  ] = useCreateCheckOutSessionMutation();

  console.log("<<<data", data);

  const handlePayment = async () => {
    try {
      const response = await createCheckOutSession({
        courseId: course._id,
        
        earnCoins: course?.earnCoins,
      }).unwrap(); // Use .unwrap() to get the payload
      console.log("Response Data:", response);
    } catch (error) {
      console.error("Failed to initiate payment:", error);
      toast.error("Failed to initiate payment.");
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

      if (!orderId || !key) {
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
    <Button
      disabled={isLoading}
      onClick={handlePayment}
      className="bg-gradient-to-r from-yellow-500 to-red-600 text-white w-full"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please Wait...
        </>
      ) : (
        <>
          <p>Purchase Course </p>
        </>
      )}
    </Button>
  );
};

export default BuyCourseButton;
