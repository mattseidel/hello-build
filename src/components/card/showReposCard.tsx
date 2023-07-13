import {
  Button,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import { useSpring, animated } from "@react-spring/web";
import { useEffect, useState } from "react";
import { FavoriteOutlined } from "@mui/icons-material/";
import { Repository } from "../../interfaces/repositories";
import {
  HeaderContainer,
  RepositoryItemCard,
  RepositoryItemCardTitle,
} from "../../styles/Card/RepositoryItem";
import { RepositoryIsFavorite } from "../Repositories/RepositoriesComponent";
import { RepositoryButtonContainer } from "../../styles/Card/RepositoryItem";

interface RepositoriesGridProps {
  repository: RepositoryIsFavorite;
  addFavorite: (repository: Repository) => void;
  removeFavorite: (repository: Repository) => void;
}

export const ShowReposCard: React.FC<RepositoriesGridProps> = ({
  repository,
  addFavorite,
  removeFavorite,
}: RepositoriesGridProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const springPropsStar = useSpring({
    transform: `scale(${isFavorite ? 1.1 : 1})`,
    config: { tension: 200, friction: 10 },
  });

  useEffect(() => {
    console.log(repository.isFavorite, repository.name);

    setIsFavorite(repository.isFavorite);
  }, [repository.isFavorite]);

  const handleFavoriteClick = () => {
    const { isFavorite, ...rest } = repository;

    if (isFavorite) {
      removeFavorite(rest);
    } else {
      addFavorite(rest);
    }
    setIsFavorite(!isFavorite);
  };

  const setDescription = () => {
    if (repository.description === null) {
      return "No description to show";
    }
    return repository.description;
  };

  const springs = useSpring({
    from: { opacity: 0, transform: "translate3d(-40px, 0px, 0)" },
    to: { opacity: 1, transform: "translate3d(0, 0px, 0)" },
    config: { tension: 200, friction: 10 },
    delay: 200,
  });

  const getLanguageIcon= () =>{
    const { language } = repository;
    switch (language) {
      case "TypeScript":
        return (
          <img
            src="https://img.icons8.com/color/48/000000/typescript.png"
            alt="typescript"
          />
        );
      case "JavaScript":
        return (
          <img
            src="https://img.icons8.com/color/48/000000/javascript--v1.png"
            alt="javascript"
          />
        );
      case "Java":
        return (
          <img
            src="https://img.icons8.com/color/48/000000/java-coffee-cup-logo--v1.png"
            alt="java"
          />
        );
      case "Python":
        return (
          <img
            src="https://img.icons8.com/color/48/000000/python--v1.png"
            alt="python"
          />
        );
      case "C#":
        return (
          <img
            src="https://img.icons8.com/color/48/000000/c-sharp-logo.png"
            alt="c#"
          />
        );
      case "C++":
        return (
          <img
            src="https://img.icons8.com/color/48/000000/c-plus-plus-logo.png"
            alt="c++"
          />
        );
      case "PHP":
        return (
          <img
            src="https://www.php.net//images/logos/php-logo.svg"
            alt="php"
            width={48}
          />
        );
      case "Ruby":
        return (
          <img
            src="https://img.icons8.com/color/48/000000/ruby-programming-language.png"
            alt="ruby"
          />
        );
      case "CSS":
        return (
          <img
            src="https://img.icons8.com/color/48/000000/css3.png"
            alt="css"
          />
        );
      case "HTML":
        return (
          <img
            src="https://img.icons8.com/color/48/000000/html-5--v1.png"
            alt="html"
          />
        );
      case "Shell":
        return (
          <img
            src="https://img.icons8.com/color/48/000000/console.png"
            alt="shell"
          />
        );
      default:
        return (
          <img
            src="https://img.icons8.com/color/48/000000/visual-studio.png"
            alt="visual studio"
          />
        );
    }
  }
  



  return (
    <animated.div style={springs}>
      <RepositoryItemCard>
        <CardHeader
          title={
            <HeaderContainer>
              <RepositoryItemCardTitle>
                {repository.name}
              </RepositoryItemCardTitle>
              {getLanguageIcon()}
            </HeaderContainer>
          }
        />
        <CardContent>
          <Typography variant="body2">{setDescription()}</Typography>
        </CardContent>
        <RepositoryButtonContainer>
          <IconButton onClick={handleFavoriteClick}>
            <animated.div style={springPropsStar}>
              <FavoriteOutlined color={isFavorite ? "secondary" : "inherit"} />
            </animated.div>
          </IconButton>
          <Button
            variant="outlined"
            color="primary"
            href={repository.html_url}
            target="_blank"
          >
            Go to Git
          </Button>
        </RepositoryButtonContainer>
      </RepositoryItemCard>
    </animated.div>
  );
};
