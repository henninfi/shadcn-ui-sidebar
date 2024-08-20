'use client'

import { useParams } from 'next/navigation'

export function useGetLeagueId() {
    const params = useParams<{ league_id: string }>()
    return params["league_id"];
}