import Layout from "@/components/gastoagil/layout"
import NewExpenseForm from "@/components/gastoagil/new-expense-form"

export default function NewExpensePage() {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Nuevo Gasto</h1>
          <p className="text-gray-600 dark:text-gray-400">Escanea tu recibo o ingresa los datos manualmente</p>
        </div>
        <NewExpenseForm />
      </div>
    </Layout>
  )
}
