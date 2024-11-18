import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import StackTemplate from "../components/templates/StackTemplate";
import Jumbotron from "../components/molecules/Jumbotron";
import ConstructionNotification from "../components/molecules/ConstructionNotification";
import FeatureShow from "../components/molecules/FeatureShow";

export default function Home() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = `Attoly | ${t("pages.home.title")}`;
  }, [t]);

  return (
    <StackTemplate>
      <div className="h-full bg-white dark:bg-gray-800 text-gray-800 dark:text-white">
        <Jumbotron />
        <ConstructionNotification />
        <FeatureShow />
      </div>
    </StackTemplate>
  );
}
