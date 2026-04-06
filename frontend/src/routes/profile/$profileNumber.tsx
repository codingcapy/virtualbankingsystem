import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/profile/$profileNumber')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/profile/$profileNumber"!</div>
}
