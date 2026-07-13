import {
    HiCodeBracket,
    HiCpuChip,
    HiDevicePhoneMobile,
    HiServerStack,
} from "react-icons/hi2";

import Button from "./Button";
import { LearningPath } from "@/app/types/learningPath";

interface LearningPathCardProps {
    path: LearningPath;
}

const LearningPathCard = ({ path }: LearningPathCardProps) => {
    const icons = {
        frontend: HiCodeBracket,
        backend: HiServerStack,
        ai: HiCpuChip,
        mobile: HiDevicePhoneMobile,
    };

    const Icon = icons[path.slug as keyof typeof icons] ?? HiCodeBracket;

    return (
        <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100">
                <Icon className="h-8 w-8 text-indigo-600" />
            </div>

            <h3 className="mt-5 text-2xl font-bold text-slate-900">
                {path.title}
            </h3>

            <p className="mt-3 flex-1 leading-7 text-slate-600">
                {path.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
                {path.technologies.map((tech) => (
                    <span
                        key={tech}
                        className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700"
                    >
                        {tech}
                    </span>
                ))}
            </div>

            <div className="mt-6 flex items-center justify-between">
                <span className="text-sm font-semibold text-indigo-600">
                    {path.totalCourses} Courses
                </span>

                <Button>Start Path</Button>
            </div>
        </article>
    );
};

export default LearningPathCard;