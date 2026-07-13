import FAQ from "./components/home/FAQ";
import FeaturedCourses from "./components/home/FeaturedCourses";
import Hero from "./components/home/Hero";
import LearningPaths from "./components/home/LearningPaths";
import Statistics from "./components/home/Statistics";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedCourses />
      <LearningPaths />
      <Statistics />
      <FAQ />
    </main>
  );
}