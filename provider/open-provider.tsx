"use client";

import ImageListDialog from "@/components/rooms/image-list-dialog";
import { useEffect, useState } from "react";

export default function OpenProvider() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  return (
    <>
      <ImageListDialog />
    </>
  );
}
