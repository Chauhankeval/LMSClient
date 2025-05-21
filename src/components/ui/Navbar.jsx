import React, { useEffect, useState } from "react";

import { Menu, MessageCircle, School, Store, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DarkMode from "@/DarkMode";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import { Separator } from "@radix-ui/react-dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/Features/api/authApi";
import { useSelector } from "react-redux";
import MessageLogo2 from "../../assets/MessageLogo2.png";
import Logo from "./Logo";
import Partner from "../../assets/partner shaking hands.jpg";

import ChatComponent from "@/pages/ChatApp/ChatComponent";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Drower from "@/pages/student/Drower";
const Navbar = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((store) => store.auth);

  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();

  const HandleLogout = async () => {
    try {
      console.log("<<<HandleLogout Called");

      const response = await logoutUser().unwrap(); // Unwraps the response for error handling
      console.log("Logout Response:", response);

      if (isSuccess) {
        console.log("Logout Successful");
        navigate("login");
      }
    } catch (err) {
      console.error("Error during logout:", err.message || err);
    }
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "Logout SuccessFully", {
        closeButton: true, // Enables the close button
        autoClose: 5000, // Optional: Adjust the duration (in milliseconds)
      });
      navigate("/login");
    }
  }, [isSuccess]);

  const [open, setOpen] = useState();
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div className="h-20 dark:bg-[#0a0a0a] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-20">
      {/* DeskTop  */}
      <div className=" mx-auto hidden md:flex items-center justify-between ml-10 mr-10 gap-10 mt-4">
        <div className="flex justify-between items-center gap-2">
          <Logo className="w-10 h-10 ml-20" />

          <h1 className="md:block font-extrabold text-2xl">
            <Link to={"/"}>- Learning</Link>
          </h1>
        </div>

        {/* user icon and dark mode icon  */}
        <div className="flex justify-center items-center gap-2">
          {user ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src={user?.photoUrl} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link to="/mylearn">
                    {" "}
                    <DropdownMenuItem>My Learning</DropdownMenuItem>
                  </Link>

                  <DropdownMenuItem>
                    <Link to={"/profile"}>Edit Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <button onClick={HandleLogout}>Logout</button>
                  </DropdownMenuItem>

                  {user?.role === "instructor" && (
                    <>
                      <DropdownMenuSeparator />

                      <Link to={"/admin/dashboard"}>
                        <DropdownMenuItem>DashBord</DropdownMenuItem>
                      </Link>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
              {user?.role === "student" ? (
                <NavigationMenu>
                  <NavigationMenuList>
                    {" "}
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>
                        {" "}
                        <Link to={"/tech"}>Tech On M-Learning</Link>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid gap-3 p-4 md:w-[400px] lg:w-[400px] lg:grid-cols-[.75fr_1fr] ">
                          <div className="row-span-3">
                            <NavigationMenuLink asChild>
                              <div className="flex h-full w-full select-none flex-col justify-center">
                                <img
                                  src="/src/assets/partner%20shaking%20hands.jpg"
                                  alt="Partner shaking hands"
                                  className="w-40 h-45 object-cover rounded-md"
                                />
                              </div>
                            </NavigationMenuLink>
                          </div>
                          <div>
                            <div className="mb-2 mt-4 text-lg font-medium">
                              Become an Instructor or Partner
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Join our M-learning platform and share your
                              knowledge with students worldwide. As an
                              instructor, create and sell courses. As a partner,
                              collaborate to grow the platform.
                            </p>
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              ) : (
                ""
              )}
              <div className="flex items-center gap-2 border border-gray-300 rounded-full p-1 px-3 shadow-md">
                <Logo className="w-5 h-5" />
                <p className="text-lg font-semibold">{user?.coin}</p>
              </div>

              {/* ChatModel   */}
              <div>
                {/* Floating Chat Button */}
                <button
                  onClick={() => setOpen(true)}
                  className="fixed bottom-6 right-6 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition"
                >
                  <MessageCircle className="w-8 h-8" />
                </button>

                {/* Custom Modal at Bottom Right */}
                {open && (
                  <div className="fixed bottom-6 right-6 w-96 max-h-[80vh] bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden">
                    {/* Modal Header */}
                    <div className="flex justify-between items-center p-3 bg-gray-100 border-b">
                      <h2 className="text-lg font-semibold">Chat</h2>
                      <button
                        onClick={() => setOpen(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Chat Content */}
                    <div className="fixed bottom-6 right-6 bg-black rounded-lg shadow-lg">
                      <ChatComponent onClose={() => setOpen(false)} />
                    </div>
                  </div>
                )}
              </div>
              <Link to="/m-sync">
                <button className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted transition">
                  <img
                    src={MessageLogo2}
                    alt="Sync Icon"
                    className="h-6 w-6 object-contain"
                  />
                  <span className="text-sm font-medium">Sync</span>
                </button>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button onClick={() => navigate("/login")}>SignUp</Button>
            </div>
          )}
          <DarkMode />

          <div className="flex justify-center items-end">
            <Drower />
          </div>
        </div>
      </div>
      {/* Mobile  */}

      <div className="md:hidden flex items-center justify-between px-4 h-full  ">
        <div className="flex items-center gap-2">
          <Logo className="w-10 h-10" />

          <h1 className="text-2xl font-extrabold">- Learning</h1>
        </div>
        <MobileNavBar />
      </div>
    </div>
  );
};

