import { useEffect } from "react";
import StackTemplate from "../components/templates/StackTemplate";

export default function Home() {
  useEffect(() => {
    document.title = "Attoly | Home";
  }, []);

  return (
    <StackTemplate>
      <div className="h-full bg-white dark:bg-gray-600 flex items-center justify-center p-4" />
    </StackTemplate>
  );
}
