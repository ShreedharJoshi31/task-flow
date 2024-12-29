import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check, X } from 'lucide-react'

interface Task {
  id: string
  title: string
  priority: 'low' | 'medium' | 'high'
  status: 'pending' | 'in-progress' | 'completed'
  assignedTo: string
  dueDate: Date
  notes?: string
  claimNumber?: string
}

interface TaskListProps {
  tasks: Task[]
  onStatusChange: (taskId: string, newStatus: Task['status']) => void
}

export function TaskList({ tasks, onStatusChange }: TaskListProps) {
  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'low': return 'bg-blue-100 text-blue-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'high': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'pending': return 'bg-gray-100 text-gray-800'
      case 'in-progress': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Scheduled Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li key={task.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-semibold">{task.title}</h3>
                <p className="text-sm text-gray-500">Assigned to: {task.assignedTo}</p>
                {task.claimNumber && (
                  <p className="text-sm text-gray-500">Claim: {task.claimNumber}</p>
                )}
                <div className="flex space-x-2 mt-2">
                  <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                  <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {task.status !== 'completed' && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onStatusChange(task.id, 'completed')}
                  >
                    <Check className="w-4 h-4 mr-1" /> Complete
                  </Button>
                )}
                {task.status === 'pending' && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onStatusChange(task.id, 'in-progress')}
                  >
                    Start
                  </Button>
                )}
                {task.status === 'in-progress' && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onStatusChange(task.id, 'pending')}
                  >
                    <X className="w-4 h-4 mr-1" /> Stop
                  </Button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

