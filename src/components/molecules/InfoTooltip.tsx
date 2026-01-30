"use client";

import { TooltipTrigger } from "react-aria-components";
import { Button } from "@/components/atoms/Button";
import { Info } from "lucide-react";
import { Tooltip } from "@/components/atoms/Tooltip";

export function InfoTooltip({ tooltip }: { tooltip: string }) {
  return (
    <TooltipTrigger delay={1} closeDelay={1}>
      <Button variant="icon">
        <Info className="h-4 w-4" />
      </Button>
      <Tooltip>{tooltip}</Tooltip>
    </TooltipTrigger>
  );
}
