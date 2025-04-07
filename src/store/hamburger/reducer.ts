import { HamburgerState, SetHamburgerState } from "./interface"

const initialState = {
    show: true
}
export const hamburger = (state: HamburgerState = initialState, { type }: SetHamburgerState) => {
    switch(type) {
        case "SHOW_HIDE_SIDEBAR":
            return {
                ...state,
                show: state.show ? false :  true
            }
        default:
            return state
    }
}