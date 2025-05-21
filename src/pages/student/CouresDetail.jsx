import { Button } from "@/components/ui/button";
import BuyCourseButton from "@/components/ui/BuyCourseButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Logo from "@/components/ui/Logo";
import { Separator } from "@/components/ui/separator";
import SpecialPrice from "@/components/ui/SpecialOffer";
import { useGetCourseDetailsQuery } from "@/Features/api/purchaseApi";

import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
import React from "react";
import ReactPlayer from "react-player";

import { Link, useNavigate, useParams } from "react-router-dom";

const CouresDetail = () => {
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetCourseDetailsQuery(courseId);

  if (isLoading) return <p>Loading......</p>;
  if (isError) return <p>Failed To load course data</p>;

  const { course, purchased } = data;

  console.log("<<purchased", purchased);

  const handleContineCourse = async () => {
    if (purchased) {
      navigate(`/courseprogress/${courseId}`);
    }
  };
  return (
    <div className="mt-20 space-y-5 h-screen">
      {/* Course Header */}
      <div className="bg-gradient-to-r from-green-500 to-black text-white">
        <div className="max-w-7xl mx-auto py-8 md:px-8 flex flex-col gap-2">
          <h1 className="font-bold text-2xl md:text-3xl">
            {course?.courseTitle}
          </h1>
          <p className="text-base md:text-lg">{course.subTitle}</p>
          <p>
            Created By{" "}
            <Link to={`/admin-profile/${course?.creator?._id}`}>
              <span className="text-[#c0c4fc] underline italic">
                {course?.creator?.name}
              </span>
            </Link>
          </p>
          <div className="flex items-center gap-2 text-sm">
            <BadgeInfo size={16} />
            <p>
              Last Updated {new Date(course.updatedAt).toLocaleDateString()}
            </p>
          </div>
          <p>Student enrolled: {course.enrolledStudents.length}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10 items-center">
        {/* Description Section */}
        <div className="w-full lg:w-1/2 space-y-5">
          <h1 className="font-bold text-xl md:text-2xl">Description</h1>
          <p
            className="text-sm"
            dangerouslySetInnerHTML={{ __html: course.description }}
          ></p>

          {/* Lectures Section */}
          <div >
            <Card>
              <CardHeader>
                <CardTitle>{course?.courseTitle}</CardTitle>
                <CardDescription>
                  {course?.lectures?.length} Lectures
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {course?.lectures?.map((lecture, idx) => (
                  <div
                    key={lecture?._id}
                    className="flex items-center gap-3 text-sm"
                  >
                    <span>
                      {purchased ? (
                        <PlayCircle size={14} />
                      ) : (
                        <Lock size={14} />
                      )}
                    </span>
                    <p>Lecture {idx + 1}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Video and Purchase Section */}
        <div className="w-full lg:w-1/3">
          <Card className="bg-gradient-to-r from-gray-400 to-black">
            <CardContent className="p-4 flex flex-col">
              <div className="w-full aspect-video mb-4">
                <ReactPlayer
                  width="100%"
                  height="100%"
                  url={course?.lectures[0].videoUrl}
                  controls={true}
                />
              </div>
              <h1>{course?.courseTitle}</h1>
              <Separator className="my-2" />
              <h1 className="text-lg md:text-xl font-semibold">
                ${course?.coursePrice.toFixed(2)}
              </h1>
            </CardContent>
            <CardFooter className="flex justify-center p-4 flex-col w-full gap-2">
              <div className="w-full">
                {purchased ? (
                  <Button
                    onClick={handleContineCourse}
                    className="bg-green-500 text-white w-full flex items-center justify-center gap-2"
                  >
                    <span>Continue Course</span>
                  </Button>
                ) : (
                  <div className="flex flex-col w-full gap-2">
                    <BuyCourseButton course={course} />
                  </div>
                )}
              </div>
              <div className="w-full">
                {purchased === false && course?.requiredCoins ? (
                  <SpecialPrice course={course} />
                ) : null}
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CouresDetail;
