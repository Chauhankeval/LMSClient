import { useDeleteLectureByIdMutation } from "@/Features/api/lectureApi";
import { Delete, Edit2Icon } from "lucide-react";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const Lectures = ({ lecture, index, courseId }) => {
  const navigate = useNavigate();

  const GotoUpdateLecture = () => {
    navigate(`${lecture?._id}`);
  };

  const [
    DeleteLectureById,
    { data: removeData, isLoading: removeLoading, isSuccess: removeIsSuccess },
  ] = useDeleteLectureByIdMutation();

  const removeLectureHandle = async () => {
    await DeleteLectureById(lecture?._id);
  };

  useEffect(() => {
    if (removeIsSuccess) {
      toast.success(removeData?.message);
    }
  }, [removeIsSuccess]);

  return (
    <div className="flex items-center justify-between  px-4 py-2 rounded-md my-2">
      <h1 className="font-bold text-gray-700 dark:text-gray-100">
        {index + 1} {lecture?.lectureTitle}
      </h1>
      <div className="flex items-center gap-3">
        <Delete
          onClick={removeLectureHandle}
          className="cursor-pointer text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400"
        />
        <Edit2Icon
          onClick={GotoUpdateLecture}
          size={20}
          className="cursor-pointer text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400"
        />
      </div>
    </div>
  );
};

export default Lectures;
