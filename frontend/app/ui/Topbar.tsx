"use client";
import { Link } from "@nextui-org/react";
import { Icon } from "@iconify/react";

export default function TopBar() {
    return (
        <div className="container z-20 px-4 flex flex-row justify-end items-center h-20 w-full space-x-4">
            <Link
                href=""
                className="text-primary text-3xl">
                <Icon icon="simple-icons:tripadvisor" />
            </Link>

            <Link
                href=""
                className="text-primary text-3xl">
                <Icon icon="ic:baseline-facebook" />
            </Link>

        </div>
    );
}
