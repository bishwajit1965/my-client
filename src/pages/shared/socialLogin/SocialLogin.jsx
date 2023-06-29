import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

const SocialLogin = () => {
  const { googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const handleGoogleLogin = (event) => {
    event.preventDefault();
    googleSignIn()
      .then((result) => {
        const loggedInUser = result.user;
        console.log(loggedInUser);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="text-center my-2">
      <button
        className="btn btn-circle btn-primary btn-outline text-2xl font-bold"
        onClick={handleGoogleLogin}
      >
        G
      </button>
    </div>
  );
};

export default SocialLogin;
