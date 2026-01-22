"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    fetch("/api/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.role === "admin") {
          setAuthorized(true);
        } else {
          router.push("/challenges");
        }
      });
  }, [router]);

  if (!authorized) return null;

  return (
  <main className="container">
    <h1>Admin Panel</h1>

    <form
      onSubmit={async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        const res = await fetch("/api/admin/challenges", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: formData.get("title"),
            description: formData.get("description"),
            flag: formData.get("flag"),
            points: Number(formData.get("points")),
          }),
        });

        if (res.ok) {
          alert("Challenge created!");
          form.reset();
        } else {
          alert("Error creating challenge");
        }
      }}
    >
      <input name="title" placeholder="Challenge title" required />
      <input name="description" placeholder="Description" required />
      <input name="flag" placeholder="Correct flag" required />
      <input
        name="points"
        type="number"
        placeholder="Points"
        required
      />

      <button type="submit">Create Challenge</button>
    </form>
  </main>
);

}
