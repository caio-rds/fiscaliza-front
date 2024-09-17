import { useState, useEffect } from "react";

export function useDeviceType() {
  const [deviceType, setDeviceType] = useState("desktop");

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/android/i.test(userAgent)) {
      setDeviceType("mobile");
    }

    else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      setDeviceType("mobile");
    }

    else {
      setDeviceType("desktop");
    }
  }, []);

  return deviceType;
}
