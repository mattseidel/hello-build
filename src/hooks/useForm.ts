import { useState } from "react";

export const useForm = <T>(data: T) => {
  const [formData, setFormData] = useState<T>(data);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return { formData, handleChange };
};
