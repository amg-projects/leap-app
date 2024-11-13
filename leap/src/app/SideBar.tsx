const profiles = [
  'Joao',
  'Maria',
  'Jose',
  'Ana',
  'Pedro',
  'Paulo',
  'Lucas',
  'Marcos',
  'Lucia',
  'Marta',
]

export function SideBar() {
  return (
    <div className="w-40 bg-blue-900">
      {profiles.map((profile) => (
        <div className="border border-black bg-red-900">{profile}</div>
      ))}
    </div>
  )
}
