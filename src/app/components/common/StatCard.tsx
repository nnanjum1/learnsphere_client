interface StatCardProps {
    value: string;
    label: string;
}

const StatCard = ({ value, label }: StatCardProps) => {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <h3 className="text-3xl font-bold text-indigo-600">
                {value}
            </h3>

            <p className="mt-2 text-sm text-slate-500">
                {label}
            </p>
        </div>
    );
};

export default StatCard;