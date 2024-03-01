import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import Header from "@/components/Header";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (


    
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="w-full">
        <div className="py-6 font-bold bg-flower_red text-center text-white">
          This is a protected page that you can only see as an authenticated
          user
        </div>
        <nav className="w-full flex justify-end border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
            <AuthButton />
          </div>
        </nav>
      </div>

      <div className="w-full animate-in flex-1 flex flex-col gap-20 opacity-0 font-figtree text-2xl">
        <main className="flex-1 flex flex-col gap-6">
        <div className="basic-grid">
            <div className="rounded-lg grid place-items-center service-item shadow-lg border-flower-gold border-1 bg-flower_yellow">
                <img src="/safety.svg"/>
                Safety
            </div>
            <div className="rounded-lg grid place-items-center service-item shadow-lg border-flower-gold border-1 bg-flower_yellow">
                Heating and Cooling
            </div>
            <div className="rounded-lg grid place-items-center service-item shadow-lg border-flower-gold border-1 bg-flower_yellow">
                Pests
            </div>
            <div className="rounded-lg grid place-items-center service-item shadow-lg border-flower-gold border-1 bg-flower_yellow">
                Wall, Floors, Doors, Windows
            </div>
            <div className="rounded-lg grid place-items-center service-item shadow-lg border-flower-gold border-1 bg-flower_yellow">
                Electrical
            </div>
            <div className="rounded-lg grid place-items-center service-item shadow-lg border-flower-gold border-1 bg-flower_yellow">
                Broadband
            </div>
            <div className="rounded-lg grid place-items-center service-item shadow-lg border-flower-gold border-1 bg-flower_yellow">
                Laundry
            </div>
            <div className="rounded-lg grid place-items-center service-item shadow-lg border-flower-gold border-1 bg-flower_yellow">
                Door and Lock
            </div>
            <div className="rounded-lg grid place-items-center service-item shadow-lg border-flower-gold border-1 bg-flower_yellow">
                Garbage Disposal
            </div>
            <div className="rounded-lg grid place-items-center service-item shadow-lg border-flower-gold border-1 bg-flower_yellow">
                Faucet
            </div>
            <div className="rounded-lg grid place-items-center service-item shadow-lg border-flower-gold border-1 bg-flower_yellow">
                Drain
            </div>
            <div className="rounded-lg grid place-items-center service-item shadow-lg border-flower-gold border-1 bg-flower_yellow">
                Roof
            </div>
            <div className="rounded-lg grid place-items-center service-item shadow-lg border-flower-gold border-1 bg-flower_yellow">
                Gutters
            </div>
            <div className="rounded-lg grid place-items-center service-item shadow-lg border-flower-gold border-1 bg-flower_yellow">
                Trees, Lawn, Landscaping
            </div>
          </div>
        </main>
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
      </footer>
    </div>
  );
}
