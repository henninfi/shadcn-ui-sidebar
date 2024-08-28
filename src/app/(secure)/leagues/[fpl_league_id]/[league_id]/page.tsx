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
import { Separator } from "@/components/ui/separator"
import PrizeCard from "@/components/ui/cards/prizesCard";
import { LeaguePrizeCreate, PrizeType, PrizeDistributionCreate, LeaguePrizeOut } from "../../../../../../SDK/projects_api/client";




export default function DashboardPage() {
  const [openCreatePrizeModal, setOpenCreatePrizeModal] = useState(false);
  const leagueId = useGetLeagueId();
  const { data: prizes } = useGetLeaguePrizes(leagueId);
  const [prize, setPrize] = useState<LeaguePrizeOut | null>(null);



  return (
    <ContentLayout title="My League">
      {/* Dialogs */}
      <CreatePrizeDialog open={openCreatePrizeModal} onClose={() => (setOpenCreatePrizeModal(false), setPrize(null))} onCreate={() => setOpenCreatePrizeModal(false)} selectedPrize={prize} />
      <div className="grid sm:grid-cols-3 grid-cols-1 gap-4">
        <div>
          <Card>
            <CardTitle className="ml-4 mt-2 h-[40px] flex items-center justify-between">League Info </CardTitle>
            <CardContent>
              {/* Add league info content here */}
            </CardContent>
            <CardFooter className="text-xs text-gray-500">
              Summary of FPL Reward League.
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card>
            <CardTitle className="ml-4 mt-2 h-[40px] flex items-center justify-between">Rules </CardTitle>
            <CardContent>
              {/* Add rules content here */}
            </CardContent>
            <CardFooter className="text-xs text-gray-500">
              Ment to be followed.
            </CardFooter>
          </Card>
        </div>

        <Card>
          <CardTitle className="ml-4 mt-2 mr-2 h-[40px] flex items-center justify-between">
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
            {/* Prizes content */}
          </CardContent>

          <CardFooter className="text-xs text-gray-500">
            What to win.
          </CardFooter>
        </Card>
      </div>
      <Separator className="m-4" />


      {/* New row for displaying prize cards */}
      <div className="grid sm:grid-cols-3 grid-cols-1 gap-4">
        {prizes?.map((prize) => (
          <PrizeCard key={prize.id} prize={prize} setPrize={setPrize} setOpenCreatePrizeModal={setOpenCreatePrizeModal} />  // Use PrizeCard component
        ))}
      </div>
      <Separator className="m-4" />
      <div className="col-span-3">
        <Card className="p-2">
          <FantasyTable />
        </Card>
      </div>
    </ContentLayout>
  );
}
