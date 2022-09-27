import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "GB Pay",
      credentials: {
        cpf: { label: "CPF", type: "tell" },
        senha: { label: "Senha", type: "password" },
      },
      authorize: async (credentials) => {
        const payload = {
          cpf: credentials.cpf,
          senha: credentials.senha,
        };

        const res = await axios.post(
          `${process.env.NEXTAUTH_URL}/api/auth/login`,
          { cpf: payload.cpf, senha: payload.senha },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.data;
        console.log(res.data);
        
        if (data.error) {
          throw new Error("default");
        }
        const user = data;
        return user;
      },
    }),
  ],
  secret: process.env.SECRET,
  callbacks: {
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      // session.expires=token.exp;
      session.user.name = token.name;
      session.user.cpf = token.cpf as string;
      session.user.image = token.image as string;
      session.user.id = token.id as number;
      session.user.paf = token.paf;
      session.user.atendente = token.atendente as boolean;

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.name = user.nome as string;
        token.cpf = user.cpf;
        token.image = user.id;
        token.id = user.id;
        token.paf = user.paf;
        token.atendente = user.atendente;
      }
      return token;
    },
  },
  pages: {
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 10 * 24 * 60 * 60, // 10 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    secret: process.env.SECRET,
    maxAge: 10 * 24 * 60 * 60, // 10 days
  },
  events: {
    async signIn(message) {
      console.log(message);
    },
    async signOut(message) {
      console.log(message);
    },
    async createUser(message) {
      console.log(message);
    },
    async linkAccount(message) {
      console.log(message);
    },
    async session(message) {
      console.log(message);
    },
  },
  // debug: process.env.NODE_ENV === "development",
});
