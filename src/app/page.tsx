"use client";
import { Button } from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Link href="/new" passHref>
        <Button>Test</Button>
      </Link>
    </>
  );
}
