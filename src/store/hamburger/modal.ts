export class HandleHamburger {
    type: string = "SHOW_HIDE_SIDEBAR"
    constructor() {
        this.type = "SHOW_HIDE_SIDEBAR"
    }
    action() {
        return {
            type: this.type
        }
    }
}