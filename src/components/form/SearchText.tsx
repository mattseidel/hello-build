import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { useForm } from "../../hooks/useForm";

interface SearchTextProps {
  searchAction: (search: string) => void;
}

export const SearchText = ({ searchAction }: SearchTextProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const { formData, handleChange } = useForm({
    text: "",
  });

  const performSearch = () => {
    // Aquí puedes implementar la lógica de búsqueda
    console.log("Realizando búsqueda:", searchTerm);

    // Restablecer el término de búsqueda después de realizar la búsqueda
    setSearchTerm("");
  };

  return (
    <Box display="flex" alignItems="center">
      <TextField
        label="Search"
        variant="outlined"
        name="text"
        value={formData.text}
        onChange={handleChange}
        sx={{ marginRight: "8px" }}
      />
      <Button
        variant="contained"
        size="large"
        onClick={() => searchAction(formData.text)}
        sx={{ flexShrink: 0 }}
      >
        Buscar
      </Button>
    </Box>
  );
};
