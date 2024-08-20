"use client"
import { useState } from "react";
import Link from "next/link";

import PlaceholderContent from "@/components/demo/placeholder-content";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {FantasyTable} from "@/components/ui/tables/currentStandingTable";
import { use } from "react";

import { MyFPLRewardLeaguesTable } from "@/components/ui/tables/myFPLRewardLeaguesTable";
import { Button } from "@/components/ui/button";
import LinkNewFPLeafueDialog from "@/components/ui/tables/dialogs/createMyFPLRewardLeagueDialog";

export default function DashboardPage() {
  const [openCreateLeagueModal, setOpenCreateLeagueModal] = useState(false);

  
  
  return (
    <ContentLayout title="My FPL Reward Leagues">
      <div className="flex justify-between items-center mb-4">
        <Button variant="default" className="ml-auto" onClick={() => setOpenCreateLeagueModal(true)}>
          Link New League
        </Button>
      </div>
      <LinkNewFPLeafueDialog open={openCreateLeagueModal} onClose={() => setOpenCreateLeagueModal(false)} onCreate={() =>setOpenCreateLeagueModal(false)}/>
      <MyFPLRewardLeaguesTable />
    </ContentLayout>
  );
}
