import { Button } from "@mui/material";
import { VerticalForm } from "../../styles/form/Forms";
import { FormTextField } from "../../styles/form/TextField";
import { ButtonSection } from "../../styles/form/ButtonSection";
import { useForm } from "../../hooks/useForm";
import { Register } from "../../interfaces/Auth";
import { LoginWithEmailAndPAssword } from "../../api/v1/auth/LoginWithEmailAndPassword";
import { Link, useNavigate } from "react-router-dom";
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
  const { formData, handleChange } = useForm<Register>({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const { setError } = useContext(ErrorContext);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    const auth = new LoginWithEmailAndPAssword(email, password);
    auth
      .signIn()
      .then((data: UserCredential) => {
        setUser(data.user);
        navigate("/");
      })
      .catch((error: unknown) => {
        if (error instanceof FirebaseError) {
          const errorMessage = new AuthError(error.message);
          setError(errorMessage);
        }
        console.log(typeof error);
      });
  };

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
    <VerticalForm action="register" onSubmit={handleSubmit}>
      <FormTextField
        id="email"
        label="Email"
        variant="outlined"
        name="email"
        value={email}
        onChange={handleChange}
      />
      <FormTextField
        id="password"
        label="Password"
        type="password"
        variant="outlined"
        name="password"
        value={password}
        onChange={handleChange}
      />
      <p>
        New account? <Link to="/register">go to register</Link>
      </p>

      <ButtonSection>
        <Button variant="contained" color="info" size="large" type="submit">
          Login
        </Button>
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
