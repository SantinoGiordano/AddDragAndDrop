import Link from "next/link";

export default function Nav() {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-lg">
      <div className="flex justify-center space-x-8">
        <Link
          href={"/"}
          className="text-xl font-semibold hover:text-blue-200 transition duration-300"
        >
          Home
        </Link>
        <Link
          href={"/AddUsers"}
          className="text-xl font-semibold hover:text-blue-200 transition duration-300"
        >
          Add User
        </Link>
        <Link
          href={"/RemoveUsers"}
          className="text-xl font-semibold hover:text-blue-200 transition duration-300"
        >
          Remove User
        </Link>
      </div>
    </nav>
  );
}
