import styled from "@emotion/styled";
import { TextField } from "@mui/material";

export const FormTextField = styled(TextField)(()=>({
    width: "100%",
    margin: "10px 5px",
    "& .MuiInputBase-root": {
        width: "100%",
    },
}))