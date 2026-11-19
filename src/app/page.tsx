export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-24 text-center">
      <p className="rounded-full border border-black/10 px-3 py-1 text-xs font-medium tracking-widest uppercase text-zinc-500 dark:border-white/15 dark:text-zinc-400">
        Setup complete
      </p>

      <h1 className="max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        Naman&apos;s portfolio is up and running
      </h1>

      <p className="max-w-md text-base leading-7 text-zinc-600 dark:text-zinc-400">
        This is a temporary homepage that confirms the Next.js application, TypeScript and
        Tailwind CSS are wired up correctly. The portfolio design is built in the next phase.
      </p>

      <dl className="grid grid-cols-1 gap-x-10 gap-y-3 rounded-xl border border-black/10 p-6 text-left text-sm sm:grid-cols-2 dark:border-white/15">
        <div>
          <dt className="text-zinc-500 dark:text-zinc-400">Framework</dt>
          <dd className="font-medium">Next.js (App Router)</dd>
        </div>
        <div>
          <dt className="text-zinc-500 dark:text-zinc-400">Language</dt>
          <dd className="font-medium">TypeScript (strict)</dd>
        </div>
        <div>
          <dt className="text-zinc-500 dark:text-zinc-400">Styling</dt>
          <dd className="font-medium">Tailwind CSS</dd>
        </div>
        <div>
          <dt className="text-zinc-500 dark:text-zinc-400">Linting</dt>
          <dd className="font-medium">ESLint</dd>
        </div>
      </dl>
    </main>
  );
}
