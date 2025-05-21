import React from "react";
import { useNavigate } from "react-router-dom";
import {
  useFriendsInListMutation,
  useGetUserFriendsQuery,
  useGetUserProfileQuery,
} from "@/Features/api/authApi";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UserPlus, UserMinus, UserMinus2 } from "lucide-react"; // FIXED IMPORT
import { Card } from "@/components/ui/card";

const Friends = ({ friendId, name, subtitle, userPicturePath }) => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetUserProfileQuery();
  const userId = data?.user?._id;

  console.log("<<<friendId", friendId);
  // Check if the user is a friend
  const { data: friends, refetch } = useGetUserFriendsQuery(userId);

  // Check if friendId exists in the list
  const isFriends = friends?.some((friend) => friend._id === friendId);

  console.log("<<isFriends", isFriends);

  // Mutation hook for updating the friends list
  const [FriendsInList, { isLoading: isMutating }] = useFriendsInListMutation();

  // Function to update the friends list
  const handleFriendUpdate = async () => {
    try {
      await FriendsInList({ userId, friendId }); // Use `.mutateAsync()` for async RTK queries
      refetch();
    } catch (error) {
      console.error("Error updating friends:", error);
    }
  };

  return (
    <Card className="flex items-center justify-between p-3">
      {/* Profile Section */}
      <div
        className="flex items-center gap-4 cursor-pointer"
        onClick={() => {
          navigate(`/user-profile/${friendId}`);
          navigate(0);
        }}
      >
        <Avatar className="h-10 w-10">
          <AvatarImage
            src={userPicturePath || "https://github.com/shadcn.png"}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-lg font-medium hover:text-primary">{name}</p>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
      </div>

      {/* Friend Action Button */}
      <Button
        onClick={handleFriendUpdate}
        disabled={isMutating}
        className="p-2"
      >
        {isFriends ? (
          <UserMinus2 className="h-5 w-5" />
        ) : (
          <UserPlus className="h-5 w-5" />
        )}
      </Button>
    </Card>
  );
};

export default Friends;
