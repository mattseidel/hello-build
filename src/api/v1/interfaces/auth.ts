import { Register } from "../../../interfaces/Auth";

export interface IAuth {
    register(user:Register): Promise<any>;
    login(user:Register): Promise<any>;
    validateIsLogged(): Promise<any>;
}