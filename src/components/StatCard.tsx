type Props = {
  title: string;
  value: string;
};

function StatCard({ title, value }: Props) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg transition">
      <p className="text-slate-500">{title}</p>

      <h2 className="text-4xl font-bold mt-3">{value}</h2>
    </div>
  );
}

export default StatCard;
