export class PersonCommand {
    constructor(data?: any) {
        this.name = data?.name;
        this.invitedBy = data?.invitedBy;
        this.church = data?.church || new ChurchCommand();
        this.birthday = new BirthdayCommand(data?.birthday);
    }

    name: string;
    invitedBy: string;
    church: ChurchCommand;
    birthday: BirthdayCommand;
}

export class ChurchCommand {
    constructor(data?: any) {
        this.attend = data?.attend;
        this.name = data?.name;
    }

    attend: boolean;
    name: string;
}

export class BirthdayCommand {
    constructor(data?: any) {
        this.type = data?.type;
        this.age = data?.age;
    }

    type: string;
    age: number;
}