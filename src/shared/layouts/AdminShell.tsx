import type { JSX } from "solid-js";
import { BaseLayout } from "./BaseLayout";
import { Header, NotificationsOnlyTools } from "./Header";
import { Sidebar } from "./Sidebar";
import { CustomizationDrawer } from "./CustomizationDrawer";
import { currentUser, type MenuItem } from "@/shared/config/menu";
import projectConfig from "@/projects/Vibemode/menu.json";

interface ProjectConfig {
  project: {
    name: string;
    subtitle: string;
    initials: string;
    accent?: string;
  };
  plan?: {
    name: string;
    used: number;
    total: number;
    label?: string;
    upgradeHref?: string;
  };
  menu: MenuItem[];
}

const { project, plan, menu } = projectConfig as ProjectConfig;

export default function AdminShell(props: { children?: JSX.Element }): JSX.Element {
  return (
    <>
      <BaseLayout
        class="layout--nav layout--dashboard"
        sidebar={<Sidebar menu={menu} plan={plan} />}
        header={
          <Header
            menu={[]}
            help={true}
            project={{
              name: project.name,
              subtitle: project.subtitle,
              initials: project.initials,
            }}
            search={{ placeholder: "Search posts, campaigns, accounts…", shortcut: "⌘ K" }}
            tools={<NotificationsOnlyTools />}
            theme={true}
            user={{ ...currentUser, role: "Admin" }}
          />
        }
      >
        {props.children}
      </BaseLayout>
      <CustomizationDrawer />
    </>
  );
}
