const profiles = [
    "Joao", "Maria", "Jose", "Ana", "Pedro", "Paulo", "Lucas", "Marcos", "Lucia", "Marta"
]

export function SideBar() {
    return (
        <div className="w-40 bg-blue-900">
            {profiles.map((profile) => <div className="bg-red-900 border border-black">{profile}</div>)}
        </div>
    )
}