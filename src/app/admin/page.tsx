import { columns, Payment } from './status/columns'
import { DataTable } from './status/data-table'

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'm@example.com',
    },
    // ...
  ]
}

export default async function AdminPage() {
  const data = await getData()

  return (
    <div className="h-screen w-screen bg-background text-foreground">
      <h1>Admin Page</h1>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
