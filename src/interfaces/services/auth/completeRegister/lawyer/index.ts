import { ISharedCompleteRegister } from "@/interfaces/shared/completeRegister";

export interface ILawyerCompleteRegister extends ISharedCompleteRegister {
    oabNumber: string;
    oabState: string;
    specialization: string;
}