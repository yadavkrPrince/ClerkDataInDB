// components/Navbar.jsx
// This code :- useEffect call the api when user logged in automatically

"use client";
import React, { useEffect } from "react";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      fetch("/api/auth/sync")
        .then((res) => {
          if (!res.ok) throw new Error("Sync failed");
          return res.json();
        })
        .then((data) => console.log("Sync successful:", data))
        .catch((err) => console.error("Sync error:", err));
    }
  }, [isLoaded, isSignedIn]);

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-100">
      <div className="flex gap-4">
        <SignedOut>
          <SignInButton>Sign In</SignInButton>
          <SignUpButton>
            <button className="bg-blue-600 text-white px-4 py-2 rounded">Sign Up</button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <div className="flex items-center gap-2">
            <UserButton />
          </div>
        </SignedIn>
      </div>
    </nav>
  );
}
