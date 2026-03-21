'use client'

import { type UseFormReturn } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

interface FieldConfig {
  key: string
  label: string
  placeholder?: string
  type?: 'input' | 'textarea'
}

interface DynamicObjectArrayFieldProps {
  form: UseFormReturn<Record<string, unknown>>
  name: string
  label: string
  fields: FieldConfig[]
  addLabel?: string
  emptyMessage?: string
}

export default function DynamicObjectArrayField({
  form,
  name,
  label,
  fields,
  addLabel = 'Add Item',
  emptyMessage = 'No items added yet.',
}: DynamicObjectArrayFieldProps) {
  const values = (form.watch(name) as Record<string, string>[]) || []
  const error = form.formState.errors[name]

  const addItem = () => {
    const emptyItem: Record<string, string> = {}
    for (const field of fields) {
      emptyItem[field.key] = ''
    }
    form.setValue(name, [...values, emptyItem], { shouldValidate: false })
  }

  const removeItem = (index: number) => {
    const updated = values.filter((_, i) => i !== index)
    form.setValue(name, updated, { shouldValidate: true })
  }

  const updateField = (index: number, key: string, value: string) => {
    const updated = [...values]
    updated[index] = { ...updated[index], [key]: value }
    form.setValue(name, updated, { shouldValidate: false })
  }

  return (
    <div className="space-y-4">
      <Label>{label}</Label>

      {values.length === 0 && (
        <p className="text-sm text-slate-500">{emptyMessage}</p>
      )}

      {values.map((item, index) => (
        <div
          key={index}
          className="rounded-xl border border-slate-600/50 bg-slate-900/50 p-4 space-y-3"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">
              #{index + 1}
            </span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => removeItem(index)}
              className="h-7 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 border-red-500/30"
            >
              Remove
            </Button>
          </div>

          {fields.map((field) => (
            <div key={field.key} className="space-y-1">
              <label className="text-xs font-medium text-slate-400">
                {field.label}
              </label>
              {field.type === 'textarea' ? (
                <Textarea
                  value={item[field.key] || ''}
                  onChange={(e) => updateField(index, field.key, e.target.value)}
                  placeholder={field.placeholder}
                  rows={2}
                />
              ) : (
                <Input
                  value={item[field.key] || ''}
                  onChange={(e) => updateField(index, field.key, e.target.value)}
                  placeholder={field.placeholder}
                />
              )}
            </div>
          ))}
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
