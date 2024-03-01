import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import s from '@/Components/scss/components.module.css';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            
        >
            <Head title="Dashboard" />

            <div className={`${s.form} my-12 max-w-7xl md:mx-4 md:rounded-lg xl:mx-auto sm:px-6 lg:px-8`}>
                <p>Hello world, and welcome to your dashboard</p>
            </div>
        </AuthenticatedLayout>
    );
}
