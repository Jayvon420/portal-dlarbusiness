"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DateFilter() {
  const router = useRouter();
  const params = useSearchParams();

  const [startDate, setStartDate] = useState(params.get("startDate") || "");

  const [endDate, setEndDate] = useState(params.get("endDate") || "");

  function applyFilter() {
    const search = new URLSearchParams();

    if (startDate) search.set("startDate", startDate);
    if (endDate) search.set("endDate", endDate);

    router.push(`?${search.toString()}`);
  }

  return (
    <div className="flex gap-2">
      <Input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />

      <Input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />

      <Button onClick={applyFilter}>Filter</Button>
    </div>
  );
}
