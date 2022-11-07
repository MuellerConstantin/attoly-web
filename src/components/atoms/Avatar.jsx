import { useEffect, useRef } from "react";
import * as jdenticon from "jdenticon";

export default function Avatar({ value }) {
  const icon = useRef(null);

  useEffect(() => {
    jdenticon.updateSvg(icon.current, value);
  }, [value]);

  return (
    <svg data-jdenticon-value={value} ref={icon} height="100%" width="100%" />
  );
}
