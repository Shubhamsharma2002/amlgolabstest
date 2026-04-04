export default function AuthLayout({ children, title, subtitle, gradient }) {
  return (
    <div className="min-h-screen flex">

      {/* LEFT */}
      <div className={`hidden md:flex w-1/2 ${gradient} text-white items-center justify-center`}>
        <div className="text-center px-10">
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          <p className="text-lg">{subtitle}</p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100">
        {children}
      </div>

    </div>
  );
}