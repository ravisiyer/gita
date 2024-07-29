"use client";
import Link from "next/link";
function Page() {
  return (
    <div>
      <h1>Test Client Page</h1>
      <Link href="/settings">Go to Settings</Link>
    </div>
  );
}
export default Page;
