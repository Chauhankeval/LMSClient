import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import RichTextEditor from "@/components/ui/RichTextEditor";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaTwitter, FaYoutube, FaLinkedin, FaFacebook } from "react-icons/fa";
import { Link, Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

import {
  useInstructorCreateCheckOutSessionMutation,
  useInstructorDetailsMutation,
} from "@/Features/api/authApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const TechDetails = () => {
  const [InstructorDetails, { data, isLoading, isSuccess, isError }] =
    useInstructorDetailsMutation();

  console.log("<<data", data);
  const [InstructorCreateCheckOutSession, { data: PaymetData }] =
    useInstructorCreateCheckOutSessionMutation();

  const handlePayment = async (amount) => {
    try {
      const response = await InstructorCreateCheckOutSession({
        amount,
      }).unwrap(); // Pass the amount to the API
      console.log("Response Data:", response);
    } catch (error) {
      console.error("Failed to initiate payment:", error);
      toast.error("Failed to initiate payment.");
    }
  };

  useEffect(() => {
    if (PaymetData?.InstructorData) {
      console.log("<<PaymetData", PaymetData);
      const { orderId, key, amount, currency } = PaymetData?.InstructorData;

      if (!orderId || !key || !amount || !currency) {
        toast.error("Invalid response from the server.");
        return;
      }

      const options = {
        key,
        amount,
        currency,
        name: "Your Company Name", // Replace with your business name
        description: "Subscription Payment",
        order_id: orderId,
        handler: function (response) {
          console.log("Payment Response:", response);
          toast.success("Payment successful!");
          window.location.href = successUrl; // Redirect after payment success
        },
        prefill: {
          name: "keval", // Replace with actual user data
          email: "kevalachuahna@gmail.com", // Replace with actual user data
        },
        theme: {
          color: "#f43f5e", // Custom modal color
        },
        modal: {
          ondismiss: function () {
            toast.warning("Payment cancelled.");
            window.location.href = cancelUrl; // Redirect after cancel
          },
        },
      };

      console.log("Razorpay Options:", options);

      // Initialize and open Razorpay modal
      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    }
  }, [PaymetData, isError]); // Trigger only on changes to `PaymetData` or `isError`

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    headline: "",
    biography: "",
    language: "",
    website: "",
    twitter: "",
    youtube: "",
    linkedin: "",
    facebook: "",
  });

  const navigate = useNavigate();
  const handleSubmitInstrucatorData = async () => {
    const reqObj = {
      formData,
    };
    await InstructorDetails(formData);
    navigate("/");
    console.log("<<cformdata", reqObj);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      console.log(updated);
      return updated;
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
    }
    if (isError) {
      toast.error("Failed To Update Your Data");
    }
  }, [isSuccess, isError]);

  return (
    <Tabs defaultValue="details" className="mt-10">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="Plans">Plans</TabsTrigger>
      </TabsList>
      <TabsContent value="details">
        <Card className="max-w-lg md:max-w-[80%] mx-auto my-10 p-6 border rounded-md shadow-lg">
          <CardHeader className="flex flex-row justify-between ">
            <div>
              <CardTitle>Basic Course Information</CardTitle>
              <CardDescription>
                Make changes to your courses here. Click save when you are done.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="flex gap-8">
            {/* Left Section */}
            <div className="space-y-4 mt-5 w-1/2">
              <div>
                <Label>First Name</Label>
                <Input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Ex. Fullstack Developer"
                />
              </div>
              <div>
                <Label>Last Name</Label>
                <Input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Ex. Become a Developer"
                />
              </div>
              <div>
                <Label>Headline</Label>
                <Input
                  type="text"
                  name="headline"
                  value={formData.headline}
                  onChange={handleChange}
                  placeholder="Ex. Become a Developer"
                />
              </div>
              <div>
                <Label>Biography</Label>
                <RichTextEditor
                  value={formData.biography}
                  onChange={(value) =>
                    handleChange({ target: { name: "biography", value } })
                  }
                />
              </div>
              <div>
                <Label>Language</Label>
                <Select
                  value={formData.language}
                  onValueChange={(value) =>
                    handleChange({ target: { name: "language", value } })
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Languages</SelectLabel>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="spanish">Spanish</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                      <SelectItem value="german">German</SelectItem>
                      <SelectItem value="chinese">Chinese</SelectItem>
                      <SelectItem value="japanese">Japanese</SelectItem>
                      <SelectItem value="hindi">Hindi</SelectItem>
                      <SelectItem value="russian">Russian</SelectItem>
                      <SelectItem value="portuguese">Portuguese</SelectItem>
                      <SelectItem value="arabic">Arabic</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Right Section */}
            <div className="space-y-4 mt-5 w-1/2">
              <div className="flex items-center gap-3">
                <Link size={20} className="text-blue-400" />
                <div className="w-full">
                  <Label>Website</Label>
                  <Input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="Enter your Website URL"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaTwitter size={20} className="text-blue-400" />
                <div className="w-full">
                  <Label>Twitter</Label>
                  <Input
                    type="text"
                    name="twitter"
                    value={formData.twitter}
                    onChange={handleChange}
                    placeholder="Enter your Twitter profile URL"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaYoutube size={20} className="text-red-500" />
                <div className="w-full">
                  <Label>YouTube</Label>
                  <Input
                    type="text"
                    name="youtube"
                    value={formData.youtube}
                    onChange={handleChange}
                    placeholder="Enter your YouTube channel URL"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaLinkedin size={20} className="text-blue-700" />
                <div className="w-full">
                  <Label>LinkedIn</Label>
                  <Input
                    type="text"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    placeholder="Enter your LinkedIn profile URL"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaFacebook size={20} className="text-blue-600" />
                <div className="w-full">
                  <Label>Facebook</Label>
                  <Input
                    type="text"
                    name="facebook"
                    value={formData.facebook}
                    onChange={handleChange}
                    placeholder="Enter your Facebook profile URL"
                  />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex gap-3 justify-end items-center">
                  <Button variant="outline">Cancel</Button>
                  <Button
                    disabled={isLoading}
                    onClick={handleSubmitInstrucatorData}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please Wait
                      </>
                    ) : (
                      "Update Your Profile"
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="Plans">
        <div className="max-w-lg md:max-w-[80%] mx-auto flex flex-col md:flex-row items-center justify-center gap-6 p-6">
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
              <p className="text-white text-sm">• $1000</p>
            </CardContent>
            <CardFooter>
              <button
                onClick={() => handlePayment(10)} // Pass amount for Basic Plan
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all duration-300"
              >
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
              <p className="text-white text-sm">• $3000</p>
            </CardContent>
            <CardFooter>
              <button
                onClick={() => handlePayment(30)} // Pass amount for Premium Plan
                className="w-full bg-yellow-500 text-white py-3 rounded-lg text-lg hover:bg-yellow-600 transition-all duration-300"
              >
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
              <p className="text-white text-sm">• $2000</p>
            </CardContent>
            <CardFooter>
              <button
                onClick={() => handlePayment(20)} // Pass amount for Pro Plan
                className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-all duration-300"
              >
                Choose Plan
              </button>
            </CardFooter>
          </Card>
        </div>
      </TabsContent>
      ;
    </Tabs>
  );
};

export default TechDetails;
