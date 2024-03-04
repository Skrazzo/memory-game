import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import s from '@/Components/scss/components.module.css';
import Game from "@/Components/Game";

export default function Play({ auth }) {
    return (
        <Authenticated 
            user={auth.user}
        >
            <Head title="Play" />

            <div className="gap-1 gap-3"></div> {/* predefined tailwind class, so it includes it in the build */}
            <div className={`${s.form} my-12 max-w-7xl md:mx-4 md:rounded-lg xl:mx-auto sm:px-6 lg:px-8 `}>
                <Game />
            </div>
        </Authenticated>
    )
}
