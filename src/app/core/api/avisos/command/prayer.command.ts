export class PrayerCommand {
    constructor (data?: any) {
        this.to = data?.to;
        this.from = data?.from;
    }

    to: string;
    from: string;
}