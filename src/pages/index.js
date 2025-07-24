import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 flex items-center justify-center px-4">
      <div className="text-center text-white space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg animate-pulse">
          Welcome to the Dashboard
        </h1>

        <div className="flex flex-col md:flex-row justify-center gap-6 mt-8">
          <button
            onClick={() => router.push("/auth/signup")}
            className="px-8 py-4 text-xl font-semibold rounded-full shadow-lg transition-all bg-white text-purple-700 hover:scale-105 hover:bg-purple-100">
            Signup
          </button>

          <button
            onClick={() => router.push("/auth/login")}
            className="px-8 py-4 text-xl font-semibold rounded-full shadow-lg transition-all bg-white text-pink-700 hover:scale-105 hover:bg-pink-100">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
