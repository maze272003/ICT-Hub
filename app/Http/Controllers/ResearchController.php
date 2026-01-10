<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ResearchController extends Controller
{
    /**
     * I-render ang Research page.
     * Tumatanggap ito ng $slug para sa hashed cookie security.
     */
    public function index(Request $request, $slug)
    {
        // Static muna tayo gaya ng request mo, walang complex functions.
        return Inertia::render('Shared/Research');
    }
}