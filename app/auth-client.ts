import {
    createAuthClient
} from "better-auth/react";

// Assuming your nest.js backend runs on port 8000. Provide the URL via env variables
export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000",
    fetchOptions: {
        credentials: "include",
    },
});

export const {
    signIn,
    signOut,
    signUp,
    useSession
} = authClient;