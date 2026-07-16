import { authContainerModule } from "@/lib/inversifyJS/auth.container";
import { ticketContainerModule } from "@/lib/inversifyJS/ticket.container";
import { userContainerModule } from "@/lib/inversifyJS/user.container";
import { utilsContainerModule } from "@/lib/inversifyJS/utils.container";
import { Container } from "inversify";

export const container = new Container({
  defaultScope: "Singleton",
});

container.load(
  utilsContainerModule,
  authContainerModule,
  userContainerModule,
  ticketContainerModule,
);
