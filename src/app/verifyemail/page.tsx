"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function VerifyEmailPage() {
  // const route = useRouter();
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [isError, setIsError] = useState(false);

  const verifyEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
      setIsError(false);
    } catch (error: any) {
      setIsError(true);
      console.log(error.response.message);
    }
  };

  useEffect(() => setToken(window.location.search.split("=")[1] || ""), []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      {token && (
        <>
          <h1 className="text-4xl mb-5">Click For Verify Email</h1>
          <button
            onClick={verifyEmail}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          >
            Verify Email
          </button>
        </>
      )}

      {verified && (
        <div>
          <h2 className="text-2xl">Email Verified</h2>
          <Link
            href="/login"
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          >
            Login
          </Link>
        </div>
      )}
      {isError || token.length === 0 && (
        <div>
          <h2 className="text-2xl bg-red-500 text-black">Error</h2>
        </div>
      )}
    </div>
  );
}

export default VerifyEmailPage;
