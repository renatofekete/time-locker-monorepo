import { useReducer } from "react";
import LoginForm from "../../../components/features/auth/LoginForm";
import AuthLayout from "../../../components/layout/AuthLayout";
import { useLogin } from "@/hooks/useProfile";
import { useNavigate } from "react-router";
import paths from "@/config/paths";
import Alert from "@/components/ui/alert/Alert";
import { useAuth } from "@/lib/auth/auth-provider";

const Login = () => {
  const { mutate, isPending, error, data, isSuccess, mutateAsync } = useLogin();
  const { isAuthenticated } = useAuth();
  const [state, dispatch] = useReducer(
    (
      state: { email: string; password: string },
      action: { type: string; payload: string }
    ) => {
      switch (action.type) {
        case "SET_EMAIL":
          return { ...state, email: action.payload };
        case "SET_PASSWORD":
          return { ...state, password: action.payload };
        default:
          return state;
      }
    },
    { email: "", password: "" }
  );
  const { email, password } = state;
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(
      { email, password },
      {
        onSuccess: () => {
          navigate(paths.home.getHref());
        },
      }
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch({
      type: name === "email" ? "SET_EMAIL" : "SET_PASSWORD",
      payload: value,
    });
  };

  return (
    <AuthLayout>
      <LoginForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        email={email}
        password={password}
      />
      {isPending && (
        <Alert
          className="fixed left-1/2 top-5 w-1/2 -translate-x-1/2 flex justify-center"
          text="Logging in..."
          type="info"
        />
      )}
      {error && (
        <Alert
          className="fixed left-1/2 top-20 w-1/2 -translate-x-1/2 flex justify-center"
          text={error instanceof Error ? error.message : "Login failed"}
          type="error"
        />
      )}
    </AuthLayout>
  );
};

export default Login;
