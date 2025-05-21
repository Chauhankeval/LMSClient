import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/Features/api/authApi";
import bgvideo from "../assets/bg.mp4"; // Adjust path as needed
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "@/components/ui/Navbar";

// biBkUH7WTS4M9nC1
const Login = () => {
  const navigate = useNavigate();
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
    number : ""
  });
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });

  const handleChange = (e, type) => {
    const { name, value } = e.target;

    if (type == "signup") {
      setSignupInput({ ...signupInput, [name]: value });
    }

    if (type == "login") {
      setLoginInput({
        ...loginInput,
        [name]: value,
      });
    }
  };

  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();
  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterUserMutation();

  const handleRegistration = async (type) => {
    console.log(type, "type");
    const inputData = type === "signup" ? signupInput : loginInput;

    const action = type === "signup" ? registerUser : loginUser;

    await action(inputData);
  };

  useEffect(() => {
    if (registerIsSuccess && registerData) {
      toast.success(registerData?.message || "SignUp Successfully", {
        closeButton: true, // Enables the close button
        autoClose: 5000, // Optional: Adjust the duration (in milliseconds)
      });
    }

    if (registerError) {
      toast.success(registerError?.data?.message || "SignUp Failed ", {
        closeButton: true, // Enables the close button
        autoClose: 5000, // Optional: Adjust the duration (in milliseconds)
      });
    }

    if (loginIsSuccess && loginData) {
      toast.success(loginData?.message || "login SuccessFully ", {
        closeButton: true, // Enables the close button
        autoClose: 5000, // Optional: Adjust the duration (in milliseconds)
      });
      navigate("/");
    }

    if (loginError) {
      toast.success(loginError?.data?.message || "login Failed ", {
        closeButton: true, // Enables the close button
        autoClose: 5000, // Optional: Adjust the duration (in milliseconds)
      });
    }
  }, [
    registerIsLoading,
    loginIsLoading,
    loginData,
    registerData,
    loginError,
    registerError,
  ]);

  return (
    <div className="relative overflow-hidden">
      <Navbar />
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover opacity-90"
        autoPlay
        loop
        muted
      >
        <source src={bgvideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay Content */}
      <div className="relative h-screen z-10 flex items-center justify-center mt-3 text-white">
        <Tabs defaultValue="login" className="w-[400px]">
          {/* Tabs List */}
          <TabsList className="grid w-full grid-cols-2 bg-white bg-opacity-10 backdrop-blur-md rounded-lg">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          {/* Login Tab */}
          <TabsContent value="login">
            <Card className="bg-white bg-opacity-10 backdrop-blur-md border border-white/10 shadow-lg">
              <CardHeader>
                <CardTitle className="text-white ">Login</CardTitle>
                <CardDescription className="text-white ">
                  Enter your email and password to log in.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="email" className="text-white">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    onChange={(e) => handleChange(e, "login")}
                    value={loginInput?.email}
                    className="bg-transparent text-white"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password" className="text-white">
                    Password
                  </Label>
                  <Input
                    onChange={(e) => handleChange(e, "login")}
                    id="password"
                    type="password"
                    name="password"
                    value={loginInput?.password}
                    placeholder="Enter your password"
                    className="bg-transparent text-white"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  disabled={loginIsLoading}
                  onClick={() => handleRegistration("login")}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  {loginIsLoading ? (
                    <Loader2 className="mr-3 h-4 w-4 animate-spin" />
                  ) : (
                    "Login"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Signup Tab */}
          <TabsContent value="signup">
            <Card className="bg-white bg-opacity-10 backdrop-blur-md border border-white/10 shadow-lg">
              <CardHeader>
                <CardTitle className="text-white ">Sign Up</CardTitle>
                <CardDescription className="text-white">
                  Create a new account by filling out the form below.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name" className="text-white">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    value={signupInput?.name}
                    onChange={(e) => handleChange(e, "signup")}
                    className="bg-transparent text-white"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email" className="text-white">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={signupInput?.email}
                    placeholder="Enter your email"
                    onChange={(e) => handleChange(e, "signup")}
                    className="bg-transparent text-white"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email" className="text-white">
                    Mo. Number
                  </Label>
                  <Input
                    id="number"
                    name="number"
                    type="number"
                    value={signupInput?.number}
                    placeholder="Enter your number"
                    onChange={(e) => handleChange(e, "signup")}
                    className="bg-transparent text-white"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password" className="text-white">
                    Password
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    value={signupInput?.password}
                    onChange={(e) => handleChange(e, "signup")}
                    type="password"
                    placeholder="Enter your password"
                    className="bg-transparent text-white"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  disabled={registerIsLoading}
                  onClick={() => handleRegistration("signup")}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  {registerIsLoading ? (
                    <Loader2 className="mr-3 h-4 w-4 animate-spin" />
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Login;
