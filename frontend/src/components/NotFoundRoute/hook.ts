import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

const useNotFoundRoute = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return { navigate, t };
};

export default useNotFoundRoute;
