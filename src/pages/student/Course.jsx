import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Badge } from "@/components/ui/badge";

import React from "react";
import { Link } from "react-router-dom";
import Logo from "@/components/ui/Logo";

const Course = ({ course }) => {
  return (
    <Link to={`/coursedetails/${course?._id}`}>
      <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
        <div className="relative">
          <img
            alt="Course Thumbnail"
            className="w-full h-36 object-cover rounded-t-lg"
            src={
              course?.courseThumbnail || // Use course thumbnail if available
              "https://via.placeholder.com/150" // Fallback thumbnail
            }
          />
        </div>

        <CardContent className="px-5 py-4 space-y-1">
          <Link to={`/coursedetails/${course?._id}`}>
            <h1 className="hover:underline font-bold text-lg truncate">
              {course?.courseTitle || "Untitled Course"}
            </h1>
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={
                    course?.creator?.photoUrl || // Creator photo if available
                    "https://via.placeholder.com/40" // Fallback avatar
                  }
                />
                <AvatarFallback>
                  {course?.creator?.name?.[0]?.toUpperCase()}
                </AvatarFallback>{" "}
                {/* First letter of creator name */}
              </Avatar>
              <h1>{course?.creator?.name || "Unknown Creator"}</h1>
            </div>
            <Badge
              className={
                "bg-blue-500 text-white px-2 py-1 text-xs rounded-full"
              }
              variant="outline"
            >
              {course?.courseLevel || "N/A"} {/* Course level */}
            </Badge>
          </div>
          <div className="text-lg font-bold">
            <span>
              ${course?.coursePrice || "Free"} {/* Course price */}
            </span>
          </div>
          <div>
            {course?.specialPrice && course?.requiredCoins ? (
              <div className="bg-gradient-to-r from-yellow-500 to-yellow-700 bg-gray-900 text-white p-1 mt-2 rounded-xl flex justify-center items-center w-full gap-1 text-sm">
                <span>
                  Special Offer: ${course?.specialPrice}
                  {/* Course price */}
                </span>
                +
                <span className="flex items-center bg-red-600 text-white px-2 py-1 rounded-full mx-2 text-sm gap-1">
                  <Logo className="w-5 h-5" />

                  <p className="text-sm font-semibold">
                    {course?.requiredCoins}
                  </p>
                </span>
              </div>
            ) : (
              ""
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default Course;
