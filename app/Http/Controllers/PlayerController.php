<?php

namespace App\Http\Controllers;

use App\Models\Player;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PlayerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $players = Player::all();
        return Inertia::render('Players/Index', ['players' => $players]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Digunakan untuk debugging jika diperlukan
        // dd($request->all());

        $request->validate([
            'name' => 'required|string|max:255',
            'pawn_color' => 'required|string|max:50',
        ]);

        Player::create([
            'name' => $request->name,
            'pawn_color' => $request->pawn_color,
            'balance' => 15000,
            'properties' => json_encode([]),
        ]);

        return redirect()->back();
    }

    /**
     * Display the specified resource.
     */
    public function show(Player $player)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Player $player)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Player $player)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Player $player)
    {
        //
    }

    /**
     * Update the player's balance.
     */
    public function updateSaldo(Request $request, Player $player)
    {
        $request->validate([
            'amount' => 'required|integer',
        ]);

        $player->balance += $request->amount;
        $player->save();

        return redirect()->back();
    }

    /**
     * Update the player's properties.
     */
    public function updateProperty(Request $request, Player $player)
    {
        $validated = $request->validate([
            'property' => 'required|string',
            'action' => 'required|in:add,remove',
        ]);

        // Ambil properti yang sudah ada (anggap properti disimpan dalam bentuk array JSON)
        $properties = $player->properties ?? [];

        if ($validated['action'] === 'add') {
            // Cegah duplikasi
            if (!in_array($validated['property'], $properties)) {
                $properties[] = $validated['property'];
            }
        } elseif ($validated['action'] === 'remove') {
            // Hapus properti yang disebut
            $properties = array_filter($properties, function ($item) use ($validated) {
                return $item !== $validated['property'];
            });
        }

        // Simpan ke model Player
        $player->properties = array_values($properties); // reset index array
        $player->save(); // ⬅️ inilah bagian yang menyimpan ke database

        return redirect()->back();
    }
}
