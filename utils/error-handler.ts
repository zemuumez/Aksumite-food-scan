export interface ApiError {
  message: string
  status?: number
  errors?: Record<string, string[]>
}

export class AppError extends Error {
  public status: number
  public errors?: Record<string, string[]>

  constructor(message: string, status = 500, errors?: Record<string, string[]>) {
    super(message)
    this.name = "AppError"
    this.status = status
    this.errors = errors
  }
}

export function handleApiError(error: any): AppError {
  if (error instanceof AppError) {
    return error
  }

  if (error?.response) {
    const { status, data } = error.response
    return new AppError(data?.message || "An error occurred", status, data?.errors)
  }

  if (error?.message) {
    return new AppError(error.message)
  }

  return new AppError("An unexpected error occurred")
}

export function getErrorMessage(error: any): string {
  if (error instanceof AppError) {
    return error.message
  }

  if (error?.message) {
    return error.message
  }

  return "An unexpected error occurred"
}

export function getFieldErrors(error: any): Record<string, string[]> {
  if (error instanceof AppError && error.errors) {
    return error.errors
  }

  return {}
}
