'use client'

import { type UseFormReturn } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

interface DynamicArrayFieldProps {
  form: UseFormReturn<Record<string, unknown>>
  name: string
  label: string
  placeholder?: string
  addLabel?: string
}

export default function DynamicArrayField({
  form,
  name,
  label,
  placeholder = 'Enter a value...',
  addLabel = 'Add Item',
}: DynamicArrayFieldProps) {
  const values = (form.watch(name) as string[]) || []
  const error = form.formState.errors[name]

  const addItem = () => {
    const current = [...values, '']
    form.setValue(name, current, { shouldValidate: false })
  }

  const removeItem = (index: number) => {
    const current = values.filter((_, i) => i !== index)
    form.setValue(name, current, { shouldValidate: true })
  }

  const updateItem = (index: number, value: string) => {
    const current = [...values]
    current[index] = value
    form.setValue(name, current, { shouldValidate: false })
  }

  return (
    <div className="space-y-3">
      <Label>{label}</Label>

      {values.length === 0 && (
        <p className="text-sm text-slate-500">No items added yet.</p>
      )}

      {values.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <Input
            value={item}
            onChange={(e) => updateItem(index, e.target.value)}
            placeholder={placeholder}
            className="flex-1"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => removeItem(index)}
            className="shrink-0 text-red-400 hover:text-red-300 hover:bg-red-500/10 border-red-500/30"
          >
            Remove
          </Button>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addItem}
        className="border-slate-600 text-slate-300 hover:bg-slate-700/50 hover:text-white"
      >
        + {addLabel}
      </Button>

      {error && (
        <p className="text-sm text-red-400">
          {error.message as string}
        </p>
      )}
    </div>
  )
}
