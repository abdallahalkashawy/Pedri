export const SETUSER = "SETUSER";
export const GETUSER = "GETUSER";

export function setUser(item) {
    return {
        type: SETUSER,
        payload: item
    }
}
