export function InputBox({ type, label, placeholder, onChange }) {
  return (
    <div>
      <div className="text-sm font-medium text-left pt-3 pb-1">{label}</div>
      <input
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-2 py-1 border rounded border-slate-200 focus:outline-none bg-transparent "
      />
    </div>
  );
}
