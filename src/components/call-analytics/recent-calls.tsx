import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PlayCircle, Flag } from 'lucide-react'

const recentCalls = [
  {
    id: '1',
    customer: 'John Doe',
    duration: '5m 23s',
    sentiment: 'Positive',
    sentimentScore: 0.85,
    flagged: false,
    date: '2023-04-15',
  },
  {
    id: '2',
    customer: 'Jane Smith',
    duration: '3m 45s',
    sentiment: 'Neutral',
    sentimentScore: 0.55,
    flagged: false,
    date: '2023-04-15',
  },
  {
    id: '3',
    customer: 'Bob Johnson',
    duration: '8m 12s',
    sentiment: 'Negative',
    sentimentScore: 0.25,
    flagged: true,
    date: '2023-04-14',
  },
]

export function RecentCalls() {
  return (
    <div className="space-y-8">
      {recentCalls.map((call) => (
        <div key={call.id} className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">{call.customer}</p>
            <p className="text-xs text-muted-foreground">{call.date}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant={call.sentiment === 'Positive' ? 'success' : call.sentiment === 'Negative' ? 'destructive' : 'default'}>
              {call.sentiment} ({(call.sentimentScore * 100).toFixed(0)}%)
            </Badge>
            <p className="text-sm text-muted-foreground">{call.duration}</p>
            {call.flagged && <Flag className="h-4 w-4 text-destructive" />}
            <Button variant="outline" size="sm">
              <PlayCircle className="mr-2 h-4 w-4" />
              Listen
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

