import React, { useState, useEffect } from "react";
import JoditEditor from "jodit-react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  useGetCourseBuIdQuery,
  useUpdateCourseCertificateMutation,
  useUpdateCourseMutation,
} from "@/Features/api/courseApi";
import { useParams } from "react-router-dom";

const CertificateDesigner = () => {
  const [content, setContent] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const params = useParams();
  const courseId = params.courseId;

  const [updateCourseCertificate, { data, isLoading, isSuccess, error }] =
    useUpdateCourseCertificateMutation();

  const editorConfig = {
    theme: darkMode ? "dark" : "default",
    height: "350px",
  };

  const handleSave = async () => {
    try {
      const result = await updateCourseCertificate({ content, courseId });
      console.log("Updated Certificate: ", result);
    } catch (error) {
      console.error("Error updating certificate:", error);
    }
  };

  const {
    data: getCourseByIdData,
    isloading: courseIsLoading,
    refetch,
  } = useGetCourseBuIdQuery(courseId, { refetchOnMountOrArgChange: true });

  useEffect(() => {
    if (getCourseByIdData?.course) {
      const course = getCourseByIdData?.course;
      setContent(course?.template);
    }
  }, [getCourseByIdData]);
  return (
    <div
      className={`max-w-7xl mx-auto p-6 border border-gray-300 rounded-lg ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
      } shadow-md transition`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Design Certificate</h2>
        <button
          className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
        </button>
      </div>

      <div
        className={`h-[400px] border border-gray-300 rounded-md overflow-hidden ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
      >
        <JoditEditor
          value={content}
          onBlur={(newContent) => setContent(newContent)} // Use onBlur instead of onChange
          config={editorConfig}
        />
      </div>

      <Button
        onClick={handleSave}
        className="block w-full md:w-auto mx-auto mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
      >
        Save Certificate
      </Button>
    </div>
  );
};

export default CertificateDesigner;
