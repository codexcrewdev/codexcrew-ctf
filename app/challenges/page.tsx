"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Challenge {
  _id: string;
  title: string;
  description: string;
  points: number;
}

export default function ChallengesPage() {
  const router = useRouter();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [flag, setFlag] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    fetch("/api/challenges")
      .then((res) => res.json())
      .then((data) => setChallenges(data));
  }, [router]);

  async function submitFlag(challengeId: string) {
    setMessage("");

    const token = localStorage.getItem("token");
    if (!token) return;

    const res = await fetch("/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        challengeId,
        flag,
      }),
    });

    const data = await res.json();

    if (data.correct) {
      setMessage("✅ Correct flag!");
    } else {
      setMessage("❌ Wrong flag. Try again.");
    }

    setFlag("");
    setSelectedId(null);
  }

  return (
    <main className="container">
      <h1>Challenges</h1>

      {challenges.map((ch) => (
        <div key={ch._id} className="card">
          <h2>{ch.title}</h2>
          <p>{ch.description}</p>
          <p className="points">{ch.points} points</p>

          {selectedId === ch._id ? (
            <>
              <input
                placeholder="Enter flag"
                value={flag}
                onChange={(e) => setFlag(e.target.value)}
              />
              <button onClick={() => submitFlag(ch._id)}>Submit</button>
            </>
          ) : (
            <button onClick={() => setSelectedId(ch._id)}>
              Submit Flag
            </button>
          )}
        </div>
      ))}

      {message && <p className="message">{message}</p>}
    </main>
  );
}
