"use client";

import { Game } from "@/components/models/game.model";
import { Label } from "@/components/ui/label";
import {
  SelectItem,
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { GameTypes } from "@/lib/constants/auth";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function LeaderboardHome({ data }: { data: Game[] }) {
  const activeGame = useRef("odd_one_out");
  const [activeGameState, setActiveGameState] = useState(activeGame.current);
  const [allData, setAllData] = useState(data);
  const [leaderboardData, setLeaderboardData] = useState(
    data?.filter((data) => data.game == activeGame.current)
  );
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchData = async () => {
    const res = await fetch("/api/games", { method: "GET", cache: "no-store" });
    setLoading(false);
    if (!res.ok) {
      toast({
        variant: "destructive",
        title: "Could not fetch data",
      });
    }
    if (!res.ok) {
      throw new Error(`An error occured: ${res.ok}`);
    }
    const result = await res.json();
    setAllData(result);
    setLeaderboardData(
      result.filter((data: Game) => data.game == activeGame.current)
    );
  };
  useEffect(() => {
    // fetchData()
    activeGame.current = activeGameState;
    setLeaderboardData(() =>
      allData.filter((data) => data.game == activeGame.current)
    );
  }, [activeGameState]);

  useEffect(() => {
    let interval = setInterval(() => {
      setLoading(true);
      fetchData();
    }, 10000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <main className='bg-black text-white'>
      <section className='flex flex-col w-full max-w-6xl mx-auto space-y-4'>
        <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-google-yellow h-min text-center'>
          Main Day Contest Leaderboard
        </h2>
        <div className='flex justify-start items-center space-y-4 mt-4'>
          <div className='flex flex-col gap-y-2 w-full max-w-xl'>
            <Label>Select Game</Label>
            <Select
              onValueChange={(e) => {
                setActiveGameState(e);
              }}
            >
              <SelectTrigger className='w-full'>
                <SelectValue placeholder={`${GameTypes.odd_one_out}`} />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(GameTypes).map((game) => (
                  <SelectItem value={game[0]} key={game[0]}>
                    {game[1]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {loading && <Loader2 className='ml-2 size-4 animate-spin' />}
        </div>
        <section
          style={{ marginTop: "250px", marginBottom: "250px" }}
          className='hidden md:flex relative justify-center items-end'
        >
          {leaderboardData[1] && (
            <div className='flex top-28 flex-col justify-center relative'>
              <div
                id='top'
                className='flex items-center gap-y-20 h-full flex-col absolute left-1/2 transform -translate-x-1/2'
                style={{ bottom: "32%" }}
              >
                <div className='flex items-center flex-col'>
                  <img src='/assets/images/mascot.webp' alt='' />
                  <button
                    className='bg-google-blue w-32 text-center text-lg font-bold border-white border-2 rounded-md'
                    disabled
                  >
                    2nd
                  </button>
                </div>
                <div className='flex flex-col text-center justify-center gap-y-2 py-2 text-black h-20 w-44 text-xs text-wrap bg-white rounded-md border'>
                  {/* <span className=" font-semibold">{fakeEventData.title}</span>
                <span className="text-wrap">{fakeEventData.name}</span> */}
                  <span
                    className='w-full font-bold text-xl text-wrap'
                    style={{ textWrap: "wrap" }}
                  >
                    {leaderboardData[1]?.name}
                  </span>
                </div>
              </div>
              <svg
                width='243'
                height='455'
                viewBox='0 0 200 455'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M0.0078125 29.5312L140.566 0.000545715L242.046 49.1549L101.488 78.6856L0.0078125 29.5312Z'
                  fill='url(#paint0_linear_1338_1032)'
                />
                <path
                  d='M241.596 49.0469L101.488 78.685L101.939 455L241.596 416.381V49.0469Z'
                  fill='#4285F4'
                />
                <path
                  d='M0.000167847 29.2891L101.488 78.4781L101.938 455.001L0.000167847 416.36V29.2891Z'
                  fill='#4285F4'
                />
                <path
                  d='M0.000167847 29.5234L101.488 78.6853L101.938 455L0.000167847 416.381V29.5234Z'
                  fill='black'
                  fillOpacity='0.25'
                />
                <defs>
                  <linearGradient
                    id='paint0_linear_1338_1032'
                    x1='-33.2312'
                    y1='66.1119'
                    x2='411.851'
                    y2='344.174'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#4285F4' />
                    <stop offset='1' stopColor='white' />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          )}
          {leaderboardData[0] && (
            <div className='flex top-10 flex-col justify-center relative'>
              <div
                id='top'
                className='flex items-center gap-y-20 h-full flex-col absolute left-1/2 transform -translate-x-1/2'
                style={{ bottom: "32%" }}
              >
                <div className=' flex items-center flex-col'>
                  <img src='/assets/images/mascot.webp' alt='' />
                  <button
                    className='bg-google-red w-32 text-center text-lg font-bold border-white border-2 rounded-md'
                    disabled
                  >
                    1st
                  </button>
                </div>
                <div className='flex flex-col text-center justify-center gap-y-2 py-2 text-black h-20 w-44 text-xs text-wrap bg-white rounded-md border'>
                  {/* <span className=" font-semibold">{fakeEventData.title}</span>
                <span className="text-wrap">{fakeEventData.name}</span> */}

                  <span className=' font-bold text-xl'>
                    {leaderboardData[0].name}
                  </span>
                </div>
              </div>
              <svg
                width='243'
                height='455'
                viewBox='0 0 243 455'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M0.0078125 29.5312L140.566 0.000545715L242.046 49.1549L101.488 78.6856L0.0078125 29.5312Z'
                  fill='url(#paint0_linear_1338_1045)'
                />
                <path
                  d='M241.596 49.0469L101.488 78.685L101.939 455L241.596 416.381V49.0469Z'
                  fill='#E84435'
                />
                <path
                  d='M0.000167847 29.2891L101.488 78.5L101.938 455.001L0.000167847 416.36V29.2891Z'
                  fill='#E84435'
                />
                <path
                  d='M0.000167847 29.5234L101.488 78.6853L101.938 455L0.000167847 416.381V29.5234Z'
                  fill='black'
                  fillOpacity='0.25'
                />
                <defs>
                  <linearGradient
                    id='paint0_linear_1338_1045'
                    x1='-279.5'
                    y1='79.0005'
                    x2='217.689'
                    y2='432.57'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#E84435' />
                    <stop offset='1' stopColor='white' />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          )}
          {leaderboardData[2] && (
            <div className='flex top-40 flex-col justify-center relative'>
              <div
                id='top'
                className='flex items-center gap-y-20 h-full flex-col absolute left-1/2 transform -translate-x-1/2'
                style={{ bottom: "32%" }}
              >
                <div className='flex items-center flex-col'>
                  <img src='/assets/images/mascot.webp' alt='' />
                  <button
                    className='bg-google-green w-32 text-center text-lg font-bold border-white border-2 rounded-md'
                    disabled
                  >
                    3rd
                  </button>
                </div>
                <div className='flex flex-col text-center justify-center gap-y-2 py-2 text-black h-20 w-44 text-xs text-wrap bg-white rounded-md border'>
                  {/* <span className=" font-semibold">{fakeEventData.title}</span>
                <span className="text-wrap">{fakeEventData.name}</span> */}
                  <span className=' font-bold text-xl'>
                    {leaderboardData[2]?.name}
                  </span>
                </div>
              </div>
              <svg
                width='243'
                height='455'
                viewBox='10 0 243 455'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M0.0078125 29.5312L140.566 0.000545715L242.046 49.1549L101.488 78.6856L0.0078125 29.5312Z'
                  fill='url(#paint0_linear_1338_1027)'
                />
                <path
                  d='M241.596 49.0469L101.488 78.685L101.939 455L241.596 416.381V49.0469Z'
                  fill='#0F9D58'
                />
                <path
                  d='M0.000167847 29.2891L101.488 78.4781L101.938 455.001L0.000167847 416.36V29.2891Z'
                  fill='#0F9D58'
                />
                <path
                  d='M0.000167847 29.5234L101.488 78.6853L101.938 455L0.000167847 416.381V29.5234Z'
                  fill='black'
                  fillOpacity='0.25'
                />
                <defs>
                  <linearGradient
                    id='paint0_linear_1338_1027'
                    x1='-225.501'
                    y1='79.0006'
                    x2='411.526'
                    y2='540.937'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0F9D58' />
                    <stop offset='1' stopColor='white' />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          )}
          <div className='bg-black h-72 absolute  z-10 w-full top-full flex justify-center '></div>
        </section>
        <div className='flex flex-col bg-black md:relative w-full -top-72 z-50 justify-center'>
          <div className='py-10 overflow-x-auto sm:-mx-6 lg:-mx-8'>
            <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-google-yellow h-min text-center'>
              List of participants
            </h2>
            <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
              <div className='overflow-hidden'>
                <table className='min-w-full text-left text-sm font-light text-surface dark:text-white '>
                  <thead className='border-b border-neutral-200 font-medium dark:border-white/10 text-center'>
                    <tr>
                      <th scope='col' className='px-6 py-4'>
                        Name
                      </th>
                      <th scope='col' className='px-6 py-4'>
                        Email
                      </th>
                      <th scope='col' className='px-6 py-4'>
                        Game
                      </th>
                      <th scope='col' className='px-6 py-4'>
                        Contest Score
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboardData &&
                      leaderboardData.map((d: Game, key: number) => {
                        return (
                          <tr
                            className={cn(
                              "p-2 *:pr-8 text-black text-xs bg-white rounded-md text-center"
                            )}
                            key={key}
                          >
                            <td className='whitespace-nowrap px-6 py-4'>
                              {d?.name}
                            </td>
                            <td className='whitespace-nowrap px-6 py-4'>
                              {d?.email}
                            </td>
                            <td className='whitespace-nowrap px-6 py-4'>
                              {GameTypes[d?.game as keyof typeof GameTypes]}
                            </td>
                            <td className='whitespace-nowrap px-6 py-4'>
                              <ul>{d.score}</ul>
                            </td>
                          </tr>
                        );
                      })}
                    {!leaderboardData ||
                      (leaderboardData.length == 0 && (
                        <span className='w-full mx-auto'>
                          No players found yet
                        </span>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
