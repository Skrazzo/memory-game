import s from "@/Components/scss/components.module.css";
import { Link } from "@inertiajs/react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

export default function Paginator({ current_page, next_page_url, prev_page_url, className = ''}) {
    return (
        <div className={`w-full flex justify-center items-center gap-2 ${className}`}>
            {prev_page_url &&
                <Link className={s.icon_btn} href={prev_page_url}>
                    <IconChevronLeft />
                </Link>
            }
            <strong className={s.primary_text}>{current_page}</strong>
            {next_page_url &&
                <Link className={s.icon_btn} href={next_page_url}>
                    <IconChevronRight />
                </Link>
            }
        </div>
    )
}
