import Link from "next/link";
import { HomeIcon, FolderIcon, DocumentTextIcon, UserIcon } from "@heroicons/react/24/outline";

export function Sidebar() {
  return (
    <div className="fixed top-0 left-0 h-screen w-60 bg-[#E84A27] text-white p-4 hidden md:block">
      <h1 className="text-xl font-bold mb-6">LOGO</h1>

      <nav className="space-y-2">
        <NavLink href="/dashboard" icon={<HomeIcon className="w-5 h-5" />} label="Dashboard" />
        <NavLink href="/portfolio" icon={<FolderIcon className="w-5 h-5" />} label="Portfolio" active />
        <NavLink href="/inputs" icon={<DocumentTextIcon className="w-5 h-5" />} label="Inputs" />
        <NavLink href="/profile" icon={<UserIcon className="w-5 h-5" />} label="Profile" />
      </nav>
    </div>
  );
}

function NavLink({ href, icon, label, active = false }: { href: string; icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
        active ? "bg-white/20" : "hover:bg-white/10"
      }`}
    >
      {icon}
      {label}
    </Link>
  );
}
