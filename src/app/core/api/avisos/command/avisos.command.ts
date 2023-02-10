import { PersonCommand } from "./person.command";
import { PrayerCommand } from "./prayer.command";
import { PresentationCommand } from "./presentation.command";

export class AvisoCommand {
    constructor(data?: any) {
        this.guestType = data?.guestType;
        this.date = data?.date ?? new Date();
        this.person = new PersonCommand(data?.person) || null;
        this.prayer = new PrayerCommand(data?.prayer) || null;
        this.presentation = new PresentationCommand(data?.presentation) || null;
        this.message = data?.message
    }

    guestType: number;
    date: Date;
    person: PersonCommand;
    prayer: PrayerCommand;
    presentation: PresentationCommand;
    message: string;
}