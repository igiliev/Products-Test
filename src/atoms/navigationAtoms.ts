import { atom } from 'jotai'

export type ViewType = 'list' | 'single'

export const currentViewAtom = atom<ViewType>('list')
export const selectedProductIdAtom = atom<number | null>(null)