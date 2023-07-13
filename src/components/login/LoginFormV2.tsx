import { Button } from "@mui/material";
import { VerticalForm } from "../../styles/form/Forms";
import { ButtonSection } from "../../styles/form/ButtonSection";
import { useNavigate } from "react-router-dom";
import { GithubAuthProvider, UserCredential } from "firebase/auth";
import { ErrorContext } from "../../context/ErrorContext";
import { useContext } from "react";
import { FirebaseError } from "firebase/app";
import { AuthError } from "../../interfaces/error/AuthError";
import { LoginWithGitHub } from "../../api/v1/auth/LoginWithGitHub";
import { useAuth } from "../../context/AuthContext";
import { LocalStorage } from "../../classes/localStorage";

export const LoginForm = () => {
  const navigate = useNavigate();
  const localStorage = new LocalStorage();
  const { setUserCredentials, setUser } = useAuth();
  const { setError } = useContext(ErrorContext);

  const handleLoginWithGithub = () => {
    const auth = new LoginWithGitHub();
    auth
      .signIn()
      .then((data: UserCredential) => {
        localStorage.add("user", JSON.stringify(data));
        setUser(data.user);
        const credential = GithubAuthProvider.credentialFromResult(data);
        setUserCredentials(credential);
        navigate("/");
      })
      .catch((error) => {
        if (error instanceof FirebaseError) {
          const errorMessage = new AuthError(error.message);
          setError(errorMessage);
        }
        console.log(typeof error);
      });
  };

  return (
    <VerticalForm action="register">
      <ButtonSection>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={handleLoginWithGithub}
        >
          Login With Github
        </Button>
      </ButtonSection>
    </VerticalForm>
  );
};
