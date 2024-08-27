// src/hooks/useCatenaryMastRevisions.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { FplRewardsService, LeagueOut, LeagueCreate, LeagueJoin } from "../../SDK/projects_api/client";

export const useGetUserLeagues = () => {
    return useQuery({
    queryKey: ["fpl_reward_leagues"],
    queryFn: () => FplRewardsService.getUserLeagues(),
},
)};

export const useCreateFPLRewardLeague = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (requestBody: LeagueCreate) =>
        await FplRewardsService.createLeague({ requestBody }),
      onSuccess: (NewLeague: LeagueOut) => {
        queryClient.invalidateQueries({ queryKey: ["fpl_reward_leagues"] });
        // if (NewSoilProfile.id != null) {
        //     const NewSoilProfile_update: Body_Catenarymast_batch_import_kl_data = {
        //         project_id,
        //         created_by: user?.email as string,
        //     };
        //     useCreatesoilprofile.mutate(NewSoilProfile_update);
      }
    },
    )
  };

  export const useJoinFPLRewardLeague = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (requestBody: LeagueJoin) =>
        await FplRewardsService.joinLeague({ requestBody }),
      onSuccess: (NewLeague: LeagueOut) => {
        queryClient.invalidateQueries({ queryKey: ["fpl_reward_leagues"] });
        // if (NewSoilProfile.id != null) {
        //     const NewSoilProfile_update: Body_Catenarymast_batch_import_kl_data = {
        //         project_id,
        //         created_by: user?.email as string,
        //     };
        //     useCreatesoilprofile.mutate(NewSoilProfile_update);
      }
    },
    )
  };