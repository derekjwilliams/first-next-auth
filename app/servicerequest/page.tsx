import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import Header from "@/components/Header";
import { redirect } from "next/navigation";
import * as stylex from "@stylexjs/stylex";

const service_card = stylex.create({
    base: {
        fontSize: 16,
        backgroundColor: '#e9ecef',
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px',
        borderRadius: '0.5rem',
        placeItems: 'center',
        display: 'grid',
        minWidth: '200px',
        minHeight: '200px',
        padding: '10px',
    }
})

import { colors } from "@stylexjs/open-props/lib/colors.stylex";

export default async function ProtectedPage() {
  const supabase = createClient();

//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (!user) {
//     return redirect("/login");
//   }

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      {/* <div className="w-full">
        <div className="py-6 font-bold bg-flower_red text-center text-white">
          This is a protected page that you can only see as an authenticated
          user
        </div>
        <nav className="w-full flex justify-end border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
            <AuthButton />
          </div>
        </nav>
      </div> */}

      <div className="w-full animate-in flex-1 flex flex-col gap-20 opacity-0 font-figtree text-2xl">
        <main className="flex-1 flex flex-col gap-6">
        <div className="basic-grid">
            <div {...stylex.props(service_card.base)}>
                <img src="/safety.svg"/>
                Safety
            </div>
            <div {...stylex.props(service_card.base)}>
                <img src="/heating_and_cooling.svg"/>
                Heating and Cooling
            </div>
            <div {...stylex.props(service_card.base)}>
                <img src="/pests.svg"/>
                Pests
            </div>
            <div {...stylex.props(service_card.base)}>
                <img src="/doors_and_windows.svg"/>
                Floors, Doors, Windows
            </div>
            <div {...stylex.props(service_card.base)}>
                Electrical
            </div>
            <div {...stylex.props(service_card.base)}>
                Broadband
            </div>
            <div {...stylex.props(service_card.base)}>
                Laundry
            </div>
            <div {...stylex.props(service_card.base)}>
                Door and Lock
            </div>
            <div {...stylex.props(service_card.base)}>
                Garbage Disposal
            </div>
            <div {...stylex.props(service_card.base)}>
                Faucet
            </div>
            <div {...stylex.props(service_card.base)}>
                Drain
            </div>
            <div {...stylex.props(service_card.base)}>
                Roof
            </div>
            <div {...stylex.props(service_card.base)}>
                Gutters
            </div>
            <div {...stylex.props(service_card.base)}>
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
