import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";
import * as stylex from "@stylexjs/stylex";

const login_page = stylex.create({
  base: {
      display: 'grid',
      flexDirection: 'column',
      flex: '1 1 0%',
      padding: '0 2rem 0 2rem',
      justifyContent: 'center',
      width: {
        default: '100%',
        '@media (min-width: 640px)': '28rem'
      }
  }
})
const login_form_input = stylex.create({
  base:
  {
    justifyContent: 'center',
    padding: '0.5rem 1rem 0.5rem 1rem',
    marginBottom: '1.5rem',
    borderRadius: '0.375rem',
    borderWidth: '1px'
  }
})
const login_form_button = stylex.create({
  base:
  {
    padding: '0.5rem 1rem 0.5rem 1rem',
    marginBottom: '0.5rem',
    borderRadius: '0.375rem',
    borderWidth: '1px'
  }
})
const login_form = stylex.create({
  base: {
    display:'flex',
    flexDirection:'column',
    flex:'1 1 0%',
    gap:'0.5rem',
    justifyContent:'center',
    width:'100%'
  }
})
const login_back_arrow = stylex.create({
  base: {
    marginRight: '0.5rem',
    width: '1rem',
    height: '1rem',
    transitionProperty: 'transform',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    transitionDuration: '300ms'
  }
})
const login_back_link = stylex.create({
  base: {
    display: 'flex',
    position: 'absolute',
    top: '2rem',
    left: '2rem',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    alignItems: 'center',
    borderRadius: '0.375rem',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    textDecoration: 'none',
  }
})

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/protected");
  };

  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/login?message=Check email to continue sign in process");
  };

  return (
    <div {...stylex.props(login_page.base)}>
      <Link
        href="/" {...stylex.props(login_back_link.base)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          {...stylex.props(login_back_arrow.base)}
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Back
      </Link>

      <form {...stylex.props(login_form.base)} >
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          {...stylex.props(login_form_input.base)}
          // className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="email"
          placeholder="you@example.com"
          required
        />
        <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          {...stylex.props(login_form_input.base)}
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <SubmitButton
          formAction={signIn}
          {...stylex.props(login_form_button.base)}
          // className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2"
          pendingText="Signing In..."
        >
          Sign In
        </SubmitButton>
        <SubmitButton
          formAction={signUp}
          {...stylex.props(login_form_button.base)}
          // className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
          pendingText="Signing Up..."
        >
          Sign Up
        </SubmitButton>
        {/* {searchParams?.message && (
          <p 
          className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )} */}
      </form>
    </div>
  );
}
