import { createContext, useState } from "react";
import { ErrorMessage } from "../interfaces/error/Error";

interface ErrorContextType {
  error: ErrorMessage | null;
  setError: (error: ErrorMessage | null) => void;
}

export const ErrorContext = createContext<ErrorContextType>({
  error: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setError: () => {},
});

interface ErrorProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

export const ErrorProvider = ({ children }: ErrorProviderProps) => {
  const [error, setError] = useState<ErrorMessage | null>(null);
  return (
    <ErrorContext.Provider value={{ error, setError }}>
      {children}
    </ErrorContext.Provider>
  );
};
