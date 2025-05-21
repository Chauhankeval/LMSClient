import React from "react";

import Course from "./Course";
import { useGetUserProfileQuery } from "@/Features/api/authApi";

const MyLearning = () => {
  const { data, isLoading } = useGetUserProfileQuery();

  const myLearningCourses = data?.user?.enrolledCorses || [];

  console.log(myLearningCourses);
  return (
    <>
      <div className="max-w-4xl mx-auto my-10 px-4 md:px-0 mt-5">
        <div>
          {isLoading ? (
            <>
              <MyLearningSkeleton />
            </>
          ) : myLearningCourses?.length === 0 ? (
            <>
              <p>you are enrolled in any courses</p>
            </>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {myLearningCourses?.map((course, index) => (
                <Course key={index} course={course} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// Skeleton component for loading state
const MyLearningSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {[...Array(3)].map((_, index) => (
      <div
        key={index}
        className="bg-gray-300 dark:bg-gray-700 rounded-lg h-40 animate-pulse"
      ></div>
    ))}
  </div>
);

export default MyLearning;
