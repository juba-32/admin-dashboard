import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
  async authorize(credentials) {
  if (!credentials?.email || !credentials?.password) {
    console.error("Missing credentials:", credentials);
    return null;
  }

  const users = [
    { id: "1", name: "Admin", email: "admin@example.com", password: "1234" },
    { id: "2", name: "User", email: "user@example.com", password: "1234" },
  ];

  const user = users.find(
    (u) =>
      u.email === credentials.email.trim() &&
      u.password === credentials.password.trim()
  );

  if (user) {
    console.log("✅ Authenticated:", user.email);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  console.error("❌ Invalid credentials:", credentials.email);
  return null;
}

    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
