import { useGetFeedPostQuery } from "@/Features/api/postApi";
import React, { useEffect } from "react";
import PostWidget from "./PostWidget";

const PostsWidget = () => {
  const { data } = useGetFeedPostQuery();
  
  console.log("<data", data);
  return (
    <>
      {data?.map(
        ({
          _id,
          userId,
          name,
          description,
          location,
          PicturePath,
          userPicturePath,
          likes,
          comments,
          
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={name}
            description={description}
            location={location}
            PicturePath={PicturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;
