import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import {existingUserDetail } from "../../../helpers/db";
import {verifyPassword } from "../../../helpers/auth";

export const authOptions = {
    pages: {
        signIn: "/login"
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            // credentials: {
            //     username: { label: "Username", type: "text", placeholder: "jsmith" },
            //     password: { label: "Password", type: "password" }
            // },
            async authorize(credentials, req) {
                const obj={
                    email: credentials.username
                  };
                  const user = await existingUserDetail(obj);
                  const isValid = await verifyPassword(
                    credentials.password,
                    user.password
                  );
                if(user) {
                    return {
                        user: {
                            name: user.name
                        }
                    }
                }

                return null
            }
        })
    ],
}

export default NextAuth(authOptions)