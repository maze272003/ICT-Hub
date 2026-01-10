import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
// Idinagdag ang Lucide icon para sa header style
import { Settings2 } from 'lucide-react';

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header="Account Settings"
        >
            <Head title="Profile Settings" />

            <div className="py-12">
                {/* Max-width container para sa consistent alignment */}
                <div className="mx-auto max-w-7xl space-y-10 px-4 sm:px-6 lg:px-8">
                    
                    {/* TANDAAN: Inalis na natin ang 'bg-white' at 'shadow' wrappers dito.
                        Ang bawat partial form na in-update natin ay may sarili nang 
                        'bg-slate-900/40 backdrop-blur-2xl' styling.
                    */}

                    {/* Section 1: Profile Info */}
                    <div className="transition-all duration-500 hover:translate-y-[-4px]">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="w-full"
                        />
                    </div>

                    {/* Section 2: Security/Password */}
                    <div className="transition-all duration-500 hover:translate-y-[-4px]">
                        <UpdatePasswordForm className="w-full" />
                    </div>

                    {/* Section 3: Danger Zone */}
                    <div className="transition-all duration-500 hover:translate-y-[-4px]">
                        <DeleteUserForm className="w-full" />
                    </div>
                    
                </div>
            </div>
        </AuthenticatedLayout>
    );
}