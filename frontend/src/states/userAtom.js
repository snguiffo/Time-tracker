import { atom } from "recoil";

export const userAtom = atom({
    key:'user',
    default: JSON.parse(localStorage.getItem('user'))
})