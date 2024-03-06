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
    <div>
      <div>
        <div>
          This is a protected page that you can only see as an authenticated
          user
        </div>
        <nav>
          <div>
            <AuthButton />
          </div>
        </nav>
      </div>

      <div>
        <Header />
        <main>
        </main>
      </div>

      <footer>
      </footer>
    </div>
  );
}
