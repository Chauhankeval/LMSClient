import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageSquare, Share, UserMinus, UserPlus } from "lucide-react";
import { useGetUserProfileQuery } from "@/Features/api/authApi";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import { FavoriteBorderOutlined, FavoriteOutlined } from "@mui/icons-material";

import { useLikeCountUpdateMutation } from "@/Features/api/postApi";
import Friends from "./Friends";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  PicturePath,
  userPicturePath,
  likes = {}, // Ensure likes is always an object
  comments = [],
}) => {
  const { data, isLoading, error, refetch } = useGetUserProfileQuery();
  const userId = data?.user?._id;

  // Local state for UI updates
  const [isLiked, setIsLiked] = useState(
    userId ? Boolean(likes[userId]) : false
  );
  const [likeCount, setLikeCount] = useState(Object.keys(likes).length);
  const [isComments, setIsComments] = useState(false);
  const [likeCountUpdate] = useLikeCountUpdateMutation();

  const patchLike = async () => {
    if (!userId) return;

    // Optimistically update UI
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setLikeCount((prev) => (newLikedState ? prev + 1 : prev - 1));

    try {
      await likeCountUpdate({ id: postId, userId });
      refetch();
    } catch (error) {
      console.error(error);
      // Rollback UI if request fails
      setIsLiked(!newLikedState);
      setLikeCount((prev) => (newLikedState ? prev - 1 : prev + 1));
    }
  };
  useEffect(() => {
    refetch();
  }, []);

 
  return (
    <Card className="p-4 space-y-4 border rounded-lg shadow-sm mt-3">
      {/* Post Header */}

      <Friends
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />

      {/* Post Image */}
      {PicturePath && (
        <img
          className="w-full rounded-lg mt-2"
          src={`http://localhost:8008${PicturePath}`}
          alt="Post"
        />
      )}

      {/* Post Description */}
      <p className="text-gray-300">{description}</p>

      {/* Post Actions */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          {/* Like Button */}
          <div>
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined className="text-red-500" /> // Whole heart turns red when liked
              ) : (
                <FavoriteBorderOutlined className="text-gray-500 hover:text-red-500" />
              )}
            </IconButton>
            <span className="text-gray-600">{likeCount}</span>
          </div>

          {/* Comment Button */}
          <div className="flex items-center justify-center">
            <button
              onClick={() => setIsComments(!isComments)}
              className="flex items-center space-x-1 text-gray-600 hover:text-blue-500"
            >
              <MessageSquare size={20} />
              <span>{comments.length}</span>
            </button>
          </div>
        </div>

        {isComments && (
          <Box mt="0.5rem">
            {comments.map((comment, i) => (
              <Box key={`${name}-${i}`}>
                <Divider />
                <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                  {comment}
                </Typography>
              </Box>
            ))}
            <Divider />
          </Box>
        )}

        {/* Share Button */}
        <Button variant="ghost">
          <Share size={20} />
        </Button>
      </div>
    </Card>
  );
};

export default PostWidget;
