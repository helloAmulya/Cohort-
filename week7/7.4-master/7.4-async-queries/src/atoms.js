import { atom, selector } from "recoil";
import axios from 'axios'

export const notifications = atom({
    key: "networkAtom",
    default: selector({
        key: "networkSelector",
        get: async () => {
            const res = await axios.get("http://localhost:8080/notifications")
            return res.data
        },

        network: 4,
        jobs: 6,
        messaging: 3,
        notifications: 3
    })
});
// export const notifications = atom({
//     key: "networkAtom",
//     default: {
//         network: 4, 
//         jobs: 6, 
//         messaging: 3, 
//         notifications: 3
//     }
// });

export const totalNotificationSelector = selector({
    key: "totalNotificationSelector",
    get: ({ get }) => {
        const allNotifications = get(notifications);
        return allNotifications.network +
            allNotifications.jobs +
            allNotifications.notifications +
            allNotifications.messaging
    }
})