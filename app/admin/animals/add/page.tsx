import { getZones } from './actions';
import AddAnimalForm from './AddAnimalForm';

export default async function AddAnimalPage() {
  const zones = await getZones();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-800 tracking-tight">Add New Animal</h1>
        <p className="text-slate-500 mt-2">Enter the details of the new animal to add it to the zoo database.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/40 border border-slate-200/60 p-6 md:p-8">
        <AddAnimalForm zones={zones} />
      </div>
    </div>
  );
}
