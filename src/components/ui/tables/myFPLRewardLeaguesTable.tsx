"use client"
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
import { useGetUserLeagues } from "@/hooks/useFPLRewardLeague";
import Link from "next/link";
import {Card, CardTitle } from "@/components/ui/card";




export function MyFPLRewardLeaguesTable() {
    const { data: fpl_leagues } = useGetUserLeagues();
    return (
        <Card>
        <Table>
            <TableCaption>A list of your FPL reward leagues.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>League Name</TableHead>
                    <TableHead>Description</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {fpl_leagues?.map((league) => (
                    <TableRow key={league.id}>
                        <TableCell className="font-medium w-[200px] h-[20px] underline">
                            <Link href={`/leagues/${league.external_id_fpl}/${league.id}`}>{league.name}
                            </Link>
                        </TableCell>
                        <TableCell>{league.description || "No description available"}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>Total Leagues</TableCell>
                    <TableCell className="text-right">{fpl_leagues?.length}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
        
        </Card>
    );
}
