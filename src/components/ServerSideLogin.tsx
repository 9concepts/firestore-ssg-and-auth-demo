import router from "next/router";
import { useState } from "react";

export const ServerSideLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setPassword(e.target.value);
  };

  const handleSignIn = async () => {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      router.push("/");
    } else {
      console.error(response.status);
    }
  };

  return (
    <div className="grid gap-4">
      <div>
        <div className="grid grid-rows-2 grid-cols-2 gap-2">
          <label htmlFor="email">Email</label>
          <input
            className="text-black"
            id="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
          <label htmlFor="password">Password</label>
          <input
            className="text-black"
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>

        <button
          className="rounded px-4 py-2 bg-gray-800 hover:bg-gray-700"
          onClick={handleSignIn}
        >
          Login
        </button>
      </div>
    </div>
  );
};
