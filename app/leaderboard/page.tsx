import bkFetch from "@/services/backend.services";
import Footer from "../../components/Footer";

import LeaderboardHome from "./leaderboard-home";
import { MAINDAYCONTEST_URL } from "@/lib/constants/be";
import { Game } from "@/components/models/game.model";

export default async function Page() {
  let data: any = [];
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  let response = await fetch(MAINDAYCONTEST_URL, {
    method: "GET",
    cache: "no-store",
    headers,
  });
  if (!response.ok) {
    console.error(await response.text());
    throw new Error(`An error occured: ${response.status}`);
  } else {
    data = await response.json();
  }

  return (
    <>
      <LeaderboardHome data={data as Game[]} />
      <Footer />
    </>
  );
}
