import React, { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Course from "./Course";
import { useGetPublishedCoursesQuery } from "@/Features/api/courseApi";
import { toast } from "sonner";

const Courses = () => {
  const { data, isLoading, isSuccess, isError } = useGetPublishedCoursesQuery();


  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
    }
    if(isError) {
      toast.error("Something went Wrong")
    }
    
  }, [isSuccess]);


  console.log("<<<DATA", data);
  return (
    <div className="">
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="font-bold text-3xl text-center mb-10">Our Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Display Skeletons While Loading */}
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <CourseSkeleton key={index} />
              ))
            : data?.courses && data?.courses?.map((course, index) => (
                <Course key={index} course={course} />
              ))}
        </div>
      </div>
    </div>
  );
};

const CourseSkeleton = () => {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow-lg rounded-lg overflow-hidden">
      <Skeleton className="w-full h-36" />
      <div className="px-5 py-4 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  );
};

export default Courses;
