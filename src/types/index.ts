export type QuestionnaireStatus = 'draft' | 'completed' | 'generating' | 'done'
export type DeliverableStatus = 'pending' | 'generating' | 'completed' | 'error'

export interface Questionnaire {
  id: string
  user_id: string
  status: QuestionnaireStatus
  current_step: number
  answers: Record<string, unknown>
  created_at: string
  updated_at: string
}

export interface Deliverable {
  id: string
  questionnaire_id: string
  user_id: string
  template_id: string
  title: string
  content: string | null
  status: DeliverableStatus
  error_message: string | null
  model_used: string | null
  tokens_used: number | null
  image_urls: string[]
  created_at: string
  updated_at: string
}
