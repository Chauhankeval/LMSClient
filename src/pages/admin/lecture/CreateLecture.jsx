import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import {
  useGetLecturesQuery,
  useLectureCreateMutation,
} from "@/Features/api/lectureApi";
import Lectures from "./Lectures";

const CreateLecture = () => {
  const params = useParams();
  const courseId = params.courseId;

  const navigate = useNavigate();

  const [lectureCreate, { data, isLoading, error, isSuccess }] =
    useLectureCreateMutation();

  const {
    data: lecturesData,
    isLoading: lectureIsLoading,
    isError: lectureError,
    refetch,
  } = useGetLecturesQuery(courseId);

  console.log("<<lecturesData", lecturesData);

  const [lectureTitle, setLectureTitle] = useState("");

  const handleSave = async () => {
    await lectureCreate({ lectureTitle, courseId });
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(data.message);
    }
    if (error) {
      toast.error(error.data.message);
    }
  }, [isSuccess, error]);

  // let Lecture;

  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">
          Lets add Lecture, add some basic course details for your new new
          course
        </h1>
        <p className="text-sm">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Poss
          laborum!
        </p>
      </div>

      <div className="space-y-4 mb-7">
        <div>
          <Label>Lecture Title</Label>
          <Input
            type="text"
            name="lectureTitle"
            placeholder="Enter Lecture Title"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <Button disabled={isLoading} onClick={handleSave}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Create"
            )}
          </Button>

          <Button
            variant="outline"
            onClick={() => navigate(`/admin/course/${courseId}`)}
          >
            Back to course
          </Button>
        </div>
      </div>

      <div className="text-center space-y-4 mt-3">
        {isLoading ? (
          <div className="flex flex-col items-center">
            <svg
              className="animate-spin h-10 w-10 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
            <p className="mt-4 text-blue-500 font-medium">
              Fetching lectures, please wait...
            </p>
          </div>
        ) : lectureError ? (
          <div className="text-red-500">
            <p className="font-semibold">Oops! Failed to load lectures.</p>
            <p className="text-sm mt-2">
              Please try refreshing the page later.
            </p>
          </div>
        ) : lecturesData?.lectures?.length === 0 ? (
          <div className="text-gray-500">
            <p className="font-medium">No lectures available at the moment.</p>
            <p className="text-sm mt-2">Check back later for updates!</p>
          </div>
        ) : (
          lecturesData?.lectures?.map((lecture, index) => (
            <Lectures
              key={lecture?._id}
              lecture={lecture}
              index={index}
              courseId={courseId}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CreateLecture;
