import { Repository } from "./repositories";

export interface Favorites{
    id: string;
    repository: Repository[];
}