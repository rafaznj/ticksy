import { SidebarFooter } from "../../molecules/SidebarFooter";
import { SidebarHeader } from "../../molecules/SidebarHeader";
import { SidebarMenu } from "../../molecules/SidebarMenu";
import { useSidebarToggle } from "../../molecules/SidebarMenu/hook";
import { SidebarToggle } from "../../molecules/SidebarToggle";
import { Divider, SidebarContainer, SidebarContent } from "./styles";

export function Sidebar() {
  const { $isOpen } = useSidebarToggle();

  return (
    <SidebarContainer $isOpen={$isOpen}>
      <SidebarToggle />
      <SidebarContent>
        <SidebarHeader />
        <Divider />
        <SidebarMenu />
        <Divider />
        <SidebarFooter />
      </SidebarContent>
    </SidebarContainer>
  );
}
