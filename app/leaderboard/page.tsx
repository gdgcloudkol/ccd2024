import bkFetch from "@/services/backend.services";
import Footer from "../../components/Footer";

import LeaderboardHome from "./leaderboard-home";
import { MAINDAYCONTEST_URL } from "@/lib/constants/be";
import { Game } from "@/components/models/game.model";

export default async function Page() {
  let data: any = [];

  let response = await bkFetch(MAINDAYCONTEST_URL, {
    method: "GET",
    cache: "no-store",
    headers: {
      "content-type": "application/json",
    },
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