const MobileNavBar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);

  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const [open, setOpen] = useState();

  const HandleLogout = async () => {
    try {
      console.log("<<<HandleLogout Called");

      const response = await logoutUser().unwrap(); // Unwraps the response for error handling
      console.log("Logout Response:", response);

      if (isSuccess) {
        console.log("Logout Successful");
        navigate("login");
      }
    } catch (err) {
      console.error("Error during logout:", err.message || err);
    }
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "Logout SuccessFully", {
        closeButton: true, // Enables the close button
        autoClose: 5000, // Optional: Adjust the duration (in milliseconds)
      });
      navigate("/login");
    }
  }, [isSuccess]);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="rounded-full  hover:bg-gray-200"
          variant="outline"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="flex flex-row justify-between mt-2">
          <SheetTitle>
            <Link to="/" className="flex items-center gap-2">
              <Logo className="w-8 h-8" />

              <h1>- Learning</h1>
            </Link>
          </SheetTitle>
          <DarkMode />
        </SheetHeader>
        <Separator className="mr-2" />
        <nav className="flex flex-col space-y-4">
          <div className="flex items-center gap-2 border border-gray-300 rounded-full p-1 px-3 shadow-md">
            <Logo className="w-5 h-5" />
            <p className="text-lg font-semibold">{user?.coin}</p>
          </div>
          <div>
            {/* Floating Chat Button */}
            <button
              onClick={() => setOpen(true)}
              className="fixed bottom-6 right-6 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition"
            >
              <MessageCircle className="w-8 h-8" />
            </button>

            {/* Custom Modal at Bottom Right */}
            {open && (
              <div className="fixed bottom-6 right-6 w-96 max-h-[80vh] bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden">
                {/* Modal Header */}
                <div className="flex justify-between items-center p-3 bg-gray-100 border-b">
                  <h2 className="text-lg font-semibold">Chat</h2>
                  <button
                    onClick={() => setOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Chat Content */}
                <div className="p-4 h-[400px] overflow-auto">
                  <ChatComponent />
                </div>
              </div>
            )}
          </div>
          <Link to={"/mylearn"}>
            <span>My Learning</span>
          </Link>
          <Link to={"/profile"}>
            <span>Edit Profile</span>
          </Link>
          <p onClick={HandleLogout}>Log out</p>
        </nav>

        {user?.role === "instructor" && (
          <SheetFooter>
            <SheetClose asChild>
              <Link to={"/admin/dashboard"} className="w-full">
                <Button className="w-full" type="submit">
                  DashBord
                </Button>
              </Link>
            </SheetClose>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Navbar;
