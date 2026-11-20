import { onMount, type JSX } from "solid-js";
import { revealOnMount } from "@/shared/lib/motion";
import { currentUser } from "@/shared/config/menu";
import { Hero } from "../components/Hero";
import { StatsRow } from "../components/StatsRow";
import { RevenueTrend } from "../components/RevenueTrend";
import { ConnectedAccounts } from "../components/ConnectedAccounts";
import { TopProducts } from "../components/TopProducts";
import { QuickCreate } from "../components/QuickCreate";
import { ContentOverview } from "../components/ContentOverview";
import { TopPerforming } from "../components/TopPerforming";
import { UserGrowth } from "../components/UserGrowth";
import { ContentCalendar } from "../components/ContentCalendar";
import { RecentPosts } from "../components/RecentPosts";
import "../Dashboard.css";

export default function Dashboard(): JSX.Element {
  const firstName = currentUser.name.split(" ")[0] ?? currentUser.name;
  let rootRef: HTMLDivElement | undefined;

  onMount(() => {
    if (rootRef) revealOnMount(rootRef, 35);
  });

  return (
    <div class="dash" ref={rootRef}>
      <div class="dash__main">
        <Hero name={firstName} />
        <StatsRow />
        <RevenueTrend />
        <ConnectedAccounts />
        <TopProducts />
        <div class="dash__split">
          <ContentCalendar />
          <RecentPosts />
        </div>
      </div>
      <aside class="dash__side">
        <QuickCreate />
        <UserGrowth />
        <ContentOverview />
        <TopPerforming />
      </aside>
    </div>
  );
}
