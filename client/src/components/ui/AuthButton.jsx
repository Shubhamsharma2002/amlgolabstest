export default function AuthButton({ text, color }) {
  return (
    <button
      type="submit"
      className={`w-full ${color} text-white py-2 rounded-lg hover:opacity-90 transition`}
    >
      {text}
    </button>
  );
}