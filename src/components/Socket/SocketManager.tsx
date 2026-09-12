import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { setActiveUsers } from "../../features/user/user.slice";
import type { AppDispatch, RootState } from "../../store";

export const socket = io(import.meta.env.VITE_API_URL, {
  transports: ["websocket"],
  autoConnect: false,
});

export const SocketManager = () => {
  const accessToken = useSelector(
    (state: RootState) => state.authSlice.accessToken,
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!accessToken) {
      socket.disconnect();
      return;
    }

    socket.auth = {
      token: `Bearer ${accessToken}`,
    };

    socket.connect();

    socket.on("connect", () => {
      console.log("Socket connected:", socket?.id);
    });

    socket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error.message);
    });

    socket.on("active-users", (users) => {
      dispatch(setActiveUsers({ users }));
    });

    return () => {
      socket.off("connect");
      socket.off("connect_error");
      socket.off("disconnect");
    };
  }, [accessToken]);

  return null;
};

export const getSocket = () => socket;
