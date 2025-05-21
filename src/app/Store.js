import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { authApi } from "@/Features/api/authApi";
import { courseApi } from "@/Features/api/courseApi";
import { lectureApi } from "@/Features/api/lectureApi";
import { purchaseApi } from "@/Features/api/purchaseApi";
import { progressApi } from "@/Features/api/ProgressApi";
import chatReducer from "../Features/chatSlice";
import { PostApi } from "@/Features/api/postApi";
export const appStore = configureStore({
  reducer: rootReducer,
  chat: chatReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      
      authApi.middleware,
      courseApi.middleware,
      lectureApi.middleware,
      purchaseApi.middleware,
      progressApi.middleware,
      PostApi.middleware
    ),
  devTools: true,
});

const initializeApp = async () => {
  await appStore.dispatch(
    authApi.endpoints.getUserProfile.initiate(
      {},
      {
        forceRefetch: true,
      }
    )
  );
};

initializeApp();
