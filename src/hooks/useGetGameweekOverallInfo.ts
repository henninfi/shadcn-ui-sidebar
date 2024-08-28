import { useQuery } from "@tanstack/react-query"
import { FplApiService } from "../../SDK/projects_api/client";
import { fplApiGetOverallGameweekInfoOptions } from "@/client/@tanstack/react-query.gen";


export const useGetGameweekOverallInfo = () => {
    return useQuery({
        ...fplApiGetOverallGameweekInfoOptions(),
},
)};