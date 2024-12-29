'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useToast } from "@/components/ui/use-toast"
import { ScheduleFollowUpModal } from '@/components/claims/schedule-follow-up-modal'
import { Task } from '@/types/task'


// Mock function to fetch claim data
const fetchClaimData = async (id: string) => {
  // In a real application, this would be an API call
  await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API delay
  return {
    id,
    claimNumber: `CLM00${id}`,
    customer: 'John Doe',
    amount: 1500,
    status: 'Pending',
    priority: 'High',
    description: 'Car accident on Main St.',
    sentimentScore: 0.7,
    sentimentAnalysis: 'Positive',
  }
}

export default function ClaimDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [claimData, setClaimData] = useState(null)
  const [notes, setNotes] = useState('')
  const [isFollowUpModalOpen, setIsFollowUpModalOpen] = useState(false)

  useEffect(() => {
    const loadClaimData = async () => {
      const data = await fetchClaimData(params.id as string)
      setClaimData(data)
    }
    loadClaimData()
  }, [params.id])

  const handleResolve = () => {
    toast({
      title: "Claim Resolved",
      description: `Claim ${claimData?.claimNumber} has been marked as resolved.`,
    })
  }

  const handleScheduleFollowUp = () => {
    setIsFollowUpModalOpen(true)
  }

  const handleFollowUpScheduled = (task: Task) => {
    toast({
      title: "Follow-up Scheduled",
      description: `Follow-up for Claim ${claimData?.claimNumber} has been scheduled for ${task.dueDate.toDateString()}.`,
    })
    // Store the task in localStorage
    const storedTasks = JSON.parse(localStorage.getItem('scheduledTasks') || '[]')
    localStorage.setItem('scheduledTasks', JSON.stringify([...storedTasks, task]))
    router.push(`/scheduler?date=${task.dueDate.toISOString()}`)
  }

  if (!claimData) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Claim Details: {claimData.claimNumber}</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Claim Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="font-medium">Customer</dt>
                <dd>{claimData.customer}</dd>
              </div>
              <div>
                <dt className="font-medium">Amount</dt>
                <dd>${claimData.amount.toFixed(2)}</dd>
              </div>
              <div>
                <dt className="font-medium">Status</dt>
                <dd>
                  <Badge variant={claimData.status === 'Approved' ? 'success' : claimData.status === 'Rejected' ? 'destructive' : 'default'}>
                    {claimData.status}
                  </Badge>
                </dd>
              </div>
              <div>
                <dt className="font-medium">Priority</dt>
                <dd>{claimData.priority}</dd>
              </div>
              <div className="col-span-2">
                <dt className="font-medium">Description</dt>
                <dd>{claimData.description}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Sentiment Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="font-medium">Sentiment Score</div>
                <div className="text-2xl font-bold">{claimData.sentimentScore.toFixed(2)}</div>
              </div>
              <div>
                <div className="font-medium">Analysis</div>
                <div>{claimData.sentimentAnalysis}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <Label htmlFor="notes">Add a note</Label>
          <Textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Enter your notes here..."
            className="mt-2"
          />
        </CardContent>
      </Card>
      <div className="flex space-x-4">
        <Button onClick={handleResolve}>Resolve Claim</Button>
        <Button variant="outline" onClick={handleScheduleFollowUp}>Schedule Follow-up</Button>
      </div>
      <ScheduleFollowUpModal
        isOpen={isFollowUpModalOpen}
        onClose={() => setIsFollowUpModalOpen(false)}
        onSchedule={handleFollowUpScheduled}
        claimNumber={claimData.claimNumber}
      />
    </div>
  )
}

