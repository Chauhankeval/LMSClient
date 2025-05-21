import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { Switch } from "@/components/ui/switch";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import {
  useDeleteLectureByIdMutation,
  useEditLectureByIdMutation,
  useGetLecturesByIdQuery,
} from "@/Features/api/lectureApi";
import { Loader2 } from "lucide-react";

const LectureTab = () => {
  const navigate = useNavigate();
  const param = useParams();
  const { courseId, lectureId } = param;

  const [lectureTitle, setlectureTitle] = useState("");
  const [uploadVideoInfo, setUploadVideoInfo] = useState(null);
  const [isPreviewFree, setIsPreviewFree] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [btnDisable, setBtnDisable] = useState(true);

  console.log("<<<uploadVideoInfo", uploadVideoInfo);
  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      setMediaProgress(true);

      try {
        const url = "http://localhost:8008/api/mediaroute";
        const result = await axios.post(`${url}/upload-video`, formData, {
          onUploadProgress: ({ loaded, total }) => {
            setUploadProgress(Math.round((loaded * 100) / total));
          },
        });

        if (result?.data?.success) {
          console.log(result);
          setUploadVideoInfo({
            videoUrl: result?.data?.data?.url,
            publicId: result?.data?.data?.public_id,
          });
          setBtnDisable(false);
          toast.success(result?.data?.message);
          e.target.value = null; // Clear the file input
        }
      } catch (error) {
        console.error(error);
        toast.error("Video Upload Failed");
      } finally {
        setMediaProgress(false);
      }
    }
  };

  const [editLectureById, { data, isLoading, error, isSuccess }] =
    useEditLectureByIdMutation();

  const [
    DeleteLectureById,
    { data: removeData, isLoading: removeLoading, isSuccess: removeIsSuccess },
  ] = useDeleteLectureByIdMutation();

  const { data: lectureData } = useGetLecturesByIdQuery(lectureId);

  const lecture = lectureData?.lectures;

  useEffect(() => {
    if (lecture) {
      setlectureTitle(lecture.lectureTitle);
      setIsPreviewFree(lecture.isPreviewFree);
      setUploadVideoInfo(lecture.videoInfo);
    }
  }, [lecture]);

  const HandleUpdateLecture = async () => {
    await editLectureById({
      courseId,
      lectureId,
      lectureTitle,
      videoInfo: uploadVideoInfo,
      isPreviewFree,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
    }
    if (error) {
      toast.success(error?.data?.message);
    }
    if (removeIsSuccess) {
      toast.success(removeData?.message);

      // Extract the base URL to navigate back one page
      const basePath = window.location.pathname
        .split("/")
        .slice(0, -1)
        .join("/");
      navigate(basePath);
    }
  }, [removeIsSuccess, error, isSuccess]);

  const removeLectureHandle = async () => {
    await DeleteLectureById(lectureId);
  };

  return (
    <Card>
      <CardHeader className="flex  justify-between">
        <div>
          <CardTitle>Edit Lecture</CardTitle>
          <CardDescription>
            Make Changes and click save when It's save
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button
            disabled={removeLoading}
            variant="destructive"
            onClick={removeLectureHandle}
          >
            {removeLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please Wait
              </>
            ) : (
              "Remove Lecture"
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            className="w-fit"
            placeholder="Enter Title"
            value={lectureTitle}
            onChange={(e) => setlectureTitle(e.target.value)}
          />
        </div>
        <div className="my-5">
          <Label>
            video <span className="text-red-500">*</span>
          </Label>
          <Input
            type="file"
            name="file"
            accept="video/*"
            className="w-fit"
            onChange={fileChangeHandler}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="is-preview-free"
            checked={isPreviewFree}
            onCheckedChange={(checked) => setIsPreviewFree(checked)}
          />
          <Label htmlFor="is-preview-free">Is This Free</Label>
        </div>

        {mediaProgress && (
          <div className="my-4">
            <p>{uploadProgress} %</p>
            <Progress value={uploadProgress} />
          </div>
        )}
        <div className="mt-4">
          <div className="flex gap-3 justify-end items-center">
            <Button onClick={() => navigate("/admin/course")} variant="outline">
              Cancel
            </Button>
            <Button disabled={isLoading} onClick={HandleUpdateLecture}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please Wait
                </>
              ) : (
                "Update Lecture"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LectureTab;
