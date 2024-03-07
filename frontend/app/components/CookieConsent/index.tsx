'use client';

import React, {useEffect} from 'react';
import * as CookieConsent from 'vanilla-cookieconsent';
import 'vanilla-cookieconsent/dist/cookieconsent.css';
import getConfig from '@/app/components/CookieConsent/Config';
import addEventListeners from '@/app/components/CookieConsent/Listeners';

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { Icon } from "@iconify/react";

/**
 * This example uses custom event listeners.
 * You can use either event listeners or callback functions:
 * https://cookieconsent.orestbida.com/advanced/callbacks-events.html
 */

const ResetCookieConsent = () => {
    CookieConsent.reset(true);
    CookieConsent.run(getConfig());
};

const CookieConsentComponent = () => {
    useEffect(() => {
        addEventListeners();
        CookieConsent.run(getConfig());
    }, []);

    return (
        <div className="p-8">
            <Dropdown className="bg-transparent">
                <DropdownTrigger>
                    <div className="bg-primary flex justify-center items-center size-12 rounded-full">
                        <Icon icon="material-symbols:cookie-outline" className="text-secondary text-2xl" />
                    </div>
                </DropdownTrigger>
                <DropdownMenu className="bg-secondary rounded-md p-4" aria-label="Nastavení cookies">
                    <DropdownItem
                        key="edit"
                        showDivider
                        startContent={<Icon icon="carbon:settings" className="text-lg" />}
                        onClick={CookieConsent.showPreferences}
                    >
                        Nastavení cookies
                    </DropdownItem>
                    <DropdownItem
                        key="delete"
                        className="text-danger"
                        color="danger"
                        startContent={<Icon icon="carbon:reset" className="text-lg" />}
                        onClick={ResetCookieConsent}
                    >
                        Resetovat nastavení cookies
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
};

export default CookieConsentComponent;
