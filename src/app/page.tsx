import FeaturedCourses from "./components/home/FeaturedCourses";
import Hero from "./components/home/Hero";
import LearningPaths from "./components/home/LearningPaths";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedCourses />
      <LearningPaths />
    </main>
  );
}