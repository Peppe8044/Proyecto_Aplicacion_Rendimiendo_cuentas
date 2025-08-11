import LoginForm from "@/components/gastoagil/login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0F0F12] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">GA</span>
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">Inicia sesión en GastoÁgil</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Gestiona tus gastos de forma inteligente</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
