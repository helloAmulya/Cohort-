// import './App.css'
// import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil'
// import { jobsAtom, messagingAtom, networkAtom, notificationsAtom, totalNotificationSelector } from './atoms'
// import { useMemo } from 'react'
// //RecoilRoot

// function App() {
//   return <RecoilRoot>
//     <MainApp />
//   </RecoilRoot>
// }

// function MainApp() {
//   const networkNotificationCount = useRecoilValue(networkAtom)
//   const jobsAtomCount = useRecoilValue(jobsAtom);
//   const notificationsAtomCount = useRecoilValue(notificationsAtom)
//   const messagingAtomCount = useRecoilValue(messagingAtom)
//   const totalNotificationCount = useRecoilValue(totalNotificationSelector);

//   // const totalNotificationCount = useMemo(() => {
//   //   return networkNotificationCount + jobsAtomCount + notificationsAtomCount + messagingAtomCount;
//   // }, [networkNotificationCount, jobsAtomCount, notificationsAtomCount, messagingAtomCount])

//   return (
//     <>
//       <button>Home</button>

//       <button>My network ({networkNotificationCount >= 100 ? "99+" : networkNotificationCount})</button>
//       <button>Jobs {jobsAtomCount}</button>
//       <button>Messaging ({messagingAtomCount})</button>
//       <button>Notifications ({notificationsAtomCount})</button>

//       <button>Me ({totalNotificationCount})</button>
//     </>
//   )
// }

// export default App

import React, { useState } from "react";
import { useRecoilValue, RecoilRoot, useRecoilState } from "recoil";
import {
  networkAtom,
  jobsAtom,
  notificationsAtom,
  messagingAtom,
  totalNotificationCount,
} from "./atoms";

function App() {
  return (
    <RecoilRoot>
      <MainApp />
    </RecoilRoot>
  );
}
function MainApp() {
  const networkNotificationCount = useRecoilValue(networkAtom);
  const jobsAtomCount = useRecoilValue(jobsAtom);
  const notificationsAtomCount = useRecoilValue(notificationsAtom);
  const [messagingAtomCount, setMessagingCount] = useRecoilState(messagingAtom);
  // const totalNotificationCount = networkNotificationCount + jobsAtomCount + messagingAtomCount + notificationsAtomCount
  // console.log(totalNotificationCount)
  const totalAtomCount = useRecoilValue(totalNotificationCount)
  // console.log({totalAtomCount})

  return (
    <div>
      <button>Home</button>

      <button>
        a({networkNotificationCount >= 100 ? "99+" : networkNotificationCount})
      </button>
      <button>b({jobsAtomCount})</button>
      <button>c({notificationsAtomCount})</button>
      <button>d({messagingAtomCount})</button>

      <button onClick={() => setMessagingCount(messagingAtomCount + 1)}>
        Me
      </button>
      <button>e({totalAtomCount})</button>

    </div>
  );
}

export default App;
