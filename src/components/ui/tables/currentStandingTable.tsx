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
import { useGetGameweeksPerManagerPerClassicLeagueQueries } from "@/hooks/useGetGameweekPerManager";
import { useGetFPLLeagueId, useGetLeagueId } from "@/hooks/useGetLeagueId";
import type { Standings, Standing, TeamData, LeaguePrizeOut,Event } from "@/client/types.gen";
import { useGetGameweekOverallInfo } from "@/hooks/useGetGameweekOverallInfo";
import { useGetLeaguePrizes } from "@/hooks/useFPLPrizes";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

function distributePrizes(
  fplGameweekPerManagerData: UseQueryResult<Record<string, TeamData>, Error>[],
  prize: LeaguePrizeOut,
  numberOfGameweeks: number
): { [entryId: number]: number } {
  const prizeDistribution: { [entryId: number]: number } = {};

  const fromGwIndex = prize.from_gw === 1 ? 0 : prize.from_gw as number - 2;
  const teamData_from_gw = fplGameweekPerManagerData[fromGwIndex];
  const teamData_to_gw = fplGameweekPerManagerData[prize.to_gw as number - 1];

  if (teamData_from_gw.isSuccess && teamData_to_gw?.isSuccess) {
    const deltas = Object.keys(teamData_to_gw.data).map((entryId) => {
      const toGwData = teamData_to_gw.data[entryId];
      const fromGwData = teamData_from_gw.data[entryId];

      let deltaPoints: number;

      if (prize.from_gw === prize.to_gw) {
        deltaPoints = toGwData?.entry_history.total_points || 0;
      } else {
        deltaPoints =
          (toGwData?.entry_history.total_points || 0) -
          (fromGwData?.entry_history.total_points || 0);
      }

      return {
        entry: parseInt(entryId, 10),
        deltaPoints,
      };
    });

    deltas.sort((a, b) => b.deltaPoints - a.deltaPoints);
    deltas.forEach((delta, index) => {
      const distribution = prize.distributions?.find(
        (dist) => dist.rank === index + 1
      );
      if (distribution) {
        prizeDistribution[delta.entry] =
          ((prize.total_prize / numberOfGameweeks) * (distribution.percentage as number)) / 100;
      }
    });
  }

  return prizeDistribution;
}



