import type { UF } from "./mask";

export type { UF };
export interface OAB {
    uf: UF;
    number: string;
    suffix?: string;
}

export function validateOAB(oab: OAB): boolean {
    const numberRegex = /^\d{4,6}$/;
    const digitsOnlyNumber = oab.number.replace(/\D/g, "");

    if (!oab.uf) return false;
    if (!numberRegex.test(digitsOnlyNumber)) return false;

    return true;
}

export function formatOAB(oab: OAB): string {
    if (oab.suffix) {
        return `${oab.uf} ${oab.number}-${oab.suffix}`;
    }

    return `${oab.uf} ${oab.number}`;
}

export function formatOABNumber(value: string): string {
    const digits = value.replace(/\D/g, "").slice(0, 6);

    if (digits.length <= 3) return digits;

    return `${digits.slice(0, 3)}.${digits.slice(3)}`;
}