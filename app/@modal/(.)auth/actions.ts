"use server"
import { authClient } from "@/app/components/AuthClient";
import { User } from "./page";
import { auth } from "@/app/auth";
import { cookies } from "next/headers";

export async function addUser(user: User) {
    if (user.email && user.pass && user.name) {


        const response = await auth.api.signUpEmail({
            body: {
                name: user.name,
                email: user.email,
                password: user.pass
            },
            asResponse: false // returns a response object instead of data
        });

        console.log(response.user)

        return response;

    }
}

export async function loginUser(user: User) {
    if (user.email && user.pass) {

        const { data, error } = await authClient.signIn.email({
            email: user.email,
            password: user.pass,
            // callbackURL: "/dashboard",
            // rememberMe: true
        }, {
            // callbacks
            onSuccess: (ctx) => {
                console.log(ctx.data)
            },

            onError: (ctx) => {
                alert(ctx.error.message)
                console.log(ctx.error)
            },
            onRequest: (ctx) => {
                //show loading
                console.log("loading");
            }
        })

    }

}
export async function handleSocialLogin(provider: string) {
    // Simulate social login
    console.log(`Signing in with ${provider}...`);
    // onAuthSuccess({ name: `${provider} User`, email: `user@${provider.toLowerCase()}.com` });
};