"use client";
import React from "react";
import { Input, Textarea, Button, Select, SelectItem } from "@nextui-org/react";
import { Icon } from "@iconify/react";

interface FormData {
    name: string;
    email: string;
    message: string;
}

export const categories : { label: string, value: string, icon: string }[] = [
    { label: "Rezervace stolu", value: "Rezervace stolu", icon: "ph:beer-stein-bold" },
    { label: "Oslava", value: "Oslava", icon: "material-symbols:room-service-outline-rounded" },
    { label: "Ubytování", value: "Ubytování", icon: "material-symbols:bed-outline-rounded" },
];

export default function ContactForm() {
    const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
    const [selectedCategory, setSelectedCategory] = React.useState("");

    const handleSelectionChange = (keys:any): void => {
        setSelectedKeys(keys);

        if (keys instanceof Set && keys.size > 0) {
            setSelectedCategory(Array.from(keys)[0]);
        } else {
            setSelectedCategory("");
        }
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formDataObj: FormData = Object.fromEntries(formData.entries()) as unknown as FormData;
        const backendPath:string|undefined = process.env.NEXT_PUBLIC_API;

        try {
            const response:Response = await fetch(`${backendPath}/api/email-sender/send`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    to: "info@patrikvadura.cz",
                    ...formDataObj,
                }),
            });

            if (response.ok) {
                alert('Děkujeme za vaši rezervaci. Vyčkejte prosím na odpověď a potvrzení rezervace.');
            } else {
                alert('Při odesílání emailu došlo k chybě. Zkuste to prosím za chvíli.');
            }
        } catch (error) {
            console.error('Chyba při odesílání formuláře:', error);
        }
    };


    return (
        <form onSubmit={ handleSubmit }>
            <div className="grid gap-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                    <Input
                        isRequired
                        id="name"
                        name="name"
                        type="text"
                        variant="underlined"
                        placeholder="Vaše jméno"
                        classNames={{
                            input: [
                                "text-black/90 dark:text-white/90",
                                "placeholder:text-black/50 dark:placeholder:text-white/60",
                            ],
                            inputWrapper: [
                                "border-b-medium shadow-none border-default-300 dark:border-gray-500 hover:border-primary",
                                "after:border-bottom-[4px] after:bg-primary after:-bottom-[2px] after:h-[2px]",
                            ],
                        }}
                    />
                    <Input
                        isRequired
                        id="email"
                        name="email"
                        type="email"
                        variant="underlined"
                        placeholder="Vaše emailová adresa"
                        classNames={{
                            input: [
                                "text-black/90 dark:text-white/90",
                                "placeholder:text-black/50 dark:placeholder:text-white/60",
                            ],
                            inputWrapper: [
                                "border-b-medium shadow-none border-default-300 dark:border-gray-500 hover:border-primary",
                                "after:border-bottom-[4px] after:bg-primary after:-bottom-[2px] after:h-[2px]",
                            ],
                        }}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-y-0 md:gap-x-4 items-end">
                    <Select
                        label="Zvolte kategorii rezervace"
                        variant="underlined"
                        selectedKeys={selectedKeys}
                        onSelectionChange={handleSelectionChange}
                        classNames={{
                            value: [
                                "text-black/90 dark:text-white/90",
                                "placeholder:text-black/50 dark:placeholder:text-white/60",
                            ],
                            trigger: [
                                "border-b-medium shadow-none border-default-300 dark:border-gray-500 hover:border-primary",
                                "after:border-bottom-[4px] after:bg-primary after:-bottom-[2px] after:h-[2px]",
                            ],
                        }}
                    >
                        {categories.map((category) => (
                            <SelectItem
                                key={category.value}
                                value={category.value}
                                startContent={<Icon icon={category.icon} className="text-primary text-lg"/>}
                            >
                                {category.label}
                            </SelectItem>
                        ))}
                    </Select>

                    <Input
                        type="number"
                        placeholder="1"
                        labelPlacement="outside"
                        variant="underlined"
                        endContent={
                            <Icon icon="mingcute:send-plane-line" className="text-black dark:text-white opacity-50" />
                        }
                        classNames={{
                            input: [
                                "text-black/90 dark:text-white/90",
                                "placeholder:text-black/50 dark:placeholder:text-white/60",
                            ],
                            inputWrapper: [
                                "border-b-medium shadow-none border-default-300 dark:border-gray-500 hover:border-primary",
                                "after:border-bottom-[4px] after:bg-primary after:-bottom-[2px] after:h-[2px]",
                            ],
                        }}
                    />
                </div>

                {(() => {
                    if (selectedCategory === 'Ubytování') {
                        return (
                            <div className="grid grid-cols-2 gap-x-4 items-end">
                                <Input
                                    type="date"
                                    label="Datum příjezdu"
                                    placeholder="Datum příjezdu"
                                    variant="underlined"
                                    classNames={{
                                        input: [
                                            "text-black/90 dark:text-white/90",
                                            "placeholder:text-black/50 dark:placeholder:text-white/60",
                                        ],
                                        inputWrapper: [
                                            "border-b-medium shadow-none border-default-300 dark:border-gray-500 hover:border-primary",
                                            "after:border-bottom-[4px] after:bg-primary after:-bottom-[2px] after:h-[2px]",
                                        ],
                                    }}
                                />
                                <Input
                                    type="number"
                                    placeholder="Délka trvání pobytu"
                                    variant="underlined"
                                    endContent={
                                        <span className="text-black dark:text-white text-sm opacity-50">dní</span>
                                    }
                                    classNames={{
                                        input: [
                                            "text-black/90 dark:text-white/90",
                                            "placeholder:text-black/50 dark:placeholder:text-white/60",
                                        ],
                                        inputWrapper: [
                                            "border-b-medium shadow-none border-default-300 dark:border-gray-500 hover:border-primary",
                                            "after:border-bottom-[4px] after:bg-primary after:-bottom-[2px] after:h-[2px]",
                                        ],
                                    }}
                                />
                            </div>
                        );
                    } else {
                        return null;
                    }
                })()}

                <div className="grid grid-cols-1 gap-4">
                    <Textarea
                        maxRows={3}
                        id="message"
                        name="message"
                        variant="underlined"
                        placeholder="Vaše zpráva"
                        classNames={{
                            input: [
                                "text-black/90 dark:text-white/90",
                                "placeholder:text-black/50 dark:placeholder:text-white/60",
                            ],
                            inputWrapper: [
                                "border-b-medium shadow-none border-default-300 dark:border-gray-500 hover:border-primary",
                                "after:border-bottom-[4px] after:bg-primary after:-bottom-[2px] after:h-[2px]",
                            ],
                        }}
                    />
                    <Button
                        type="submit"
                        color="primary"
                        variant="solid"
                        className="mx-auto w-full md:w-fit md:px-10"
                        startContent={<Icon icon="mingcute:send-plane-line"/>}
                    >
                        Odeslat rezervaci
                    </Button>
                </div>
            </div>
        </form>
    );
}
