import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-xl w-full bg-white p-8 rounded-xl shadow">
        <h1 className="text-3xl font-bold">FreelanceMatch</h1>
        <p className="text-gray-600 mt-2">
          Hire freelancers or find projects — login to continue.
        </p>

        <div className="mt-6 flex gap-3">
          <Link
            to="/login"
            className="px-5 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-5 py-2 rounded border border-gray-300 hover:bg-gray-50"
          >
            Register
          </Link>
        </div>

        <p className="text-sm text-gray-500 mt-6">
          🔒 Features are protected — you must login/register.
        </p>
      </div>
    </div>
  );
}
