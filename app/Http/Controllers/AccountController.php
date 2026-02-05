<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Repositories\Interfaces\UserRepositoryInterface;
use App\Services\AccountService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AccountController extends Controller
{
    protected AccountService $accountService;
    protected UserRepositoryInterface $userRepository;

    public function __construct(AccountService $accountService, UserRepositoryInterface $userRepository)
    {
        $this->accountService = $accountService;
        $this->userRepository = $userRepository;
    }

    /**
     * Display the Manage Account page
     */
    public function edit(Request $request)
    {
        $data = $this->accountService->getAccountData();
        
        return Inertia::render('Account/Edit', $data);
    }

    /**
     * Handle Profile & Password Updates
     */
    public function update(Request $request)
    {
        $user = $request->user();
        $data = $request->all();

        try {
            $result = $this->accountService->updateAccount($user, $data);
            
            return redirect()->route('account.edit')->with('status', $result['message']);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return redirect()->back()
                ->withErrors($e->errors())
                ->withInput();
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'An error occurred while updating your account.')
                ->withInput();
        }
    }
}
