interface SectionBadgeProps {
    children: React.ReactNode;
}

const SectionBadge = ({ children }: SectionBadgeProps) => {
    return (
        <span className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700">
            {children}
        </span>
    );
};

export default SectionBadge;