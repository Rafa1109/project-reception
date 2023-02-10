export class PresentationCommand {
    constructor(data?: any) {
        this.parents = data?.parents;
        this.children = data?.children;
    }

    parents: string;
    children: string;
}