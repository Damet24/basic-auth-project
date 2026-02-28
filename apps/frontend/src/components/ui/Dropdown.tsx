import { useEffect, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

type Props = {
  trigger: ReactNode
  children: ReactNode
}

export function Dropdown({ trigger, children }: Props) {
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })

  const triggerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // Posicionar dropdown
  useEffect(() => {
    if (!open || !triggerRef.current) return

    const rect = triggerRef.current.getBoundingClientRect()

    setPosition({
      top: rect.bottom + window.scrollY + 4,
      left: rect.right + window.scrollX - 160, // ancho aprox
    })
  }, [open])

  // Cerrar al hacer click afuera
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        contentRef.current &&
        !contentRef.current.contains(e.target as Node) &&
        !triggerRef.current?.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }

    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [open])

  return (
    <>
      <div ref={triggerRef} onClick={() => setOpen((o) => !o)}>
        {trigger}
      </div>

      {open &&
        createPortal(
          <div
            ref={contentRef}
            style={{
              position: 'absolute',
              top: position.top,
              left: position.left,
            }}
            className="z-50 w-40 rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
          >
            {children}
          </div>,
          document.body,
        )}
    </>
  )
}
