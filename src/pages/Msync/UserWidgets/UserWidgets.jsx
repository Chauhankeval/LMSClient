import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetUserProfileQuery,
  useUpdateUserMutation,
} from "@/Features/api/authApi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Facebook, Linkedin, Settings, Youtube } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { FaLinkedin } from "react-icons/fa";

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [occupation, setOccupation] = useState("");
  const [location, setLocation] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [twitter, setTwitter] = useState("");
  const [youtube, setYoutube] = useState("");
  const [website, setWebsite] = useState("");
  const [facebook, setFacebook] = useState("");

  const { data, isLoading, error, refetch } = useGetUserProfileQuery();
  const [
    updateUser,
    { data: updateUserData, isLoading: updateUserIsLoading, isSuccess },
  ] = useUpdateUserMutation();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setProfilePhoto(files[0]); // Save file separately
    } else {
      switch (name) {
        case "name":
          setName(value);
          break;
        case "location":
          setLocation(value);
          break;
        case "linkedin":
          setLinkedin(value);
          break;
        case "twitter":
          setTwitter(value);
          break;
        case "youtube":
          setYoutube(value);
          break;
        case "website":
          setWebsite(value);
          break;
        case "facebook":
          setFacebook(value);
          break;
        case "occupation":
          setOccupation(value);
          break;
        default:
          break;
      }
    }
  };

  const handleUpdatedUser = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("profilePhoto", profilePhoto);
      formData.append("location", location);
      formData.append("linkedin", linkedin);
      formData.append("twitter", twitter);
      formData.append("youtube", youtube);
      formData.append("website", website);
      formData.append("facebook", facebook);
      formData.append("occupation", occupation);

      console.log("Sending Data:", formData);

      const result = await updateUser(formData);
      console.log("Update Result:", result);

      setOpen(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      setOpen(false);
    }
  };

  console.log("<<<data", data);

  useEffect(() => {
    if (data?.user) {
      setProfilePhoto(data.user.photoUrl || "");
      setName(data.user.name || "");
      setOccupation(data?.user?.occupation);
      setLocation(data.user.location || "");
      setLinkedin(data.user.linkedin || "");
      setTwitter(data.user.twitter || "");
      setYoutube(data.user.youtube || "");
      setWebsite(data.user.website || "");
      setFacebook(data.user.facebook || "");
    }
  }, []);

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (isSuccess && updateUserData) {
      refetch();
      toast.success(updateUserData.message || "Profile Updated", {
        closeButton: true, // Enables the close button
        autoClose: 5000, // Optional: Adjust the duration (in milliseconds)
      });
    }

    if (error) {
      toast.success(error?.message || "Updated Failed ", {
        closeButton: true, // Enables the close button
        autoClose: 5000, // Optional: Adjust the duration (in milliseconds)
      });
    }
  }, [error, updateUserData, isSuccess]);

  return (
    <Card className="shadow-md rounded-lg p-6 flex flex-col mx-auto">
      {/* FIRST ROW */}
      <div className="flex justify-between items-center pb-4">
        <div className="flex justify-between items-center pb-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14 md:h-20 md:w-20">
              <AvatarImage
                src={data?.user?.photoUrl || "https://github.com/shadcn.png"}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="text-lg font-semibold"> {data?.user?.name}</h4>
              <p className="text-gray-500 text-sm">
                {data?.user?.friends?.length} friends
              </p>
            </div>
          </div>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <Settings className="text-gray-500 cursor-pointer hover:text-gray-700 flex" />
          </DialogTrigger>
          <DialogContent className="max-w-sm mx-auto">
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <Input
                name="name"
                value={name}
                onChange={handleChange}
                placeholder="Name"
              />
              <Input
                type="file"
                accept="image/*"
                className="col-span-3"
                onChange={handleChange}
              />
              <Input
                name="location"
                value={location}
                onChange={handleChange}
                placeholder="Location"
              />
              <Input
                name="occupation"
                value={occupation}
                onChange={handleChange}
                placeholder="Occupation"
              />
              <Input
                name="linkedin"
                value={linkedin}
                onChange={handleChange}
                placeholder="LinkedIn URL"
              />
              <Input
                name="twitter"
                value={twitter}
                onChange={handleChange}
                placeholder="Twitter URL"
              />
              <Input
                name="youtube"
                value={youtube}
                onChange={handleChange}
                placeholder="YouTube URL"
              />
              <Input
                name="website"
                value={website}
                onChange={handleChange}
                placeholder="Website URL"
              />
              <Input
                name="facebook"
                value={facebook}
                onChange={handleChange}
                placeholder="Facebook URL"
              />
            </div>

            <DialogFooter>
              <Button onClick={(e) => handleUpdatedUser(e)}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <hr />

      {/* SECOND ROW */}
      <div className="py-4">
        <div className="flex items-center gap-4 mb-2">
          <span className="text-gray-500">📍</span>
          <p className="text-gray-700 text-sm">{data?.user?.location}</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-500">💼</span>
          <p className="text-gray-700 text-sm">{data?.user?.occupation}</p>
        </div>
      </div>

      <hr />

      {/* THIRD ROW */}
      <div className="py-4">
        <div className="flex justify-between mb-2">
          <p className="text-gray-700 text-sm">Who's viewed your profile</p>
          <p className="text-gray-900 font-semibold">
            {data?.user?.viewedProfile}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-700 text-sm">Impressions of your post</p>
          <p className="text-gray-900 font-semibold">
            {data?.user?.impressions}
          </p>
        </div>
      </div>

      <hr />

      {/* FOURTH ROW */}
      <div className="py-4">
        <h4 className="text-lg font-semibold mb-2">Social Profiles</h4>

        {/* Twitter */}
        {data?.user?.twitter && (
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-5">
              <span className="text-gray-500">🐦</span>
              <div>
                <p className="font-semibold">
                  <a
                    href={data?.user?.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    Twitter
                  </a>
                </p>
              </div>
            </div>
          </div>
        )}
        {data?.user?.website && (
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-5">
              <span className="text-gray-500">🔗</span>
              <div>
                <p className="font-semibold">
                  <a
                    href={data?.user?.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Website
                  </a>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* LinkedIn */}
        {data?.user?.linkedin && (
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-5">
              <span className="text-gray-500">
                <FaLinkedin size={20} />
              </span>
              <div>
                <p className="font-semibold">
                  <a
                    href={data?.user?.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" hover:underline"
                  >
                    LinkedIn
                  </a>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* YouTube */}
        {data?.user?.youtube && (
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-5">
              <Youtube className="text-red-500" size={20} />
              <div>
                <p className="font-semibold">
                  <a
                    href={data?.user?.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-500 hover:underline"
                  >
                    YouTube
                  </a>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Facebook */}
        {data?.user?.facebook && (
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-5">
              <Facebook className="text-blue-700" size={20} />
              <div>
                <p className="font-semibold">
                  <a
                    href={data?.user?.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:underline"
                  >
                    Facebook
                  </a>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
export default UserWidget;
