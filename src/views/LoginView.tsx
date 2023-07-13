import { Card, CardHeader } from "@mui/material"
import { CenterCard } from "../styles/Card/CenterCard"
import {LoginForm} from "../components/login/LoginForm"
export const LoginView = () => {
  return (
    <CenterCard>
      <Card>
        <CardHeader title={<h1>Login Form</h1>} />

        <LoginForm />
      </Card>
    </CenterCard>
  )
}
