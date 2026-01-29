"use client";

import { useCallback, useEffect } from "react";

interface GettingStartedGenerateShortcutProps {
  url: string;
}

export function GettingStartedGenerateShortcut({
  url,
}: GettingStartedGenerateShortcutProps) {
  const onCreate = useCallback((url: string) => {}, []);

  useEffect(() => {
    if (url) {
      onCreate(url);
    }
  }, [onCreate, url]);

  return <div />;
}
