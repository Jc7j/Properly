'use client'

import { Pencil } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogDescription,
  DialogTitle,
  Input,
} from '~/components/ui'
import dayjs from '~/lib/utils/day'
import { type ManagementGroupItemWithUser } from '~/server/api/routers/managementGroupItems'
import { api } from '~/trpc/react'

export default function ExpandedInfo({
  item,
}: {
  item: ManagementGroupItemWithUser
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [newQuantity, setNewQuantity] = useState<string>(
    item.quantityOnHand.toString()
  )
  const [showConfirmation, setShowConfirmation] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const utils = api.useUtils()
  const { mutate: updateQuantity, isPending } =
    api.managementGroupItems.updateQuantity.useMutation({
      onSuccess: () => {
        void utils.managementGroupItems.getMany.invalidate()
        setIsEditing(false)
      },
    })

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditing])

  function handleEdit() {
    setIsEditing(true)
    setNewQuantity(item.quantityOnHand.toString())
  }

  function handleSave() {
    const parsedQuantity = parseInt(newQuantity)
    if (isNaN(parsedQuantity) || parsedQuantity === item.quantityOnHand) {
      setIsEditing(false)
      return
    }
    setShowConfirmation(true)
  }

  function handleConfirm() {
    updateQuantity({
      id: item.id,
      quantityOnHand: parseInt(newQuantity),
    })
    setShowConfirmation(false)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      setIsEditing(false)
    }
  }

  return (
    <div className="animate-in slide-in-from-top duration-200 grid grid-cols-1 gap-4 px-4 py-3 sm:grid-cols-2 lg:grid-cols-3">
      <div className="space-y-1">
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          Created by
        </p>
        <div className="flex items-center gap-3">
          <Image
            src={item.createdByImageUrl}
            alt={item.createdByName}
            width={24}
            height={24}
            className="rounded-full"
          />
          <div className="min-w-0 flex-1 space-y-1">
            <p className="truncate text-sm text-zinc-900 dark:text-zinc-50">
              {item.createdByName}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {dayjs(item.createdAt).format('MMM D, YYYY [at] h:mm A')}
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          Last updated by
        </p>
        <div className="flex items-center gap-3">
          <Image
            src={item.updatedByImageUrl}
            alt={item.updatedByName}
            width={24}
            height={24}
            className="rounded-full"
          />
          <div className="min-w-0 flex-1 space-y-1">
            <p className="truncate text-sm text-zinc-900 dark:text-zinc-50">
              {item.updatedByName}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {dayjs(item.updatedAt).format('MMM D, YYYY [at] h:mm A')}
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          Quantity on Hand
        </p>
        <div className="flex items-center gap-3">
          {isEditing ? (
            <div className="flex w-full items-center gap-2 sm:w-auto">
              <Input
                ref={inputRef}
                type="text"
                value={newQuantity}
                onChange={(e) => setNewQuantity(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={handleSave}
                className="w-full sm:w-20 text-center"
              />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-sm text-zinc-900 dark:text-zinc-50">
                {item.quantityOnHand}
              </span>
              <Button variant="ghost" onClick={handleEdit}>
                <Pencil className="size-4" />
              </Button>
            </div>
          )}
        </div>
      </div>

      <Dialog
        open={showConfirmation}
        onClose={() => setShowConfirmation(false)}
      >
        <DialogTitle>Update Quantity</DialogTitle>
        <DialogDescription>
          Are you sure you want to update the quantity from{' '}
          {item.quantityOnHand} to {parseInt(newQuantity)}?
        </DialogDescription>
        <DialogActions>
          <Button
            variant="outline"
            onClick={() => setShowConfirmation(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleConfirm}
            disabled={isPending}
          >
            {isPending ? 'Updating...' : 'Update'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
