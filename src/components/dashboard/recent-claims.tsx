import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const recentClaims = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    amount: '$1,999.00',
    status: 'pending',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    amount: '$1,250.00',
    status: 'processing',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    amount: '$3,500.00',
    status: 'completed',
  },
]

export function RecentClaims() {
  return (
    <div className="space-y-8">
      {recentClaims.map((claim) => (
        <div key={claim.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={`https://avatar.vercel.sh/${claim.name}.png`} alt={claim.name} />
            <AvatarFallback>{claim.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{claim.name}</p>
            <p className="text-sm text-muted-foreground">{claim.email}</p>
          </div>
          <div className="ml-auto font-medium">{claim.amount}</div>
        </div>
      ))}
    </div>
  )
}

