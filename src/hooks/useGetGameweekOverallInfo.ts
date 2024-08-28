import { useQuery } from "@tanstack/react-query"
import { fplApiGetOverallGameweekInfoOptions } from "@/client/@tanstack/react-query.gen";


export const useGetGameweekOverallInfo = () => {
    return useQuery({
        ...fplApiGetOverallGameweekInfoOptions(),
},
)};