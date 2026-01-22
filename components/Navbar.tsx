"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem("token");
    router.push("/login");
  }

  return (
    <nav className="navbar">
      <div className="nav-left">
        <span className="brand">CodeXcrew CTF</span>
      </div>

      <div className="nav-right">
        <Link href="/challenges">Challenges</Link>
        <Link href="/leaderboard">Leaderboard</Link>
        <button onClick={handleLogout} className="logout">
          Logout
        </button>
      </div>
    </nav>
  );
}
