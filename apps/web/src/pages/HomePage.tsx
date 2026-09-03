import { Awards } from "../sections/Awards";
import { Builds } from "../sections/Builds";
import { Contact } from "../sections/Contact";
import { Education } from "../sections/Education";
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
      <Skills />
      <Experience />
      <Work />
      <Builds />
      <Awards />
      <KindWords />
      <Education />
      <MtrustDeskDemo />
      <Contact />
    </main>
  );
}
