'use client'

import { useRef } from 'react'

import { CopyIcon, FacebookIcon, ShareNodesIcon, TwitterIcon } from '@/components/icons'
import { useOutsideClick } from '@/hooks'

interface IShareButton {
  label?: string
}

export const ShareButton = ({ label }: IShareButton) => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  const getArticleUrl = () => `${window.location.protocol}//${window.location.host}${window.location.pathname}`

  const toggleDialog = () => {
    if (!dialogRef.current) return

    if (dialogRef.current.open) {
      dialogRef.current.close()
    } else {
      dialogRef.current.show()
    }
  }

  const closeDialog = () => {
    dialogRef.current?.close()
  }

  const wrapperRef = useOutsideClick<HTMLDivElement>(closeDialog)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getArticleUrl())
    closeDialog()
  }

  const shareTwitter = () => {
    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${label} ${getArticleUrl()}`)}`
    window.open(twitterShareUrl, '_blank')
    closeDialog()
  }

  const shareFB = () => {
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getArticleUrl())}`
    window.open(facebookShareUrl, '_blank')
    closeDialog()
  }

  return (
    <div ref={wrapperRef} className="relative">
      <button onClick={toggleDialog}>
        <ShareNodesIcon height={16} />
      </button>
      <dialog ref={dialogRef} className="absolute translate-x-[calc(-100%_+_14px)] rounded-md border-2 border-gray-500">
        <ul className="cursor-pointer select-none rounded-md bg-white text-sm">
          <li
            className="flex items-center gap-2 whitespace-nowrap px-3 py-2 hover:bg-gray-300"
            onClick={copyToClipboard}
          >
            <CopyIcon height={16} />
            Copy link
          </li>
          <li className="flex items-center gap-2 whitespace-nowrap px-3 py-2 hover:bg-gray-300" onClick={shareTwitter}>
            <TwitterIcon height={16} />
            Twitter
          </li>
          <li className="flex items-center gap-2 whitespace-nowrap px-3 py-2 hover:bg-gray-300" onClick={shareFB}>
            <FacebookIcon height={16} />
            Facebook
          </li>
        </ul>
      </dialog>
    </div>
  )
}
