import { Card, CardHeader } from "@mui/material";
import { RegisterForm } from "../components/register/RegisterForm";
import { CenterCard } from "../styles/Card/CenterCard";

export const RegisterView = () => {
  return (
    <CenterCard>
      <Card>
        <CardHeader title={<h1>Register Form</h1>} />

        <RegisterForm />
      </Card>
    </CenterCard>
  );
};
