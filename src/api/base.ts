export interface Auth {
    signIn: () => Promise<any>;
    signOut: () => Promise<void>;
}