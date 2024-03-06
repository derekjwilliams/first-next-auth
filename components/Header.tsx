import * as stylex from "@stylexjs/stylex";
import { colors } from "@stylexjs/open-props/lib/colors.stylex";

const header_swatch = stylex.create({
    base: {
        minWidth: '4rem',
        minHeight: '4rem',
    },
    flower_yellow: {
      backgroundColor: 'rgb(255 213 95)'
    },
    flower_gold: {
      backgroundColor: 'rgb(255 194 0)'
    },
    flower_red: {
      backgroundColor: 'rgb(247 70 0)'
    },
    environment_brown: {
      backgroundColor: 'rgb(214 122 0)'
    },
    leaf: {
      backgroundColor: 'rgb(0 81 69)'
    },
    pansy: {
      backgroundColor: 'rgb(168 0 173)'
    }
})
export default function Header() {
  return (
    <div className="flex flex-col gap-16 items-center font-figtree">
      <img src="/simple_logo.png"/>
      <div className="flex flex-row">
        <div {...stylex.props(header_swatch.base, header_swatch.flower_yellow)}></div>
        <div {...stylex.props(header_swatch.base, header_swatch.flower_gold)}></div>
        <div {...stylex.props(header_swatch.base, header_swatch.flower_red)}></div>
        <div {...stylex.props(header_swatch.base, header_swatch.environment_brown)}></div>
        <div {...stylex.props(header_swatch.base, header_swatch.leaf)}></div>
        <div {...stylex.props(header_swatch.base, header_swatch.pansy)}></div>
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
        </a>
        <span className="border-l rotate-45 h-6" />
      </div>
      <h1 className="sr-only">Supabase and Next.js Starter Template</h1>
    </div>
  );
}
