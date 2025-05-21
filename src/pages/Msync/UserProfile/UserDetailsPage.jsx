import { useGetAdminProfileQuery } from "@/Features/api/authApi";
import React from "react";
import { useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import {
  Facebook,
  Linkedin,
  MessageSquare,
  Settings,
  Share,
  Youtube,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { FaLinkedin } from "react-icons/fa";
import { IconButton } from "@mui/material";
import { FavoriteBorderOutlined, FavoriteOutlined } from "@mui/icons-material";
import Friends from "../UserWidgets/Friends";
const UserDetailsPage = () => {
  const params = useParams();
  const userId = params.userId;

  const { data, isLoading, error } = useGetAdminProfileQuery(userId); // Fetch admin profile

  console.log("<<data", data);

  console.log("<<<userId", userId);
  return (
    <div className="flex flex-col md:flex-row gap-6 mx-auto max-w-6xl p-4 ">
      <Card className="shadow-md rounded-lg p-6 flex flex-col w-full md:w-1/3 h-full mt-3">
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
                <p className="text-gray-500 text-sm">0 friends</p>
              </div>
            </div>
          </div>
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

      <div className="w-full md:w-2/3 space-y-4">
        {data?.posts.map((post) => (
          <Card
            key={post._id}
            className="p-4 space-y-4 border rounded-lg shadow-sm mt-3"
          >
            {/* Post Header */}
            <div className="flex items-center space-x-3">
              <img
                className="w-10 h-10 rounded-full"
                src={post.userPicturePath}
                alt={post.name}
              />
              <div>
                <p className="font-medium text-white">{post.name}</p>
                <p className="text-gray-400 text-sm">{post.location}</p>
              </div>
            </div>

            {/* Post Image */}
            {post.PicturePath && (
              <img
                className="w-full rounded-lg mt-2"
                src={`http://localhost:8008${post.PicturePath}`}
                alt="Post"
              />
            )}

            {/* Post Description */}
            <p className="text-gray-300">{post.description}</p>

            {/* Post Actions */}
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                {/* Like Button */}
                <div>
                  <IconButton onClick={() => patchLike(post._id)}>
                    {post.likes[userId] ? (
                      <FavoriteOutlined className="text-red-500" />
                    ) : (
                      <FavoriteBorderOutlined className="text-gray-500 hover:text-red-500" />
                    )}
                  </IconButton>
                  <span className="text-gray-600">
                    {Object.keys(post.likes).length}
                  </span>
                </div>

                {/* Comment Button */}
                <div className="flex items-center justify-center">
                  <button
                    onClick={() => toggleComments(post._id)}
                    className="flex items-center space-x-1 text-gray-600 hover:text-blue-500"
                  >
                    <MessageSquare size={20} />
                    <span>{post.comments.length}</span>
                  </button>
                </div>
              </div>

              {/* Share Button */}
              <Button variant="ghost">
                <Share size={20} />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UserDetailsPage;
