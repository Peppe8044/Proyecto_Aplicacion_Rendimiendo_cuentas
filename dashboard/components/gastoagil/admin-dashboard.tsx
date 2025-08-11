import Layout from "./layout"
import AdminContent from "./admin-content"

export default function AdminDashboard() {
  return (
    <Layout isAdmin={true}>
      <AdminContent />
    </Layout>
  )
}
