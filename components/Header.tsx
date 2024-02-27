import NextLogo from "./NextLogo";
import SupabaseLogo from "./SupabaseLogo";

export default function Header() {
  return (
    <div className="flex flex-col gap-16 items-center font-figtree">
      <img src="/simple_logo.png"/>
      <div className="flex flex-row">
        <div className="bg-flower_yellow min-h-16 min-w-16">
        </div>
        <div className="bg-flower_gold min-h-16 min-w-16">
        </div>
        <div className="bg-flower_red min-h-16 min-w-16">
        </div>
        <div className="bg-environment_brown min-h-16 min-w-16">
        </div>
        <div className="bg-leaf min-h-16 min-w-16">
        </div>
        <div className="bg-pansy min-h-16 min-w-16">
        </div>
      </div>
      <p className="text-2xl lg:text-2xl !leading-tight mx-auto max-w-xl text-center">
        Creating collaborative relationships between property owners and tenants.
      </p>
      <img src="/marigold_logo.png"/>
      <div className="flex gap-8 justify-center items-center">
        <a
          href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
          target="_blank"
          rel="noreferrer"
        >
          <SupabaseLogo />
        </a>
        <span className="border-l rotate-45 h-6" />
        <a href="https://nextjs.org/" target="_blank" rel="noreferrer">
          <NextLogo />
        </a>
      </div>
      <h1 className="sr-only">Supabase and Next.js Starter Template</h1>
    </div>
  );
}
