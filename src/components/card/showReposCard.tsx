import {
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
  RepositoryItemCard,
  RepositoryItemCardTitle,
} from "../../styles/Card/RepositoryItem";
import { RepositoryIsFavorite } from "../Repositories/RepositoriesComponent";

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

  return (
    <animated.div style={springs}>
      <RepositoryItemCard>
        <CardHeader
          title={
            <RepositoryItemCardTitle>{repository.name}</RepositoryItemCardTitle>
          }
        />
        <CardContent>
          <Typography variant="body2">{setDescription()}</Typography>
        </CardContent>
        <CardActions>
          <IconButton onClick={handleFavoriteClick}>
            <animated.div style={springPropsStar}>
              <FavoriteOutlined color={isFavorite ? "secondary" : "inherit"} />
            </animated.div>
          </IconButton>
          {/* Otros botones aquí */}
        </CardActions>
      </RepositoryItemCard>
    </animated.div>
  );
};
