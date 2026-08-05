import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Now } from "@/components/Now";
import { Work } from "@/components/Work";
import { Archive } from "@/components/Archive";
import { Capabilities } from "@/components/Capabilities";
import { Lab } from "@/components/Lab";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Now />
        <Work />
        <Archive />
        <Capabilities />
        <Lab />
        <Contact />
      </main>
    </>
  );
}
