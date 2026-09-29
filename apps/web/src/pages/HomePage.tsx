import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Awards } from "../sections/Awards";
import { Builds } from "../sections/Builds";
import { Contact } from "../sections/Contact";
import { Education } from "../sections/Education";
import { Experience } from "../sections/Experience";
import { FeaturedBlogs } from "../sections/FeaturedBlogs";
import { Hero } from "../sections/Hero";
import { Impact } from "../sections/Impact";
import { KindWords } from "../sections/KindWords";
// import { MtrustDeskDemo } from "../sections/MtrustDeskDemo";
import { QualityProof } from "../sections/QualityProof";
import { Skills } from "../sections/Skills";
import { Work } from "../sections/Work";

export function HomePage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        const timer = setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100);
        return () => clearTimeout(timer);
      }
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [location.hash, location.pathname]);
  return (
    <div className="w-full min-w-0">
      <Hero />
      <Impact />
      <QualityProof />
      <Work />
      {/* Interactive Architecture Simulation / Incident Coordinator Desk (temporarily disabled) */}
      {/* <MtrustDeskDemo /> */}
      <Skills />
      <Experience />
      <Awards />
      <KindWords />
      <FeaturedBlogs />
      <Builds />
      <Education />
      <Contact />
    </div>
  );
}