export function FantasyTable() {
  const fplLeagueId = useGetFPLLeagueId();
  const leagueId = useGetLeagueId();


  const { data: prizes, isSuccess: prizesIsSuccess } = useGetLeaguePrizes(leagueId);
  const { data: fplGameweekOverallInfo } = useGetGameweekOverallInfo();
  const { data: fplClassicLeagueStanding } = useGetClassicLeagueStandings(fplLeagueId ? fplLeagueId : "314");

  const lastEventId =
    fplGameweekOverallInfo && fplGameweekOverallInfo.length > 0
      ? fplGameweekOverallInfo[fplGameweekOverallInfo.length - 1].id
      : 1;

  // Create the range from 1 to lastEventId
  const eventRange = Array.from({ length: lastEventId }, (_, i) => i + 1);

  const fplGameweekPerManagerData = useGetGameweeksPerManagerPerClassicLeagueQueries(fplLeagueId, lastEventId);

  const getGameweeksWonAndPrize = (standings: Standings, prizes: LeaguePrizeOut[]) => {
    return standings.results.map((team) => {
      let totalTransferCost = 0;
      let totalPoints = 0;
      let totalBenchPoints = 0;
  
      fplGameweekOverallInfo?.forEach((event: Event) => {
        const managerData: TeamData | undefined =
          fplGameweekPerManagerData[event.id-1]?.data?.[team.entry.toString()];
  
        if (managerData) {
          totalTransferCost += managerData.entry_history.event_transfers_cost / 4;
          totalPoints += managerData.entry_history.points;
          totalBenchPoints += managerData.entry_history.points_on_bench;
        }
      });

  
      const totalGameweekPrizes = prizes
  .filter(prize => prize.prize_type === "gw_points")
  .reduce((acc, prize) => {
    const validGameweeks = eventRange.filter(
      gw => gw >= (prize.from_gw as number) && gw <= (prize.to_gw as number)
    );

    if (validGameweeks.length > 0 && prize.from_gw && prize.to_gw) {
      let totalGwPrize = 0;

      validGameweeks.forEach(gw => {
        const singleGwPrize = prize.total_prize / validGameweeks.length;

        const adjustedPrize = {
          ...prize,
          from_gw: gw,
          to_gw: gw,
          total_prize: singleGwPrize,
        };

        const gwPrizeDistribution = distributePrizes(
          fplGameweekPerManagerData,
          adjustedPrize,
          1
        );

        totalGwPrize += gwPrizeDistribution[team.entry] || 0;
      });

      return acc + totalGwPrize;
    }

    return acc;
  }, 0);

  
      const totalPointsPrizes = prizes
        .filter(prize => prize.prize_type === "total_points" && (prize.to_gw as number) <= lastEventId)
        .reduce((acc, prize) => {
          const rankPrizeDistribution = distributePrizes(fplGameweekPerManagerData, prize, 1);
          return acc + (rankPrizeDistribution[team.entry] || 0);
        }, 0);
  
      const cupPrizes = prizes
        .filter(prize => prize.prize_type === "cup" && prize.to_gw === lastEventId)
        .reduce((acc, prize) => {
          const rankPrizeDistribution = distributePrizes(fplGameweekPerManagerData, prize, 1);
          return acc + (rankPrizeDistribution[team.entry] || 0);
        }, 0);
  
      const sumPrizes = totalGameweekPrizes + totalPointsPrizes;
  
      return {
        ...team,
        gameweekPrize: totalGameweekPrizes.toFixed(0),
        rankPrize: totalPointsPrizes.toFixed(0),
        sumPrize: sumPrizes.toFixed(0),
        totalPointsPrize: totalPointsPrizes.toFixed(0),
        totalTransferCost: totalTransferCost.toFixed(0),
        totalPoints: totalPoints.toFixed(0),
        totalBenchPoints: totalBenchPoints.toFixed(0),
      };
    });
  };
  

  const standingsWithGameweeksWon = fplClassicLeagueStanding?.standings
    ? getGameweeksWonAndPrize(fplClassicLeagueStanding.standings, prizes || [])
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
          <TableHead>Points</TableHead>
          <TableHead>Bench Points</TableHead>
          <TableHead className="text-right">Team Value</TableHead>
          <TableHead className="text-right">Bank</TableHead>
          <TableHead className="text-right">Total Budget</TableHead>
          <TableHead className="text-right">Transfer Hits</TableHead>
          <TableHead className="text-right">Gameweek Prizes</TableHead>
          <TableHead className="text-right">Total Points Prizes</TableHead>
          <TableHead className="text-right">Total Prize</TableHead>
          <TableHead className="text-right sm:hidden">Player</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {standingsWithGameweeksWon.map((team, index) => {
          // Safely access the last item in fplGameweekPerManagerData array
          const lastQueryResult = fplGameweekPerManagerData[fplGameweekPerManagerData.length - 1];

          // Safely assign managerData or undefined
          const managerData: Record<string, TeamData> | undefined = lastQueryResult?.data;

          // Safely get the entry's data
          const teamData = managerData ? managerData[team.entry.toString()] : undefined;

          // Safely access the points from entry_history
          const gameweek_points = teamData?.entry_history?.points || "0";
          const total_points = teamData?.entry_history?.total_points || "0";
          const gameweek_points_on_bench = teamData?.entry_history?.points_on_bench || "0";
          const team_value = ((teamData?.entry_history?.value || 0) - (teamData?.entry_history?.bank || 0)) / 10;
          const team_bank = teamData?.entry_history?.bank ? (teamData.entry_history.bank / 10).toFixed(1) : 0;
          const team_budget = ((teamData?.entry_history?.value || 0)) / 10;

          return (
            <TableRow key={index}>
              <TableCell className="font-medium">{team.rank}</TableCell>
              <TableCell className="font-medium">{team.entry_name}</TableCell>
              <TableCell className="font-medium">{team.player_name}</TableCell>
              <TableCell>{gameweek_points} ({total_points || "0"}) </TableCell>
              <TableCell>{gameweek_points_on_bench} ({team.totalBenchPoints || "0"}) </TableCell>
              <TableCell className="text-right">
                {team_value.toFixed(1)}
              </TableCell>
              <TableCell className="text-right">
                {team_bank}
              </TableCell>
              <TableCell className="text-right">
                {team_budget}
              </TableCell>
              <TableCell className="text-right">
                {team.totalTransferCost || "0"}
              </TableCell>
              <TableCell className="text-right">
                {team.gameweekPrize || "0"}
              </TableCell>
              <TableCell className="text-right">{team.totalPointsPrize || "0"}</TableCell>
              <TableCell className="text-right">{team.sumPrize || "0"}</TableCell>
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
