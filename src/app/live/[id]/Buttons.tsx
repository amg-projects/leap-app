'use client'

import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff'
import AddIcon from '@mui/icons-material/Add'
import CheckIcon from '@mui/icons-material/Check'
import { useState } from 'react'

export function ButtonsSection() {
  return (
    <div className="flex gap-2">
      <FollowButton />
      <NotificationButton />
      <SubscribeButton />
    </div>
  )
}

function FollowButton() {
  const [followed, setFollowed] = useState(false)
  const invertFollow = function () {
    setFollowed(!followed)
  }
  return (
    <div className=" flex size-10 items-center rounded-full border border-foreground/[.17] text-center hover:cursor-pointer hover:bg-secondary">
      <span className="mx-auto" onClick={invertFollow}>
        {followed ? (
          <CheckIcon fontSize="large" />
        ) : (
          <AddIcon fontSize="large" />
        )}
      </span>
    </div>
  )
}
function NotificationButton() {
  const [notification, setNotification] = useState(false)
  const invertNotification = function () {
    setNotification(!notification)
  }
  return (
    <div className=" flex size-10 items-center rounded-full border border-foreground/[.17] text-center hover:cursor-pointer hover:bg-secondary">
      <span className="mx-auto" onClick={invertNotification}>
        {notification ? (
          <NotificationsActiveIcon fontSize="large" />
        ) : (
          <NotificationsOffIcon fontSize="large" />
        )}
      </span>
    </div>
  )
}
function SubscribeButton() {
  const [subscribe, setSubscribe] = useState(false)
  const invertSubscribe = function () {
    setSubscribe(!subscribe)
  }
  return (
    <div
      className="flex h-10 w-28 select-none items-center rounded-2xl border border-foreground/[.17] font-bold hover:cursor-pointer hover:bg-secondary"
      onClick={invertSubscribe}
    >
      <div className="mx-auto">{subscribe ? 'UNSUBSCRIBE' : 'SUBSCRIBE'}</div>
    </div>
  )
}
