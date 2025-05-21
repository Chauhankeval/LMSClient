import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useCreateCourseMutation } from "@/Features/api/courseApi";

const AddCourse = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [courseTitle, setCourseTitle] = useState("");

  const [createCourse, { data, isLoading, error, isSuccess }] =
    useCreateCourseMutation();

  const getSelectedCategory = (value) => {
    setCategory(value);
  };
  const createCourses = async () => {
    await createCourse({ category, courseTitle });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "Course Created", {
        closeButton: true, // Enables the close button
        autoClose: 5000, // Optional: Adjust the duration (in milliseconds)
      });
      navigate('/admin/course')
    }
  }, [error, isSuccess]);

  return (
    <div className="flex-1 mx-10 ">
      <div className="mb-4">
        <h1 className="font-bold text-xl">
          Lets add course, add some basic course details for your new new course
        </h1>
        <p className="text-sm">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Poss
          laborum!
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            name="courseTitle"
            onChange={(e) => setCourseTitle(e.target.value)}
            value={courseTitle}
            placeholder="Your Course Name"
          />
        </div>
        <div>
          <Label>Category</Label>

          <Select onValueChange={getSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a Course" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Tech Courses</SelectLabel>
                <SelectItem value="artificial-intelligence">
                  Artificial Intelligence
                </SelectItem>
                <SelectItem value="blockchain-technology">
                  Blockchain Technology
                </SelectItem>
                <SelectItem value="cloud-computing">Cloud Computing</SelectItem>
                <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
                <SelectItem value="data-science">Data Science</SelectItem>
                <SelectItem value="front-end-development">
                  Front-End Development
                </SelectItem>
                <SelectItem value="full-stack-development">
                  Full-Stack Development
                </SelectItem>
                <SelectItem value="machine-learning">
                  Machine Learning
                </SelectItem>
                <SelectItem value="mobile-app-development">
                  Mobile App Development
                </SelectItem>
                <SelectItem value="web-development">Web Development</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button disabled={isLoading} onClick={createCourses}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Create"
            )}
          </Button>

          <Button variant="outline" onClick={() => navigate("/admin/course")}>
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
