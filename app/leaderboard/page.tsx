"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface UserScore {
  _id: string;
  username: string;
  score: number;
}

export default function LeaderboardPage() {
  const router = useRouter();
  const [users, setUsers] = useState<UserScore[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    fetch("/api/leaderboard")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, [router]);

  return (
    <main className="container">
      <h1>Leaderboard</h1>

      <div className="leaderboard">
        {users.map((user, index) => (
          <div key={user._id} className="leaderboard-row">
            <span className="rank">#{index + 1}</span>
            <span className="name">{user.username}</span>
            <span className="score">{user.score}</span>
          </div>
        ))}
      </div>
    </main>
  );
}
