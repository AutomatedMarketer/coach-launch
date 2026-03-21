'use client'

import { useState, useRef, useCallback } from 'react'
import { type UseFormReturn } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Upload, X, ImageIcon, Loader2 } from 'lucide-react'
import { safeParseJSON } from '@/lib/utils'

const MAX_CLIENT_FILE_SIZE = 3 * 1024 * 1024 // 3MB per file — safe buffer below 4MB server limit (multipart encoding adds ~33% overhead)

interface StepBrandAssetsProps {
  form: UseFormReturn<Record<string, unknown>>
}

interface UploadProgress {
  [filename: string]: number
}

export default function StepBrandAssets({ form }: StepBrandAssetsProps) {
  const { register, setValue, watch } = form

  const brandPhotoUrls = (watch('brandPhotoUrls') as string[]) || []
  const logoUrl = (watch('logoUrl') as string) || ''

  const [photoUploading, setPhotoUploading] = useState(false)
  const [logoUploading, setLogoUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({})

  const photoInputRef = useRef<HTMLInputElement>(null)
  const logoInputRef = useRef<HTMLInputElement>(null)

  // Get the questionnaire_id from localStorage
  const getQuestionnaireId = useCallback(() => {
    return localStorage.getItem('questionnaire_id') || ''
  }, [])

  const uploadFiles = useCallback(async (
    files: FileList,
    type: 'headshots' | 'logos' | 'brand-photos'
  ): Promise<string[]> => {
    const questionnaireId = getQuestionnaireId()
    if (!questionnaireId) {
      throw new Error('No questionnaire found. Please refresh the page.')
    }

    // Client-side file size check before uploading
    for (const file of Array.from(files)) {
      if (file.size > MAX_CLIENT_FILE_SIZE) {
        const sizeMB = (file.size / (1024 * 1024)).toFixed(1)
        throw new Error(`"${file.name}" is ${sizeMB}MB — max 3MB per file. Please resize or compress it.`)
      }
    }

    const formData = new FormData()
    formData.append('questionnaire_id', questionnaireId)
    formData.append('type', type)

    for (const file of Array.from(files)) {
      formData.append('files', file)
      setUploadProgress(prev => ({ ...prev, [file.name]: 0 }))
    }

    // Simulate progress since fetch doesn't support upload progress natively
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        const updated = { ...prev }
        for (const key of Object.keys(updated)) {
          if (updated[key] < 90) {
            updated[key] = updated[key] + Math.random() * 20
          }
        }
        return updated
      })
    }, 300)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      clearInterval(progressInterval)

      if (!response.ok) {
        const data = await safeParseJSON(response)
        throw new Error(data.error || 'Upload failed')
      }

      const data = await safeParseJSON(response)

      // Mark all as complete
      setUploadProgress(prev => {
        const updated = { ...prev }
        for (const key of Object.keys(updated)) {
          updated[key] = 100
        }
        return updated
      })

      // Clear progress after a moment
      setTimeout(() => setUploadProgress({}), 1000)

      return data.urls as string[]
    } catch (error) {
      clearInterval(progressInterval)
      setUploadProgress({})
      throw error
    }
  }, [getQuestionnaireId])

  const handlePhotoUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    // Check total count
    if (brandPhotoUrls.length + files.length > 10) {
      setUploadError('You can upload up to 10 photos total.')
      return
    }

    setUploadError(null)
    setPhotoUploading(true)

    try {
      const urls = await uploadFiles(files, 'brand-photos')
      setValue('brandPhotoUrls', [...brandPhotoUrls, ...urls], { shouldDirty: true })
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : 'Upload failed')
    } finally {
      setPhotoUploading(false)
      // Reset the input so the same file can be selected again
      if (photoInputRef.current) {
        photoInputRef.current.value = ''
      }
    }
  }, [brandPhotoUrls, setValue, uploadFiles])

  const handleLogoUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    setUploadError(null)
    setLogoUploading(true)

    try {
      const urls = await uploadFiles(files, 'logos')
      setValue('logoUrl', urls[0], { shouldDirty: true })
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : 'Upload failed')
    } finally {
      setLogoUploading(false)
      if (logoInputRef.current) {
        logoInputRef.current.value = ''
      }
    }
  }, [setValue, uploadFiles])

  const removePhoto = useCallback((index: number) => {
    const updated = brandPhotoUrls.filter((_, i) => i !== index)
    setValue('brandPhotoUrls', updated, { shouldDirty: true })
  }, [brandPhotoUrls, setValue])

  const removeLogo = useCallback(() => {
    setValue('logoUrl', '', { shouldDirty: true })
  }, [setValue])

  return (
    <div className="space-y-6">
      {/* Upload Error */}
      {uploadError && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3">
          <p className="text-sm text-red-400">{uploadError}</p>
        </div>
      )}

      {/* Brand Photos */}
      <div className="space-y-2">
        <Label>Your Best Photos</Label>
        <p className="text-sm text-gray-500">
          Upload your best headshots, action shots, and photos of you in action.
          These become the foundation for your ad images and social posts.
        </p>

        {/* Photo Previews */}
        {brandPhotoUrls.length > 0 && (
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
            {brandPhotoUrls.map((url, index) => (
              <div
                key={url}
                className="group relative aspect-square overflow-hidden rounded-lg border border-slate-600 bg-slate-900/50"
              >
                <img
                  src={url}
                  alt={`Brand photo ${index + 1}`}
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removePhoto(index)}
                  className="absolute right-1 top-1 rounded-full bg-black/60 p-1 text-white opacity-0 transition-opacity hover:bg-red-500 group-hover:opacity-100"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Upload Progress */}
        {Object.keys(uploadProgress).length > 0 && (
          <div className="space-y-1">
            {Object.entries(uploadProgress).map(([filename, progress]) => (
              <div key={filename} className="flex items-center gap-2">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-700">
                  <div
                    className="h-full rounded-full bg-amber-400 transition-all duration-300"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
                <span className="text-xs text-slate-400 w-16 text-right">
                  {Math.round(Math.min(progress, 100))}%
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Upload Button */}
        {brandPhotoUrls.length < 10 && (
          <div>
            <input
              ref={photoInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              multiple
              onChange={handlePhotoUpload}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => photoInputRef.current?.click()}
              disabled={photoUploading}
              className="border-slate-600 bg-slate-900/50 text-slate-300 hover:bg-slate-700/50 hover:text-white hover:border-slate-500"
            >
              {photoUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Photos ({brandPhotoUrls.length}/10)
                </>
              )}
            </Button>
          </div>
        )}

        <p className="text-xs text-slate-500">
          JPG, PNG, or WebP. Max 3MB per file. Up to 10 images.
        </p>
      </div>

      {/* Logo Upload */}
      <div className="space-y-2">
        <Label>
          Your Logo <span className="text-slate-500">(optional)</span>
        </Label>
        <p className="text-sm text-gray-500">
          If you don&apos;t have one, no worries — we&apos;ll work with your photos.
        </p>

        {/* Logo Preview */}
        {logoUrl && (
          <div className="relative inline-block">
            <div className="h-24 w-24 overflow-hidden rounded-lg border border-slate-600 bg-slate-900/50">
              <img
                src={logoUrl}
                alt="Logo"
                className="h-full w-full object-contain p-1"
              />
            </div>
            <button
              type="button"
              onClick={removeLogo}
              className="absolute -right-2 -top-2 rounded-full bg-slate-700 p-1 text-white hover:bg-red-500"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        )}

        {/* Logo Upload Button */}
        {!logoUrl && (
          <div>
            <input
              ref={logoInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleLogoUpload}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => logoInputRef.current?.click()}
              disabled={logoUploading}
              className="border-slate-600 bg-slate-900/50 text-slate-300 hover:bg-slate-700/50 hover:text-white hover:border-slate-500"
            >
              {logoUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <ImageIcon className="mr-2 h-4 w-4" />
                  Upload Logo
                </>
              )}
            </Button>
          </div>
        )}
      </div>

      {/* Brand Colors */}
      <div className="space-y-2">
        <Label htmlFor="brandColors">Your Brand Colors</Label>
        <p className="text-sm text-gray-500">
          Primary and accent colors. Hex codes if you have them (like #FF5500),
          or just describe them (like &quot;navy blue and gold&quot;).
        </p>
        <Input
          id="brandColors"
          placeholder='e.g. #1A3B5C (navy), #D4A843 (gold) — or just "navy blue and gold"'
          {...register('brandColors')}
        />
      </div>

      {/* Brand Fonts */}
      <div className="space-y-2">
        <Label htmlFor="brandFonts">
          Your Brand Fonts <span className="text-slate-500">(optional)</span>
        </Label>
        <p className="text-sm text-gray-500">
          If you have specific fonts, list them here.
        </p>
        <Input
          id="brandFonts"
          placeholder="e.g. Montserrat for headings, Open Sans for body"
          {...register('brandFonts')}
        />
      </div>
    </div>
  )
}
