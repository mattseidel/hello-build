import { Card, Typography } from "@mui/material";
import styled from "@emotion/styled";

export const RepositoryItemCard = styled(Card)(() => ({
  minWidth: 275,
  backgroundColor: "#f5f5f5",
  marginBottom: "20px",
}));

export const RepositoryItemCardTitle = styled(Typography)(() => ({
  fontSize: 20,
  fontWeight: "bold",
  marginBottom: "10px",
}));
