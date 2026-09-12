import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io, type Socket } from "socket.io-client";
import { setActiveUsers } from "../../features/user/user.slice";
import type { AppDispatch, RootState } from "../../store";

const API_URL = import.meta.env.VITE_API_URL;

let socket: Socket | null = null;

export const SocketManager = () => {
  const accessToken = useSelector(
    (state: RootState) => state.authSlice.accessToken,
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!accessToken) {
      socket?.disconnect();
      socket = null;
      return;
    }

    if (socket?.connected) {
      return;
    }

    socket = io(API_URL, {
      transports: ["websocket"],
      autoConnect: false,
      auth: {
        token: `Bearer ${accessToken}`,
      },
    });

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

    socket.connect();

    return () => {
      socket?.disconnect();
      socket = null;
    };
  }, [accessToken]);

  return null;
};

export const getSocket = () => socket;
