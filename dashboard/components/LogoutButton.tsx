import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
  await signOut({ callbackUrl: "http://localhost:3000/../frontend/index.html" });
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="w-full flex items-center justify-between p-2 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 rounded-lg transition-colors duration-200"
    >
      <div className="flex items-center gap-2">
        <LogOut className="w-4 h-4" />
        <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Cerrar Sesión</span>
      </div>
    </button>
  );
}
