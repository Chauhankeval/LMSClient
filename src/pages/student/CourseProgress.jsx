import { Button } from "@/components/ui/button";
import { CheckCircle, CheckCircle2, CirclePlay, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import {
  useCompleteProgressMutation,
  useGetCertificateQuery,
  useGetCourseProgressQuery,
  useIncompleteProgressMutation,
  useUpdateLectureProgressMutation,
} from "@/Features/api/ProgressApi";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useGetUserProfileQuery } from "@/Features/api/authApi";

const CourseProgress = () => {
  const params = useParams();
  const courseId = params.courseId;
  const { data, isLoading, isError, refetch } =
    useGetCourseProgressQuery(courseId);

  console.log("<<data", data);
  const { data: userData } = useGetUserProfileQuery();

  const [updateLectureProgress] = useUpdateLectureProgressMutation();

  const [
    completeProgress,
    { data: markcompleteData, isSuccess: completedisSuccess },
  ] = useCompleteProgressMutation();

  const [
    IncompleteProgress,
    { data: markIncompleteData, isSuccess: IncompletedisSuccess },
  ] = useIncompleteProgressMutation();

  const {
    data: certificateUrl,
    error,
    isFetching,
    isSuccess,
  } = useGetCertificateQuery(courseId, {
    skip: !courseId, // Ensures it only runs when courseId is available
  });

  const [currentLecture, setCurrentLecture] = useState(null);

  useEffect(() => {
    if (completedisSuccess) {
      refetch();
      toast.success(markcompleteData?.message);
    }
    if (IncompletedisSuccess) {
      refetch();
      toast.success(markIncompleteData?.message);
    }
  }, [completedisSuccess, IncompletedisSuccess]);

  
  const initialLecture =
    currentLecture ||
    (data?.data?.courseDetails.lectures &&
      data?.data?.courseDetails.lectures[0]);

  const isLectureCompleted = (lectureId) => {
    return data?.data?.progress?.some(
      (prog) => prog.lectureId === lectureId && prog.viewed
    );
  };

  const handleupdateLectureProgress = async (lectureId) => {
    await updateLectureProgress({ courseId, lectureId });
    refetch();
  };
  const handleSelectLecture = (lecture) => {
    setCurrentLecture(lecture);
    handleupdateLectureProgress(lecture?._id);
  };

  const handleCompleteCourse = async () => {
    await completeProgress(courseId);
  };

  const handleInCompleteCourse = async () => {
    console.log("<<called");
    await IncompleteProgress(courseId);
  };

  const handleDownload = () => {
    if (certificateUrl) {
      const a = document.createElement("a");
      a.href = certificateUrl;
      a.download = `Certificate_${courseId}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => window.URL.revokeObjectURL(certificateUrl), 1000); // Cleanup after download
    }
  };

  useEffect(() => {
    return () => {
      if (certificateUrl) {
        window.URL.revokeObjectURL(certificateUrl);
      }
    };
  }, [certificateUrl]);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">
          {data?.data?.courseDetails?.courseTitle}
        </h1>
        <Button
          onClick={
            data?.data?.completed
              ? handleInCompleteCourse
              : handleCompleteCourse
          }
          variant={data?.data?.completed ? "outline" : "default"}
        >
          {data?.data?.completed ? (
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" /> <span>Completed</span>{" "}
            </div>
          ) : (
            "Mark as completed"
          )}
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Video section  */}
        <div className="flex-1 md:w-3/5 h-fit rounded-lg shadow-lg p-4">
          <div>
            <video
              src={currentLecture?.videoUrl || initialLecture?.videoUrl}
              controls
              className="w-full h-auto md:rounded-lg"
              onPlay={() =>
                handleupdateLectureProgress(
                  currentLecture?._id || initialLecture?._id
                )
              }
            />
          </div>
          {/* Display current watching lecture title */}
          <div className="mt-2 ">
            <h3 className="font-medium text-lg">
              {`Lecture ${
                data?.data?.courseDetails?.lectures.findIndex(
                  (lec) =>
                    lec._id === (currentLecture?._id || initialLecture._id)
                ) + 1
              } : ${
                currentLecture?.lectureTitle || initialLecture?.lectureTitle
              }`}
            </h3>
          </div>
        </div>
        {/* Lecture Sidebar  */}
        <div className="flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l border-gray-200 md:pl-4 pt-4 md:pt-0">
          <h2 className="font-semibold text-xl mb-4">Course Lecture</h2>
          <div className="flex-1 overflow-y-auto">
            {data?.data?.courseDetails?.lectures.map((lecture) => (
              <Card
                key={lecture._id}
                className={`mb-3 hover:cursor-pointer transition transform ${
                  lecture._id === currentLecture?._id
                    ? "bg-gray-200 dark:dark:bg-gray-800"
                    : ""
                } `}
                onClick={() => handleSelectLecture(lecture)}
              >
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    {isLectureCompleted(lecture._id) ? (
                      <CheckCircle2 size={24} className="text-green-500 mr-2" />
                    ) : (
                      <CirclePlay size={24} className="text-gray-500 mr-2" />
                    )}
                    <div>
                      <CardTitle className="text-lg font-medium">
                        {lecture.lectureTitle}
                      </CardTitle>
                    </div>
                  </div>
                  {isLectureCompleted(lecture._id) && (
                    <Badge
                      variant={"outline"}
                      className="bg-green-200 text-green-600"
                    >
                      Completed
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          {data?.data?.completed === true && (
            <Button onClick={handleDownload}>
              <Download className="mr-2 h-5 w-5" />{" "}
              {/* Icon added with spacing */}
              Download Certificate
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;
