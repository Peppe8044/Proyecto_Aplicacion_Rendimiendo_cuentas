import { Calendar, CreditCard, Wallet, User, UserPlus } from "lucide-react"
import List01 from "./list-01"
import List02 from "./list-02"
import List03 from "./list-03"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import OCRScanner from "@/components/ocr-scanner"

export default function () {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 flex flex-col border border-gray-200 dark:border-[#1F1F23]">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 text-left flex items-center gap-2 ">
            <Wallet className="w-3.5 h-3.5 text-zinc-900 dark:text-zinc-50" />
            Accounts
          </h2>
          <div className="flex-1">
            <List01 className="h-full" />
          </div>
        </div>
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 flex flex-col border border-gray-200 dark:border-[#1F1F23]">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 text-left flex items-center gap-2">
            <CreditCard className="w-3.5 h-3.5 text-zinc-900 dark:text-zinc-50" />
            Recent Transactions
          </h2>
          <div className="flex-1">
            <List02 className="h-full" />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 flex flex-col items-start justify-start border border-gray-200 dark:border-[#1F1F23]">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 text-left flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5 text-zinc-900 dark:text-zinc-50" />
          Upcoming Events
        </h2>
        <List03 />
      </div>

      {/* OCR Scanner Section */}
      <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 flex flex-col items-start justify-start border border-gray-200 dark:border-[#1F1F23]">
        <OCRScanner />
      </div>

      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-4">¿Listo para gestionar tus gastos de forma inteligente?</h2>
        <p className="text-blue-100 mb-6">
          Únete a miles de freelancers y PYMEs que ya optimizan sus gastos con GastoÁgil
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/auth/register">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <UserPlus className="w-5 h-5 mr-2" />
              Comenzar Gratis
            </Button>
          </Link>
          <Link href="/auth/login">
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
            >
              <User className="w-5 h-5 mr-2" />
              Iniciar Sesión
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
