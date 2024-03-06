import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import Header from "@/components/Header";
import { redirect } from "next/navigation";
import * as stylex from "@stylexjs/stylex";
import { colors } from "@stylexjs/open-props/lib/colors.stylex";
import { shadows } from "@stylexjs/open-props/lib/shadows.stylex";

shadows.shadow2

const servicerequest_card = stylex.create({
    base: {
        fontSize: 16,
        backgroundColor: colors.gray10,
        boxShadow: shadows.shadow6,
        borderRadius: '0.5rem',
        placeItems: 'center',
        display: 'grid',
        minWidth: '200px',
        minHeight: '200px',
        padding: '10px',
    }
})
const servicerequest_container = stylex.create({
    base: {
        flex: '1 1 0%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '5rem',
        alignItems: 'center'
    }
})

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div {...stylex.props(servicerequest_container.base)}>
      <div className="w-full">
        {/* <div className="py-6 font-bold bg-flower_red text-center text-white">
          This is a protected page that you can only see as an authenticated
          user
        </div> */}
        <h1>Make a Service Request</h1>
        <nav className="w-full flex justify-end border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
            <AuthButton />
          </div>
        </nav>
      </div>

      <div className="w-full animate-in flex-1 flex flex-col gap-20 opacity-0 font-figtree text-2xl">
        <main className="flex-1 flex flex-col gap-6">
          <div className="basic-grid">
            <div {...stylex.props(servicerequest_card.base)}>
                <img src="/safety.svg"/>
                Safety
            </div>
            <div {...stylex.props(servicerequest_card.base)}>
                <img src="/heating_and_cooling.svg"/>
                Heating and Cooling
            </div>
            <div {...stylex.props(servicerequest_card.base)}>
                <img src="/pests.svg"/>
                Pests
            </div>
            <div {...stylex.props(servicerequest_card.base)}>
                <img src="/doors_and_windows.svg"/>
                Walls, Doors, Windows
            </div>
            <div {...stylex.props(servicerequest_card.base)}>
                Electrical
            </div>
            <div {...stylex.props(servicerequest_card.base)}>
                Broadband
            </div>
            <div {...stylex.props(servicerequest_card.base)}>
                Laundry
            </div>
            <div {...stylex.props(servicerequest_card.base)}>
                Door and Lock
            </div>
            <div {...stylex.props(servicerequest_card.base)}>
                Garbage Disposal
            </div>
            <div {...stylex.props(servicerequest_card.base)}>
                Faucet
            </div>
            <div {...stylex.props(servicerequest_card.base)}>
                Drain
            </div>
            <div {...stylex.props(servicerequest_card.base)}>
                Roof
            </div>
            <div {...stylex.props(servicerequest_card.base)}>
                Gutters
            </div>
            <div {...stylex.props(servicerequest_card.base)}>
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
