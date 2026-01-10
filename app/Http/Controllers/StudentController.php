<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentController extends Controller
{
public function index()
    {
        return Inertia::render('Teacher/Students/Index', [
            'students' => [] 
        ]);
    }

    // IDAGDAG ITO:
    public function create()
    {
        return Inertia::render('Teacher/Students/Create');
    }
}
