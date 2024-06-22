import Nav from "@/components/nav";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Layout({ children }) {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div
        className="bg-green-900 min-h-screen flex flex-col items-center justify-center"
        style={{
          backgroundImage: `url("https://images.pexels.com/photos/6871938/pexels-photo-6871938.jpeg?auto=compress&cs=tinysrgb&w=600")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-8xl font-bold text-white mt-15 mb-15" style={{ textAlign: "top" }}>
          Welcome To KrushiSaathi
        </h1>
        <p className="text-xl text-white text-center mb-8">
          We aim to provide a wide range of functionalities aimed at improving
          crop management, decision-making, and the overall agricultural
          ecosystem.
        </p>
        <button
          onClick={() => signIn("google")}
          className="bg-white text-green-900 font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 mt-4"
        >
          Login with Google
        </button>
      </div>
    );
  }

  return (
    <div
      className="bg-green-900 min-h-screen flex"
      style={{
        backgroundImage: `url("https://images.pexels.com/photos/6871938/pexels-photo-6871938.jpeg?auto=compress&cs=tinysrgb&w=600")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Nav />
      <div className="bg-white flex-grow mt-2 mr-2 mb-2 rounded-lg p-4">
        {children}
      </div>
    </div>
  );
}
