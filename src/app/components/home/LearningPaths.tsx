"use client";

import { useEffect, useState } from "react";

import Container from "../common/Container";
import LearningPathCard from "../common/LearningPathCard";
import SectionTitle from "../common/SectionTitle";

import { getLearningPaths } from "@/app/services/learningPathService";
import { LearningPath } from "@/app/types/learningPath";

const LearningPaths = () => {
    const [paths, setPaths] = useState<LearningPath[]>([]);

    useEffect(() => {
        const loadPaths = async () => {
            try {
                const data = await getLearningPaths();
                setPaths(data);
            } catch (error) {
                console.error(error);
            }
        };

        loadPaths();
    }, []);

    return (
        <section className="bg-slate-50 py-20">
            <Container>
                <SectionTitle
                    badge="Learning Paths"
                    title="Choose Your Career Journey"
                    description="Follow structured roadmaps designed to help you become job-ready."
                    center
                />

                <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                    {paths.map((path) => (
                        <LearningPathCard
                            key={path.id}
                            path={path}
                        />
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default LearningPaths;