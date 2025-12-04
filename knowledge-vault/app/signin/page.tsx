"use client";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/footer";

const SignInContent = () => {
  const router = useRouter();
  const { isSignedIn } = useUser();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/");
    }
  }, [isSignedIn, router]);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />

      <main className="min-h-screen bg-black text-white py-20">
        <div className="max-w-4xl mx-auto px-6">

          {/* --- Signed Out View --- */}
          <SignedOut>
            <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-10 shadow-xl">

              {/* Title */}
              <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Welcome to Knowledge Vault
                </h1>
                <p className="text-slate-300 mt-3 text-lg">
                  Sign in to explore and manage your knowledge
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">

                <SignInButton mode="modal">
                  <button
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 
                               hover:opacity-90 transition font-semibold shadow-lg"
                  >
                    Sign In
                  </button>
                </SignInButton>

                <SignUpButton mode="modal">
                  <button
                    className="px-6 py-3 rounded-xl bg-slate-800 border border-white/10
                               hover:bg-slate-700 transition font-semibold"
                  >
                    Create Account
                  </button>
                </SignUpButton>

              </div>

              {/* Divider */}
              <div className="text-center text-slate-400 my-6">
                <span className="text-sm">or continue with email</span>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">

                <div className="bg-slate-900/40 p-4 rounded-xl border border-white/10 
                                hover:scale-[1.03] hover:bg-slate-900/60 transition">
                  <span className="text-slate-300 text-sm">
                    Store & organize your knowledge
                  </span>
                </div>

                <div className="bg-slate-900/40 p-4 rounded-xl border border-white/10 
                                hover:scale-[1.03] hover:bg-slate-900/60 transition">
                  <span className="text-slate-300 text-sm">
                    Explore curated collections
                  </span>
                </div>

                <div className="bg-slate-900/40 p-4 rounded-xl border border-white/10 
                                hover:scale-[1.03] hover:bg-slate-900/60 transition">
                  <span className="text-slate-300 text-sm">
                    Take interactive quizzes
                  </span>
                </div>

              </div>

            </div>

            <p className="text-center text-slate-500 mt-6 text-sm">
              Secure authentication powered by Clerk
            </p>
          </SignedOut>

          {/* --- Signed In View --- */}
          <SignedIn>
            <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-12 text-center shadow-xl">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Welcome Back!
              </h2>
              <p className="text-slate-300 mt-3 text-lg">
                You're logged into Knowledge Vault
              </p>

              <div className="my-6 flex justify-center">
                <UserButton />
              </div>

              <p className="text-slate-400 text-sm">Redirecting...</p>
            </div>
          </SignedIn>

        </div>
      </main>

      <Footer />
    </div>
  );
};

const Page = () => {
  return <SignInContent />;
};

export default Page;
