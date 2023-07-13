import { Button } from "@mui/material";
import { VerticalForm } from "../../styles/form/Forms";
import { FormTextField } from "../../styles/form/TextField";
import { ButtonSection } from "../../styles/form/ButtonSection";
import { useForm } from "../../hooks/useForm";
import { Register } from "../../interfaces/Auth";
import { LoginWithEmailAndPAssword } from "../../api/v1/auth/LoginWithEmailAndPassword";
import { Link, useNavigate } from "react-router-dom";
import { UserCredential } from "firebase/auth";
import { LocalStorage } from "../../classes/localStorage";
import { authUtils } from "../../api/v1/auth/authUtils";
import { useAuth } from "../../context/AuthContext";

export const RegisterForm = () => {
  const localStorage = new LocalStorage();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { user, setUser } = useAuth();
  const { formData, handleChange } = useForm<Register>({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const auth = new LoginWithEmailAndPAssword(email, password);
    auth
      .register()
      .then((data: UserCredential) => {
        setUser(data.user);
        navigate("/");
      })
      .catch(console.error);
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
      <Link to="/login">go to login?</Link>
      <ButtonSection>
        <Button variant="contained" color="info" size="large" type="submit">
          Register
        </Button>
      </ButtonSection>
    </VerticalForm>
  );
};
