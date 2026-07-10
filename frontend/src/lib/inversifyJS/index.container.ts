import { utilsContainerModule } from "@/lib/inversifyJS/utils.container";
import { Container } from "inversify";
import { authContainerModule } from "./auth.container";
import { userContainerModule } from "@/lib/inversifyJS/user.container";
import { ticketContainerModule } from "@/lib/inversifyJS/ticket.container";

export const container = new Container({ defaultScope: "Singleton" });
container.load(
  authContainerModule,
  utilsContainerModule,
  userContainerModule,
  ticketContainerModule,
);
