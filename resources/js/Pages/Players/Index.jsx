import { useForm } from "@inertiajs/react";

export default function Index({ players }) {
    const { data, setData, post, reset, errors } = useForm({
        name: "",
        pawn_color: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post("/players", { onSuccess: () => reset() });
    };

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Data Pemain Monopoli</h1>

            <form onSubmit={submit} className="mb-6 space-y-4">
                <input
                    type="text"
                    placeholder="Nama Pemain"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    className="w-full border p-2"
                />
                <input
                    type="text"
                    placeholder="Warna Pion"
                    value={data.pawn_color}
                    onChange={(e) => setData("pawn_color", e.target.value)}
                    className="w-full border p-2"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Tambah Pemain
                </button>
            </form>

            <table className="w-full table-auto border-collapse">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Nama</th>
                        <th className="border p-2">Warna</th>
                        <th className="border p-2">Saldo</th>
                        <th className="border p-2">Properti</th>
                    </tr>
                </thead>
                <tbody>
                    {players.map((pemain) => {
                        const saldoForm = useForm({ amount: 0 });
                        const propertyForm = useForm({
                            property: "",
                            action: "add",
                        });

                        const updateSaldo = (e) => {
                            e.preventDefault();
                            saldoForm.post(`/players/${pemain.id}/saldo`);
                        };

                        const updateProperty = (e) => {
                            e.preventDefault();
                            propertyForm.post(`/players/${pemain.id}/property`);
                        };

                        return (
                            <tr key={pemain.id} className="align-top">
                                <td className="border p-2">{pemain.name}</td>
                                <td className="border p-2">
                                    {pemain.pawn_color}
                                </td>
                                <td className="border p-2">
                                    Rp{pemain.balance}
                                    <form
                                        onSubmit={updateSaldo}
                                        className="mt-2 flex gap-2"
                                    >
                                        <input
                                            type="number"
                                            value={saldoForm.data.amount}
                                            onChange={(e) =>
                                                saldoForm.setData(
                                                    "amount",
                                                    e.target.value
                                                )
                                            }
                                            className="border px-1 w-24"
                                            placeholder="+ / -"
                                        />
                                        <button className="bg-green-500 text-white px-2">
                                            OK
                                        </button>
                                    </form>
                                </td>
                                <td className="border p-2">
                                    {pemain.properties?.length > 0
                                        ? pemain.properties.join(", ")
                                        : "Tidak ada"}

                                    <form
                                        onSubmit={updateProperty}
                                        className="mt-2 flex gap-2"
                                    >
                                        <input
                                            type="text"
                                            value={propertyForm.data.property}
                                            onChange={(e) =>
                                                propertyForm.setData(
                                                    "property",
                                                    e.target.value
                                                )
                                            }
                                            className="border px-1"
                                            placeholder="Nama Properti"
                                        />
                                        <select
                                            value={propertyForm.data.action}
                                            onChange={(e) =>
                                                propertyForm.setData(
                                                    "action",
                                                    e.target.value
                                                )
                                            }
                                            className="border px-1"
                                        >
                                            <option value="add">Tambah</option>
                                            <option value="remove">
                                                Hapus
                                            </option>
                                        </select>
                                        <button className="bg-blue-500 text-white px-2">
                                            OK
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
