// src/hooks/useCatenaryMastRevisions.ts
import { useQuery, useQueries } from "@tanstack/react-query"
import { fplApiGetGameweekPerManagerPerClassicLeagueOptions, fplApiGetGameweekPerManagerOptions } from "@/client/@tanstack/react-query.gen";

export const useGetGameweekPerManager = (teamId: string, gameweek: string) => {
  return useQuery({
    ...fplApiGetGameweekPerManagerOptions({
    query: {
      team_id: teamId, // your team ID here
      gameweek: gameweek,
      enabled: !!teamId && !!gameweek,
    },
  },
  )
})};

export const useGetGameweekPerManagerPerClassicLeague = (leagueId: string, gameweek: string) => {
  return useQuery({
    ...fplApiGetGameweekPerManagerPerClassicLeagueOptions({
      query: {
        gameweek: gameweek,
        league_id: leagueId, // your league ID here
        enabled: !!leagueId && !!gameweek
      },

    })

  },
  )
};

// export const useGetGameweeksPerManagerPerClassicLeagueQueries = (leagueId: string, lastEventId: number) => {
//     return useQueries({
//       queries: Array.from({ length: lastEventId }, (_, index) => {
//         const gameweek = (index + 1).toString(); // Convert to string since the API expects a string
//         return {
//           queryKey: ["Gameweek_per_manager_per_Classic_League", leagueId, gameweek],
//           queryFn: () => FplApiService.getGameweekPerManagerPerClassicLeague({ leagueId, gameweek }),
//           enabled: !!leagueId,
//         };
//       }),
//     });
//   };

export const useGetGameweeksPerManagerPerClassicLeagueQueries = (leagueId: string, lastEventId: number) => {
  return useQueries({
    queries: Array.from({ length: lastEventId }, (_, index) => {
      const gameweek = (index + 1).toString(); // Convert to string since the API expects a string
      return {
        ...fplApiGetGameweekPerManagerPerClassicLeagueOptions({
          query: {
            gameweek: gameweek,
            league_id: leagueId, // your league ID here
            enabled: !!leagueId && !!gameweek
          },
        })
      };
    }),
  });
};