import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 pt-24 sm:px-6 lg:px-8">
      <section className="py-16 text-center">
        <h1 className="mb-2 text-3xl font-semibold text-foreground">404</h1>
        <p className="mb-6 text-sm text-muted-foreground">
          This page could not be found.
        </p>
        <Link
          href="/"
          className="text-sm font-medium text-foreground underline-offset-4 hover:underline"
        >
          Back home →
        </Link>
      </section>
    </div>
  );
}
