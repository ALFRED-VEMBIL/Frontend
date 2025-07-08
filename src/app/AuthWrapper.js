// app/AuthWrapper.jsx
"use client";
import { useEffect, useState } from "react";

export default function AuthWrapper({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/feedspotclone/check-auth.php", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          setIsAuthenticated(true);
          console.log("✅ Logged in as", data.user.email);
        } else {
          setIsAuthenticated(false);
          console.log("❌ Not authenticated");
        }
      })
      .catch((err) => {
        console.error("Error during auth check:", err);
        setIsAuthenticated(false);
      });
  }, []);

  return <>{children}</>;
}
