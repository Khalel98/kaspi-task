export interface Post {
  id: number
  title: string
  body: string
  img?: string
}

export interface State {
  posts: Post[]
  post: Post | null
  loading: boolean
  query: string
}
