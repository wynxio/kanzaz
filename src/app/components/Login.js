"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { uname, password as pwd, role, name } from "../manageaccountadmin/user.json";
import useAppStore from "../store/useStore";

export const Login = () => {
  const router = useRouter();
  const setLogin = useAppStore((state) => state.setLogin);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const goToDashBoard = () => {
    router.push("/manageaccountadmin/dashboard");
  };

  const submitLogin = (e) => {
    e.preventDefault();

    if (username === uname && password === pwd) {
      setLogin(role, name);
      goToDashBoard();
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-2">
          Learning Admin Login
        </h1>
        <h2 className="text-lg text-center text-gray-600 mb-6">
          Login
        </h2>

        <form onSubmit={submitLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
