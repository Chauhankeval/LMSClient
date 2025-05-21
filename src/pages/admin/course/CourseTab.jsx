import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RichTextEditor from "@/components/ui/RichTextEditor";
import { Chip } from "@mui/material";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetCourseBuIdQuery,
  useIsCorsePublishMutation,
  useUpdateCourseMutation,
} from "@/Features/api/courseApi";
import LoadingSpinner from "@/components/ui/Loading";
import CertificateDesigner from "./Certificate";
import Logo from "@/components/ui/Logo";

const CourseTab = () => {
  const navigate = useNavigate();
  const params = useParams();
  const courseId = params.courseId;

  const [updateCourse, { data, isLoading, isSuccess, error }] =
    useUpdateCourseMutation();

  const {
    data: getCourseByIdData,
    isloading: courseIsLoading,
    refetch,
  } = useGetCourseBuIdQuery(courseId, { refetchOnMountOrArgChange: true });

  useEffect(() => {
    if (getCourseByIdData?.course) {
      const course = getCourseByIdData?.course;
      setInput({
        courseTitle: course?.courseTitle,
        subTitle: course?.subTitle,
        description: course?.description,
        category: course?.category,
        courseLevel: course?.courseLevel,
        coursePrice: course?.coursePrice,
        courseThumbnail: course?.courseThumbnail,
        requiredCoins: course?.requiredCoins,
        earnCoins: course?.earnCoins,
        specialPrice: course?.specialPrice,
      });
    }
  }, [getCourseByIdData]);

  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: "",
    requiredCoins: "",
    earnCoins: "",
    specialPrice: "",
  });

  if (courseIsLoading) return <LoadingSpinner />;

  const [preview, setPreview] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    const numValue = Number(value);

    if (name === "earnCoins" && numValue > 1000) {
      toast.error("Earn Coins cannot exceed 1000.");

      return;
    }
    if (name === "requiredCoins" && numValue > 1000) {
      toast.error("Required Coins cannot exceed 1000.");

      return;
    }

    setInput((prev) => ({
      ...prev,
      [name]: numValue,
    }));

    setInput({ ...input, [name]: value });
  };

  const selectCategory = (value) => {
    setInput({
      ...input,
      category: value,
    });
  };

  const selctcourseLevel = (value) => {
    setInput({
      ...input,
      courseLevel: value,
    });
  };

  const SelectThembnail = async (e) => {
    try {
      const file = e.target.files?.[0];
      console.log(file);

      if (file) {
        setInput({
          ...input,
          courseThumbnail: file,
        });

        const fileReader = new FileReader();

        fileReader.onload = (e) => {
          setPreview(e.target.result);
        };

        fileReader.readAsDataURL(file);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateCourseHandler = async () => {
    const formData = new FormData();
    formData.append("courseTitle", input?.courseTitle);
    formData.append("subTitle", input?.subTitle);
    formData.append("description", input?.description);
    formData.append("category", input?.category);
    formData.append("courseLevel", input?.courseLevel);
    formData.append("coursePrice", input?.coursePrice);
    formData.append("courseThumbnail", input?.courseThumbnail);
    formData.append("requiredCoins", input?.requiredCoins);
    formData.append("earnCoins", input?.earnCoins);
    formData.append("specialPrice", input?.specialPrice);

    const result = await updateCourse({ formData, courseId });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "Course update.");
    }
    if (error) {
      toast.error(error.data.message || "Failed to update course");
    }
  }, [isSuccess, error]);

  const [isCorsePublish] = useIsCorsePublishMutation();
  const publishStatusHandler = async (action) => {
    try {
      const result = await isCorsePublish({ courseId, query: action });
      console.log("<<<RESULT", result);

      if (result?.data) {
        refetch();
        toast.success(result.data.message);
      }
    } catch (error) {
      toast.error("Failed To Publish or UnPublish course");
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row justify-between">
          <div>
            <CardTitle>Basic Course Information</CardTitle>
            <CardDescription>
              Make changes to your courses here. Click save when you are done.
            </CardDescription>
          </div>
          <div className="space-x-2">
            <Button
              disabled={getCourseByIdData?.course?.lectures?.length === 0}
              onClick={() =>
                publishStatusHandler(
                  getCourseByIdData?.course?.isPublished ? false : true
                )
              }
              className={`${
                getCourseByIdData?.course?.isPublished
                  ? "bg-red-500 text-white"
                  : "bg-green-500 text-white"
              }`}
            >
              {getCourseByIdData?.course?.isPublished ? "Unpublish" : "Publish"}
            </Button>

            <Button>Remove Course</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mt-5">
            <div>
              <Label> Title</Label>
              <Input
                type="text"
                value={input?.courseTitle}
                name="courseTitle"
                onChange={(e) => handleChange(e)}
                placeholder="Ex. Fullstack Developer"
              />
            </div>
            <div>
              <Label>Sub Title</Label>
              <Input
                type="text"
                name="subTitle"
                value={input?.subTitle}
                onChange={(e) => handleChange(e)}
                placeholder="Ex. Become a Developer"
              />
            </div>
            <div>
              <Label>Description</Label>
              <RichTextEditor input={input} setInput={setInput} />
            </div>
            <div className="flex items-center gap-5">
              <div>
                <Label>Category</Label>
                <Select onValueChange={selectCategory}>
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
                      <SelectItem value="cloud-computing">
                        Cloud Computing
                      </SelectItem>
                      <SelectItem value="cybersecurity">
                        Cybersecurity
                      </SelectItem>
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
                      <SelectItem value="web-development">
                        Web Development
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Course Level</Label>
                <Select onValueChange={selctcourseLevel}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a Course Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Tech Courses</SelectLabel>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Advance">Advance</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>
                  Price
                  <Input
                    type="number"
                    name="coursePrice"
                    value={input?.coursePrice}
                    onChange={(e) => handleChange(e)}
                    placeholder="Enter Price"
                    className="w-fit"
                  />
                </Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="mt-4">
        <CardHeader className="flex flex-col gap-2">
          <div className="flex gap-3">
            <Logo className="w-8 h-8" />
            <div className="flex flex-col gap-2">
              <CardTitle>Special Offer</CardTitle>
              <CardDescription>
                Set special offers for students based on their coins. You can
                specify the required coins for a discount, set a special price,
                and define the reward coins students will earn after purchasing
                this course.
              </CardDescription>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Label className="items-center gap-2 mb-1">Required Coins :</Label>
            <Input
              type="number"
              name="requiredCoins"
              value={input?.requiredCoins}
              onChange={(e) => handleChange(e)}
              placeholder="Enter Coin"
              className="w-fit"
            />
          </div>

          <div className="flex items-center gap-2">
            <Label className="items-center gap-2 mb-1">Special Price :</Label>
            <Input
              type="number"
              name="specialPrice"
              value={input?.specialPrice}
              onChange={(e) => handleChange(e)}
              placeholder="Enter Special Price"
              className="w-fit"
            />
          </div>

          <div className="flex items-center gap-2">
            <Label className="items-center gap-2 mb-1">Earn Coin :</Label>
            <Input
              type="number"
              name="earnCoins"
              value={input?.earnCoins}
              onChange={(e) => handleChange(e)}
              placeholder="Enter Earned Coins"
              className="w-fit"
            />
          </div>
        </CardHeader>
      </Card>

      <Card className="mt-4">
        <CardHeader className="flex flex-row justify-between gap-2">
          <div>
            <Label>
              Thumbnail
              <Input
                type="file"
                name="courseThumbnail"
                onChange={SelectThembnail}
                accept="image/*"
                className="w-fit"
              />
            </Label>
            {preview && (
              <img
                src={preview}
                alt="Thumbnail Preview"
                className="mt-4 w-50 h-40"
              />
            )}
          </div>
          <div className="flex gap-3 justify-center items-center">
            <Button onClick={() => navigate("/admin/course")} variant="outline">
              Cancel
            </Button>
            <Button disabled={isLoading} onClick={updateCourseHandler}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please Wait
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </CardHeader>
      </Card>
      <Card className="mt-4">
        <CertificateDesigner />
      </Card>
    </>
  );
};

export default CourseTab;
