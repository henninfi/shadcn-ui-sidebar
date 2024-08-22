"use client"
import Link from "next/link";
import { useState } from "react";

import PlaceholderContent from "@/components/demo/placeholder-content";
import { Button } from "@/components/ui/button";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { FantasyTable } from "@/components/ui/tables/currentStandingTable";
import CreatePrizeDialog from "@/components/ui/dialogs/createPrizeDialog";
import { useGetLeaguePrizes } from "@/hooks/useFPLPrizes";
import { useGetLeagueId } from "@/hooks/useGetLeagueId";


export default function DashboardPage() {
  const [openCreatePrizeModal, setOpenCreatePrizeModal] = useState(false);
  const leagueId = useGetLeagueId();
  const {data:prizes} = useGetLeaguePrizes(leagueId);



  return (
    <ContentLayout title="My League">
      {/* Dialogs */}
      <CreatePrizeDialog open={openCreatePrizeModal} onClose={() => setOpenCreatePrizeModal(false)} onCreate={() => setOpenCreatePrizeModal(false)} />
      
      
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Card>
            <CardTitle className="m-4">League Info </CardTitle>
            <CardContent>

            </CardContent>
            <CardFooter className="text-xs text-gray-500">
              Summary of FPL Reward League
            </CardFooter>
          </Card>
        </div>
        <div>
        <Card>
      <CardTitle className="m-4 flex items-center justify-between">
        Prizes
        <Button
          variant="default"
          className="ml-auto"
          onClick={() => setOpenCreatePrizeModal(true)}
        >
          New Prize
        </Button>
      </CardTitle>

      <CardContent>
        {prizes?.length === 0 ? (
          <p>No prizes available.</p>
        ) : (
          <ul className="space-y-4">
            {prizes?.map((prize) => (
              <li key={prize.id} className="border p-4 rounded-md">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">{(prize.prize_type as string) === "total_points" ? "Total Points" : "test"}</h3>
                    <p className="text-sm text-gray-500">
                      {`From Gameweek ${prize.from_gw} to ${prize.to_gw}`}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {prize.total_prize} {prize.currency}
                    </p>
                  </div>
                </div>
                {prize.distributions && prize.distributions.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {prize.distributions.map((distribution) => (
                      <div key={distribution.id} className="flex justify-between text-sm">
                        <p>Rank {distribution.rank}</p>
                        <p>{distribution.percentage}%</p>
                        <p>{(((distribution.percentage as number) / 100) * prize.total_prize).toFixed(2)} {prize.currency}</p>
                      </div>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </CardContent>

      <CardFooter className="text-xs text-gray-500">
        What's in it for you?
      </CardFooter>
    </Card>

        </div>
        <div>
          <Card>
            <CardTitle className="m-4">Rules </CardTitle>
            <CardContent>

            </CardContent>
            <CardFooter className="text-xs text-gray-500">
              I'd be following these.
            </CardFooter>
          </Card>
        </div>
        <div className="col-span-3">
          <Card className="p-2">
            <FantasyTable />
          </Card>
        </div>
      </div>
    </ContentLayout>
  );
}
