import { getAuth, GithubAuthProvider, UserCredential } from "firebase/auth";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { LocalStorage } from "../classes/localStorage";
import RepositoriesGrid from "../components/Repositories/RepositoriesComponent";
import { useLocation } from "react-router-dom";
import { RepositoryType } from "../interfaces/repositoryFactory";
import NavBar from "../components/navbar/Navbar";
import { ResetDiv } from "../styles/home/resetPosition";
export const HomeView = () => {
  const { user, setUser, setUserCredentials } = useAuth();

  const { pathname } = useLocation();

  console.log(pathname);

  useEffect(() => {
    const localStorage = new LocalStorage();
    setUser(getAuth().currentUser);
    const data = localStorage.get("user");
    if (!data) return;
    const userCredential = JSON.parse(data) as UserCredential;
    console.log(user);
    const credential = GithubAuthProvider.credentialFromResult(userCredential);
    setUserCredentials(credential);
  }, [getAuth().currentUser]);

  return (
    <>
      <NavBar />
      <ResetDiv>
        <h1>Home</h1>
        {user ? (
          <>
            <h1>welcome {user.displayName}</h1>
            <RepositoriesGrid></RepositoriesGrid>
          </>
        ) : (
          <h1>please login</h1>
        )}
      </ResetDiv>
    </>
  );
};
