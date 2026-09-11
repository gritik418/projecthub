import { useDispatch, useSelector } from "react-redux";
import { saveToken, selectAccessToken } from "../../features/auth/auth.slice";
import { useEffect, useState } from "react";
import { useRefreshTokenMutation } from "../../features/auth/auth.api";
import { type AppDispatch } from "../../store";
import { Navigate, useLocation } from "react-router-dom";

interface AuthProviderProps {
  children: React.ReactNode;
}

const PUBLIC_ROUTES = ["/login", "/register"];

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [refresh] = useRefreshTokenMutation();

  const dispatch = useDispatch<AppDispatch>();
  const accessToken = useSelector(selectAccessToken);

  const location = useLocation();

  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    location.pathname.startsWith(route),
  );

  const handleRefreshToken = async () => {
    try {
      const result = await refresh().unwrap();

      if (result.data?.accessToken) {
        dispatch(
          saveToken({
            accessToken: result.data.accessToken,
          }),
        );
      }
    } catch (error) {
      setIsCheckingAuth(false);
    } finally {
      setIsCheckingAuth(false);
    }
  };

  useEffect(() => {
    if (accessToken) {
      setIsCheckingAuth(false);
      return;
    }

    handleRefreshToken();
  }, [accessToken]);

  if (isCheckingAuth) {
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
