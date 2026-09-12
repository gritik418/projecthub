import { useDispatch, useSelector } from "react-redux";
import {
  saveToken,
  saveUser,
  selectAccessToken,
} from "../../features/auth/auth.slice";
import { useEffect, useState } from "react";
import {
  useGetMeQuery,
  useRefreshTokenMutation,
} from "../../features/auth/auth.api";
import { type AppDispatch } from "../../store";
import { Navigate, useLocation } from "react-router-dom";
import { useGetNotificationsQuery } from "../../features/notification/notification.api";

interface AuthProviderProps {
  children: React.ReactNode;
}

const PUBLIC_ROUTES = ["/login", "/register"];

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [refresh] = useRefreshTokenMutation();

  const dispatch = useDispatch<AppDispatch>();
  const accessToken = useSelector(selectAccessToken);
  useGetNotificationsQuery(undefined, {
    skip: !accessToken,
  });

  const location = useLocation();

  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    location.pathname.startsWith(route),
  );

  const {
    data: meResponse,
    isLoading: isLoadingMe,
    isError: isMeError,
  } = useGetMeQuery(undefined, {
    skip: !accessToken,
  });

  useEffect(() => {
    if (meResponse?.data) {
      dispatch(saveUser(meResponse.data));
      setIsCheckingAuth(false);
    }
  }, [meResponse, dispatch]);

  const handleRefreshToken = async () => {
    try {
      const result = await refresh().unwrap();

      if (result.data?.accessToken) {
        dispatch(
          saveToken({
            accessToken: result.data.accessToken,
          }),
        );
      } else {
        setIsCheckingAuth(false);
      }
    } catch (error) {
      setIsCheckingAuth(false);
    }
  };

  useEffect(() => {
    if (accessToken) {
      return;
    }

    handleRefreshToken();
  }, [accessToken]);

  useEffect(() => {
    if (accessToken && isMeError) {
      setIsCheckingAuth(false);
    }
  }, [accessToken, isMeError]);

  if (isCheckingAuth || (accessToken && isLoadingMe)) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (isPublicRoute && accessToken) {
    return <Navigate to="/dashboard" replace />;
  }

  if (!isPublicRoute && !accessToken) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default AuthProvider;
