import React, { useState, useEffect } from "react";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Avatar } from "@radix-ui/react-avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import Course from "./Course";
import {
  useGetUserProfileQuery,
  useUpdateUserMutation,
} from "@/Features/api/authApi";
import { toast } from "sonner";
const Profile = () => {
  const { data, isLoading, error, refetch } = useGetUserProfileQuery();

  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [
    updateUser,
    { data: updateUserData, isLoading: updateUserIsLoading, isSuccess },
  ] = useUpdateUserMutation();
  console.log("<<data", updateUserData);

  const updateUserHandle = async () => {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("profilePhoto", profilePhoto);

    await updateUser(formData);
  };

  useEffect(() => {
    refetch();
  }, []);
  useEffect(() => {
    if (isSuccess && updateUserData) {
      refetch();
      toast.success(updateUserData.message || "Profile Updated", {
        closeButton: true, // Enables the close button
        autoClose: 5000, // Optional: Adjust the duration (in milliseconds)
      });
    }

    if (error) {
      toast.success(error?.message || "Updated Failed ", {
        closeButton: true, // Enables the close button
        autoClose: 5000, // Optional: Adjust the duration (in milliseconds)
      });
    }
  }, [error, updateUserData, isSuccess]);

  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    console.log(file);
    if (file) {
      setProfilePhoto(file);
    }
  };
  return (
    <>
      {isLoading ? (
        <ProfileSkeleton />
      ) : (
        <div className="max-w-4xl mx-auto px-4 my-20">
          <div className="flex flex-col md:flex-row items-center md:items-center gap-8 my-5">
            <div className="flex flex-col items-center">
              <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-4">
                <AvatarImage
                  src={data?.user?.photoUrl || "https://github.com/shadcn.png"}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <div className="mb-2">
                <h1 className="font-semibold text-gray-900 dark:text-gray-300 ml-2">
                  Name :{" "}
                  <span className="font-normal text-gray-700 dark:text-gray-300">
                    {data?.user?.name}
                  </span>
                </h1>
              </div>
              <div className="mb-2">
                <h1 className="font-semibold text-gray-900 dark:text-gray-300 ml-2">
                  Email :{" "}
                  <span className="font-normal text-gray-700 dark:text-gray-300">
                    {data?.user?.email}
                  </span>
                </h1>
              </div>
              <div className="mb-2">
                <h1 className="font-semibold text-gray-900 dark:text-gray-300 ml-2">
                  Role :{" "}
                  <span className="font-normal text-gray-700 dark:text-gray-300">
                    {data?.user?.role}
                  </span>
                </h1>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="mt-2">
                    Edit Profile
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>
                      Make changes to your profile here. Click save when you're
                      done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label>Name</Label>
                      <Input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label>Profile Picture</Label>
                      <Input
                        type="file"
                        accept="image/*"
                        className="col-span-3"
                        onChange={(e) => onChangeHandler(e)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      onClick={updateUserHandle}
                      disabled={updateUserIsLoading}
                    >
                      {updateUserIsLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div>
            <h1>Enrolled Courses</h1>
            <div className="flex gap-6">
              {data?.user?.enrolledCourses?.length === 0 ? (
                <h1>You haven't enrolled in any courses yet</h1>
              ) : (
                data?.user?.enrolledCorses?.map((course) => (
                  <Course course={course} key={course?._id} />
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;

const ProfileSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 my-24">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center md:items-center gap-8 my-5">
        {/* Avatar Section */}
        <div className="flex flex-col items-center">
          <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-4">
            <AvatarImage src="" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>

        {/* Profile Details Section */}
        <div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-300 ml-2">
              Name :{" "}
              <span className="font-normal text-gray-700 dark:text-gray-300">
                ------------
              </span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-300 ml-2">
              Email :{" "}
              <span className="font-normal text-gray-700 dark:text-gray-300">
                ---------------------
              </span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-300 ml-2">
              Role :{" "}
              <span className="font-normal text-gray-700 dark:text-gray-300">
                ----------
              </span>
            </h1>
          </div>
        </div>
      </div>

      {/* Enrolled Courses Section */}
      <div>
        <h1 className="font-bold text-xl mb-4 ">Enrolled Courses</h1>
        <div className="flex gap-6">
          <div className="h-40 w-full bg-gray-200 rounded animate-pulse"></div>
          <div className="h-40 w-full bg-gray-200 rounded animate-pulse"></div>
          <div className="h-40 w-full bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};
