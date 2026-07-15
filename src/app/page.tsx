import CTA from "./components/home/CTA";
import FAQ from "./components/home/FAQ";
import FeaturedCourses from "./components/home/FeaturedCourses";
import Hero from "./components/home/Hero";
import LearningPaths from "./components/home/LearningPaths";
import LearningProcess from "./components/home/LearningProcess";
import Statistics from "./components/home/Statistics";
import WhyChooseUs from "./components/home/WhyChooseUs";

export default function Home() {
  return (
    <main>
      <Hero />

      <FeaturedCourses />

      <LearningPaths />

      <WhyChooseUs />
      <LearningProcess />

      <Statistics />

      <FAQ />

      <CTA />
    </main>
  );
}