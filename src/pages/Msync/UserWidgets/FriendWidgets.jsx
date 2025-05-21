import {
  useGetUserFriendsQuery,
  useGetUserProfileQuery,
} from "@/Features/api/authApi";
import React from "react";
import Friends from "./Friends";
import { Card } from "@/components/ui/card";

const FriendWidgets = () => {
  const { data, isLoading, error, refetch } = useGetUserProfileQuery();
  const userId = data?.user?._id;
  const { data: UserFriends } = useGetUserFriendsQuery(userId);

  

  return (
    <div>
      {" "}
      <Card className="p-3 flex gap-3 flex-col">
        <h1 className="p-2">Friend List</h1>
        <div className="flex flex-col gap-3">
          {UserFriends?.map((friend) => (
            <Friends
              key={friend._id}
              friendId={friend._id}
              name={friend?.name}
              subtitle={friend.occupation}
              userPicturePath={friend.photoUrl}
            />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default FriendWidgets;
