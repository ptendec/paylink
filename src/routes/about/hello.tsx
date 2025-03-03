import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about/hello')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/about/hello"!</div>
}
