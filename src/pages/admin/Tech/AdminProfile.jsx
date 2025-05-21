import React from "react";
import { useParams } from "react-router-dom";
import { useGetAdminProfileQuery } from "@/Features/api/authApi";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Avatar } from "@radix-ui/react-avatar";

import {
  FaTwitter,
  FaYoutube,
  FaLinkedin,
  FaFacebook,
  FaBook,
} from "react-icons/fa";
import { FaEnvelope, FaGlobe, FaLanguage, FaUserTie } from "react-icons/fa";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import Course from "@/pages/student/Course";

const AdminProfile = () => {
  const { userId } = useParams(); // Get userId from URL params

  const { data, isLoading, error } = useGetAdminProfileQuery(userId); // Fetch admin profile

  //   if (isLoading) return <ProfileSkeleton />;
  if (error) return <p className="text-red-500">Error loading profile</p>;

  console.log("<<data", data);


  return (
    <div className="max-w-4xl mx-auto px-4 my-20 gap-4 flex flex-col">
      <Card>
        <CardHeader className="flex flex-row justify-between">
          <div>
            <CardTitle>Information About Profeser</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center gap-8 my-5">
            <Avatar className="h-24 w-24 md:h-40 md:w-40 mb-4 flex justify-between shadow-lg">
              {" "}
              <AvatarImage
                src={data?.user?.photoUrl || "https://github.com/shadcn.png"}
              />
              <AvatarFallback>
                {data?.user?.name?.charAt(0) || "A"}
              </AvatarFallback>
            </Avatar>

            <div className="flex">
              {data?.user?.instructorData?.map((item, index) => (
                <div key={index} className="p-4 shadow-lg rounded-sm">
                  <div>
                    <div key={index} className="p-4 ">
                      <div className="flex flex-col md:flex-row gap-5">
                        <div className="flex flex-col gap-4">
                          <div className="flex items-center gap-2">
                            <FaUserTie className="text-gray-700 dark:text-gray-300" />
                            <h1 className="font-semibold text-gray-900 dark:text-gray-300">
                              Name:{" "}
                              <span className="font-normal">
                                {item?.firstName || "N/A"}
                              </span>
                            </h1>
                          </div>

                          <div className="flex items-center gap-2">
                            <FaEnvelope className="text-red-500" />
                            <h1 className="font-semibold text-gray-900 dark:text-gray-300">
                              Email:{" "}
                              <a
                                href={`mailto:${data?.user?.email}`}
                                className="font-normal text-blue-500 underline"
                              >
                                {data?.user?.email || "N/A"}
                              </a>
                            </h1>
                          </div>

                          <div className="flex items-center gap-2">
                            <FaUserTie className="text-gray-700 dark:text-gray-300" />
                            <h1 className="font-semibold text-gray-900 dark:text-gray-300">
                              Role:{" "}
                              <span className="font-normal">
                                {data?.user?.role || "N/A"}
                              </span>
                            </h1>
                          </div>
                        </div>

                        <div className="flex flex-col gap-4">
                          <div className="flex items-center gap-2">
                            <FaGlobe className="text-green-600" />
                            <h1 className="font-semibold text-gray-900 dark:text-gray-300">
                              Headline:{" "}
                              <span className="font-normal">
                                {item?.headline || "N/A"}
                              </span>
                            </h1>
                          </div>

                          <div className="flex items-center gap-2">
                            <FaLanguage className="text-indigo-500" />
                            <h1 className="font-semibold text-gray-900 dark:text-gray-300">
                              Language:{" "}
                              <span className="font-normal">
                                {item?.language || "N/A"}
                              </span>
                            </h1>
                          </div>

                          <div className="flex items-start gap-2">
                            <FaBook className="text-yellow-500 mt-1" />
                            <h1 className="font-semibold text-gray-900 dark:text-gray-300">
                              Bio:{" "}
                              <span className="font-normal">
                                {item?.biography
                                  ? item.biography
                                  : "No biography available"}
                              </span>
                            </h1>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Social Links with Icons */}
                    <div className="flex gap-3 mt-3">
                      {item?.twitter && (
                        <Button variant="ghost" size="icon" asChild>
                          <a
                            href={item.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaTwitter className="text-blue-500 text-xl" />
                          </a>
                        </Button>
                      )}
                      {item?.youtube && (
                        <Button variant="ghost" size="icon" asChild>
                          <a
                            href={item.youtube}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaYoutube className="text-red-500 text-xl" />
                          </a>
                        </Button>
                      )}
                      {item?.linkedin && (
                        <Button variant="ghost" size="icon" asChild>
                          <a
                            href={item.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaLinkedin className="text-blue-700 text-xl" />
                          </a>
                        </Button>
                      )}
                      {item?.facebook && (
                        <Button variant="ghost" size="icon" asChild>
                          <a
                            href={item.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaFacebook className="text-blue-600 text-xl" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row justify-between">
          <div>
            <CardTitle>Enrolled Courses</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-6">
            {data?.user?.enrolledCourses?.length === 0 ? (
              <h1>You haven't enrolled in any courses yet</h1>
            ) : (
              data?.user?.enrolledCorses?.map((course) => (
                <Course course={course} key={course?._id} />
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminProfile;
