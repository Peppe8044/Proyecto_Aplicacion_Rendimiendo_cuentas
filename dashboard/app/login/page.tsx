import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">Iniciar Sesión</h1>
        <button
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition mb-4"
          onClick={() => signIn("google")}
        >
          Iniciar sesión con Google
        </button>
        {/* Puedes agregar más proveedores aquí */}
      </div>
    </div>
  );
}
