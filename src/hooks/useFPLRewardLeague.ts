// src/hooks/useCatenaryMastRevisions.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { fplRewardsGetUserLeaguesOptions, fplRewardsCreateLeagueMutation, fplRewardsJoinLeagueMutation } from "@/client/@tanstack/react-query.gen";

export const useGetUserLeagues = () => {
  return useQuery({
    ...fplRewardsGetUserLeaguesOptions({
    })
  },
  )
};

export const useCreateFPLRewardLeague = () => {
  const queryClient = useQueryClient();
  return useMutation({

    ...fplRewardsCreateLeagueMutation(),
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries();
    }
  },
  )
};

export const useJoinFPLRewardLeague = () => {
  const queryClient = useQueryClient();
  return useMutation({
    

    ...fplRewardsJoinLeagueMutation(),
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries();
    }
  },
  )
};

