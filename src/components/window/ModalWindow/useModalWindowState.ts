import { ReactNode } from 'react'
import { create } from 'zustand'

interface HistoryFormat {
    content: ReactNode,
    modalWindowOptions: [],
}

interface ModalWindowStateFormat {
    history: HistoryFormat[],
    currentIndex: number,
    open: ({content, modalWindowOptions}: HistoryFormat) => void,
    back: () => void,
    close: () => void,
}

const useModalWindowState = create<ModalWindowStateFormat>()(
    (set, get) => ({
        history: [],
        currentIndex: -1,

        open: ({content, modalWindowOptions}) => set((state) => {
            const newHistory = [
                ...state.history, 
                {
                    content: content, 
                    modalWindowOptions: modalWindowOptions
                }
            ]

            return {
                ...state,
                history: newHistory,
                currentIndex: (newHistory.length - 1),
            }
        }),
        back: () => set((state) => {
            if (state.currentIndex == 0) {
                get().close()
                return { ...state }
            }

            const newHistory = [...state.history]
            newHistory.pop()

            return {
                ...state,
                history: newHistory,
                currentIndex: (newHistory.length - 1),
            }
        }),
        close: () => set((state) => {
            return {
                ...state,
                history: [],
                currentIndex: -1,
            }
        }),
    })
)

export default useModalWindowState