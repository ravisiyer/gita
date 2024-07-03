import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h2 className="my-5 text-2xl font-bold">Not Found</h2>
      <p className="my-4 leading-[1.1]">
        Could not find requested Bhagavad Gita chapter, verse
      </p>
      <Link
        href="/"
        className="text-blue-700 visited:text-purple-900 underline"
      >
        Home
      </Link>
    </div>
  );
}
