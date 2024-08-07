export type RequestType = "post" | "put" | "patch" | "get" | "delete"

export type HttpRequestCallback = ({ headers, body, params }: HttpRequest) => Promise<ResponseEntity<unknown>> | ResponseEntity<unknown>

export type HttpRequest = { headers: any, body: any, params: any }

export interface ResponseEntity<T> {
  status: 200 | 201 | 204 | 400 | 401 | 404 | 500
  data?: T
}