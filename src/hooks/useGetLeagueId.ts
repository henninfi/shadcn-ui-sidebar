'use client'

import { useParams } from 'next/navigation'

export function useGetFPLLeagueId() {
    const params = useParams<{ fpl_league_id: string }>()
    return params["fpl_league_id"];
}

export function useGetLeagueId() {
    const params = useParams<{ league_id: string }>()
    return params["league_id"];
}