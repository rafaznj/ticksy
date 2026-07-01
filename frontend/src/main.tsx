import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { I18nextProvider } from "react-i18next";

import i18n from "./assets/i18n";
import { router } from "@/routes/router";
import tanStackQueryClient from "@/libs/query-client";

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <I18nextProvider i18n={i18n}>
        <QueryClientProvider client={tanStackQueryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </I18nextProvider>
    </StrictMode>,
  );
}
