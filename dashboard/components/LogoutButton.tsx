import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    // Borra el usuario del localStorage si existe
    if (typeof window !== 'undefined') {
      localStorage.removeItem('gastoagil_user');
    }
    // Redirige a la landing original en public
    window.location.href = "/index.html";
    // Si usas NextAuth y necesitas cerrar sesión en el backend, puedes agregar:
    // await signOut({ redirect: false });
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
