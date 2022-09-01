import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { existingUserDetail } from "../../../helpers/db";
import { verifyPassword } from "../../../helpers/auth";

export const authOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      // credentials: {
      //     username: { label: "Username", type: "text", placeholder: "jsmith" },
      //     password: { label: "Password", type: "password" }
      // },
      async authorize(credentials, req) {
        const obj = {
          email: credentials.username,
        };
        const user = await existingUserDetail(obj);
        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );
        if (isValid && user) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      // first time jwt callback is run, user object is available
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }

      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }

      return session;
    },
  },
};

export default NextAuth(authOptions);
