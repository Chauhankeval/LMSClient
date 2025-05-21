import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { ImageIcon, Paperclip, Mic, Upload, X, Loader2 } from "lucide-react";
import Dropzone from "react-dropzone";
import { useAddPostMutation } from "@/Features/api/postApi";
import { useGetUserProfileQuery } from "@/Features/api/authApi";
import { toast } from "sonner";

export default function MyPostWidget() {
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");

  const [
    addPost,
    {
      data: PostData,
      isLoading: postIsloading,
      isError: postIsError,
      isSuccess,
    },
  ] = useAddPostMutation();

  const { data, isLoading, error, refetch } = useGetUserProfileQuery();

  const userId = data?.user?._id;

  const handlePost = async () => {
    try {
      console.log("<<called");
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("description", post);
      if (image) {
        formData.append("picture", image);
        formData.append("picturePath", image.name);
      }

      const result = await addPost(formData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSuccess && PostData) {
      refetch();
      toast.success(PostData.message || "Profile Updated", {
        closeButton: true, // Enables the close button
        autoClose: 5000, // Optional: Adjust the duration (in milliseconds)
      });
    }

    if (postIsError) {
      toast.success(postIsError?.message || "Uploaded Failed ", {
        closeButton: true, // Enables the close button
        autoClose: 5000, // Optional: Adjust the duration (in milliseconds)
      });
    }
  }, [postIsError, PostData, isSuccess]);

  return (
    <Card className="p-5 shadow-md rounded-lg w-full  mx-auto mb-8 ">
      {/* Input Row */}
      <div className="flex items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage
            src={data?.user?.photoUrl || "https://github.com/shadcn.png"}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Input
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          className="flex-1"
        />
      </div>

      {/* Image Upload Section */}
      {isImage && (
        <div className="border border-gray-300 rounded-md mt-4 p-4">
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <div className="flex items-center justify-between">
                <div
                  {...getRootProps()}
                  className="border-2 border-dashed border-blue-500 p-4 w-full text-center cursor-pointer"
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p className="text-gray-500">Add Image Here</p>
                  ) : (
                    <div className="flex justify-between">
                      <p className="text-gray-700">{image.name}</p>
                      <Upload className="text-gray-500" size={18} />
                    </div>
                  )}
                </div>
                {image && (
                  <button
                    onClick={() => setImage(null)}
                    className="text-red-500"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            )}
          </Dropzone>
        </div>
      )}

      <Separator className="my-4" />

      {/* Actions */}
      <div className="flex items-center justify-between">
        <button
          className="flex items-center gap-2 text-gray-500 hover:text-gray-700"
          onClick={() => setIsImage(!isImage)}
        >
          <ImageIcon size={18} />
          <span>Image</span>
        </button>

        <button className="flex items-center gap-2 text-gray-500 hover:text-gray-700">
          <Paperclip size={18} />
          <span>Attachment</span>
        </button>

        <button className="flex items-center gap-2 text-gray-500 hover:text-gray-700">
          <Mic size={18} />
          <span>Audio</span>
        </button>

        <Button onClick={handlePost} disabled={postIsloading}>
          {postIsloading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              POST...
            </>
          ) : (
            "Post"
          )}
        </Button>
      </div>
    </Card>
  );
}
