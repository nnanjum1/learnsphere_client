interface SectionTitleProps {
    badge?: string;
    title: string;
    description?: string;
    center?: boolean;
}

const SectionTitle = ({
    badge,
    title,
    description,
    center = false,
}: SectionTitleProps) => {
    return (
        <div className={center ? "text-center" : "text-left"}>
            {badge && (
                <span className="inline-flex rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
                    {badge}
                </span>
            )}

            <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-4xl">
                {title}
            </h2>

            <p
                className={`mt-4 text-slate-600 leading-7 ${center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"
                    }`}
            >
                {description}
            </p>
        </div>
    );
};

export default SectionTitle;