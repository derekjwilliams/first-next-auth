import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import Header from "@/components/Header";
import * as stylex from "@stylexjs/stylex";

const header_wrapper = stylex.create({
  base: {
    flex: 'flex: 1 1 0%',
    display: 'flex',
    flexDirection: 'column',
    gap: '5rem',
    maxWidth: '56rem',
    padding: '0 0.75rem 0 0.75rem',
  }
})

export default async function Index() {
  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <div>
      <nav>
        <div>
          {isSupabaseConnected && <AuthButton />}
        </div>
      </nav>

      <div>
        <Header />
        <main>
          {/* <h2>Next steps</h2>
          {isSupabaseConnected ? <SignUpUserSteps /> : <ConnectSupabaseSteps />} */}
        </main>
      </div>

      <footer>
      </footer>
    </div>
  );
}
