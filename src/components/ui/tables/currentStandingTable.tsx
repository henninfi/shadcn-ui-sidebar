"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetClassicLeagueStandings } from "@/hooks/useGetClassicLeagueStanding";
import { useGetGameweekPerManagerPerClassicLeague } from "@/hooks/useGetGameweekPerManager";
import { useGetFPLLeagueId } from "@/hooks/useGetLeagueId";
import { Standings, TeamData } from "../../../../SDK/projects_api/client";
import { useGetGameweekOverallInfo } from "@/hooks/useGetGameweekOverallInfo";
import { Event } from "../../../../SDK/projects_api/client";


export function FantasyTable() {
  const fplLeagueId = useGetFPLLeagueId();
  const { data: fplGameweekOverallInfo } = useGetGameweekOverallInfo();
  const { data: fplClassicLeagueStanding } = useGetClassicLeagueStandings(fplLeagueId);

  const lastEventId =
    fplGameweekOverallInfo && fplGameweekOverallInfo.length > 0
      ? fplGameweekOverallInfo[fplGameweekOverallInfo.length - 1].id
      : 1;

  const { data: fplGameweekPerManagerData } =
    useGetGameweekPerManagerPerClassicLeague(fplLeagueId, lastEventId.toString());

  const getGameweeksWonAndPrize = (standings: Standings) => {
    const rankPrizeMap: { [key: number]: number } = {
      1: 6000,
      2: 3000,
      3: 1500,
    };

    const rankCounts = standings.results.reduce((acc, team) => {
      acc[team.rank] = (acc[team.rank] || 0) + 1;
      return acc;
    }, {} as { [key: number]: number });

    return standings.results.map((team) => {
      let gameweeksWon: number[] = [];
      let gameweekPrize = 0;
      let rankPrize = 0;
      let totalTransferCost = 0;
      let totalPoints = 0;
      let totalBenchPoints = 0;

      fplGameweekOverallInfo?.forEach((event: Event) => {
        const firstRankTeams = standings.results.filter(
          (gwStanding) => gwStanding.rank === 1
        );

        if (firstRankTeams.some((gwStanding) => gwStanding.entry === team.entry)) {
          gameweeksWon.push(event.id);
          gameweekPrize += 150 / firstRankTeams.length;
        }

        const managerData: TeamData | undefined = fplGameweekPerManagerData
          ? fplGameweekPerManagerData[team.entry.toString()]
          : undefined;

        if (managerData) {
          totalTransferCost += managerData.entry_history.event_transfers_cost / 4;
          totalPoints += managerData.entry_history.points;
          totalBenchPoints += managerData.entry_history.points_on_bench;
        }
      });

      // Calculate rank prizes, considering ties
      if (team.rank === 1 && rankCounts[1] > 1) {
        // If there are multiple rank 1s, combine 1st, 2nd, and 3rd prize
        const prizePool =
          (rankPrizeMap[1] || 0) +
          (rankCounts[2] ? rankPrizeMap[2] || 0 : 0) +
          (rankCounts[3] ? rankPrizeMap[3] || 0 : 0);
        rankPrize = prizePool / rankCounts[1];
      } else if (team.rank === 2 && rankCounts[2] > 1) {
        // If there are multiple rank 2s, combine 2nd and 3rd prize
        const prizePool =
          (rankPrizeMap[2] || 0) + (rankCounts[3] ? rankPrizeMap[3] || 0 : 0);
        rankPrize = prizePool / rankCounts[2];
      } else if (team.rank === 3 && rankCounts[3] > 1) {
        // If there are multiple rank 3s, divide the 3rd prize
        rankPrize = (rankPrizeMap[3] || 0) / rankCounts[3];
      } else if (team.rank in rankPrizeMap) {
        // Otherwise, assign the normal prize for 1st, 2nd, or 3rd place
        rankPrize = rankPrizeMap[team.rank] || 0;
      }

      const totalPrize = (gameweekPrize + rankPrize).toFixed(0);

      return {
        ...team,
        gameweeksWon: gameweeksWon.join(", "),
        gameweekPrize: gameweekPrize.toFixed(0),
        rankPrize: rankPrize.toFixed(0),
        totalPrize: totalPrize,
        totalTransferCost: totalTransferCost.toFixed(0),
        totalPoints: totalPoints.toFixed(0),
        totalBenchPoints: totalBenchPoints.toFixed(0),
      };
    });
  };

  const standingsWithGameweeksWon = fplClassicLeagueStanding?.standings
    ? getGameweeksWonAndPrize(fplClassicLeagueStanding.standings)
    : [];

  return (
          <Table>
            <TableCaption>
              A list of Fantasy Premier League players and their performance.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Rank</TableHead>
                <TableHead className="w-[200px]">Team Name</TableHead>
                <TableHead>Player</TableHead>
                <TableHead>Total Points</TableHead>
                <TableHead>Points on Bench</TableHead>
                <TableHead>Gameweeks Won</TableHead>
                <TableHead className="text-right">Team Value</TableHead>
                <TableHead className="text-right">Bank</TableHead>
                <TableHead className="text-right">Total Budget</TableHead>
                <TableHead className="text-right">Transfer Hits</TableHead>
                <TableHead className="text-right">Gameweek Prize</TableHead>
                <TableHead className="text-right">Rank Prize</TableHead>
                <TableHead className="text-right">Total Prize</TableHead>
                <TableHead className="text-right sm:hidden">Player</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {standingsWithGameweeksWon.map((team, index) => {
                const managerData: TeamData | undefined = fplGameweekPerManagerData
                  ? fplGameweekPerManagerData[team.entry.toString()]
                  : undefined;

                return (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{team.rank}</TableCell>
                    <TableCell className="font-medium">{team.entry_name}</TableCell>
                    <TableCell className="font-medium">{team.player_name}</TableCell>
                    <TableCell>{team.totalPoints || "0"} ({managerData?.entry_history.points || "0"})</TableCell>
                    <TableCell>{team.totalBenchPoints || "0"}</TableCell>
                    <TableCell>{team.gameweeksWon || ""}</TableCell>
                    <TableCell className="text-right">
                      {managerData?.entry_history?.value
                        ? (
                            (managerData.entry_history.value -
                              managerData.entry_history.bank) /
                            10
                          ).toFixed(1)
                        : "0"}
                    </TableCell>
                    <TableCell className="text-right">
                      {managerData?.entry_history?.bank
                        ? (managerData.entry_history.bank / 10).toFixed(1)
                        : "0"}
                    </TableCell>
                    <TableCell className="text-right">
                      {managerData?.entry_history?.value
                        ? (managerData.entry_history.value / 10).toFixed(1)
                        : "0"}
                    </TableCell>
                    <TableCell className="text-right">
                      {team.totalTransferCost || "0"}
                    </TableCell>
                    <TableCell className="text-right">
                      {team.gameweekPrize || "0"}
                    </TableCell>
                    <TableCell className="text-right">{team.rankPrize || "0"}</TableCell>
                    <TableCell className="text-right">{team.totalPrize || "0"}</TableCell>
                    <TableCell className="text-right sm:hidden">
                      {team.player_name}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
    
  );
}
