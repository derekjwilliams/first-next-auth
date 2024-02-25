import NextLogo from "./NextLogo";
import SupabaseLogo from "./SupabaseLogo";

export default function Header() {
  return (
    <div className="flex flex-col gap-16 items-center">
      <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
        Marigold, Communicate, Play, Smile
        
      </p>
      <img src="/marigold_logo.svg"/>
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
      <p className="attribution italic text-xs">
        <a className="h-2" target="_blank" rel="noopener noreferrer" href="https://www.flickr.com/photos/153584064@N07/50640508551">Marigold, Calendula (1596-1610) by Anselmus Boëtius de Boodt. Original from the Rijksmuseum. Digitally enhanced by rawpixel.</a>
        by <a target="_blank" rel="noopener noreferrer" href="https://www.flickr.com/photos/153584064@N07">Free Public Domain Illustrations by rawpixel</a> 
         is licensed under <a target="_blank" rel="noopener noreferrer" href="https://creativecommons.org/licenses/by/2.0/?ref=openverse">CC BY 2.0 <img className="inline h-4" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg"></img><img src="https://mirrors.creativecommons.org/presskit/icons/by.svg" className="inline h-4"></img></a>

        </p>
    </div>
  );
}
