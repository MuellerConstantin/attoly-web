import { useEffect } from "react";
import StackTemplate from "../components/templates/StackTemplate";
import Jumbotron from "../components/molecules/Jumbotron";
import ConstructionNotification from "../components/molecules/ConstructionNotification";
import FeatureShow from "../components/molecules/FeatureShow";

export default function Home() {
  useEffect(() => {
    document.title = "Attoly | Home";
  }, []);

  return (
    <StackTemplate>
      <div className="h-full bg-gray-50 dark:bg-gray-600 text-gray-800 dark:text-white">
        <Jumbotron />
        <ConstructionNotification />
        <FeatureShow />
      </div>
    </StackTemplate>
  );
}
