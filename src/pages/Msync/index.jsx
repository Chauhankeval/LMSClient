import { Box, useMediaQuery } from "@mui/material";
import UserWidget from "./UserWidgets/UserWidgets";
import PostsWidget from "./UserWidgets/PostsWidget";
import AdvertWidget from "./UserWidgets/AdvertWidget";

import MyPostWidget from "./UserWidgets/MyPostWidgets";
import FriendWidgets from "./UserWidgets/FriendWidgets";

const Msync = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  return (
    <Box>
      <Box
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget />
          <PostsWidget />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0" />
            <FriendWidgets />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Msync;
