import { Awards } from "../sections/Awards";
import { Contact } from "../sections/Contact";
import { Experience } from "../sections/Experience";
import { Hero } from "../sections/Hero";
import { Impact } from "../sections/Impact";
import { KindWords } from "../sections/KindWords";
import { MtrustDeskDemo } from "../sections/MtrustDeskDemo";
import { QualityProof } from "../sections/QualityProof";
import { Skills } from "../sections/Skills";
import { Work } from "../sections/Work";

export function HomePage() {
  return (
    <main id="main">
      <Hero />
      <Impact />
      <QualityProof />
      <Work />
      <MtrustDeskDemo />
      <Experience />
      <Skills />
      <Awards />
      <KindWords />
      <Contact />
    </main>
  );
}
