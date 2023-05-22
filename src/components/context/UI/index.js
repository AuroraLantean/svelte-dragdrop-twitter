import { getContext } from "svelte";


export const key = Symbol();//produce unique identifier
export const getUIContext = () => getContext(key);