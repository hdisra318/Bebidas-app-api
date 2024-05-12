import {StateCreator} from 'zustand';
import { FavoritesSliceType } from './favoritesSlice';

/* Notification to show */
type Notification = {
    text: string,
    error: boolean,
    show: boolean
}

export type NotificationSliceType = {
    notification: Notification,
    showNotification: (payload: Pick<Notification, 'text' | 'error'>) => void,// Para que solo reciba el text y error
    hideNotification: () => void
}

export const createNotificationSlice : StateCreator<NotificationSliceType & FavoritesSliceType, [], [], NotificationSliceType> = (set, get) => ({
    notification: {
        text: '',
        error: false,
        show: false
    },
    // Muestra la notificacion
    showNotification: (payload) => {
        set({
            notification: {
                text: payload.text,
                error: payload.error,
                show: true
            }
        })

        // Cerrar la notificacion despues de 3 seg.
        setTimeout(() => {
            get().hideNotification()
        }, 3000);
    },
    // Oculta la notificaion
    hideNotification: () => {
        set({
            notification: {
                text: '',
                error: true,
                show: false
            }
        })
    }
})