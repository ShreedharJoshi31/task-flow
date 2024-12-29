'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

const claims = [
  { id: 1, claimNumber: 'CLM001', customer: 'John Doe', amount: 1500, status: 'Pending', priority: 'High' },
  { id: 2, claimNumber: 'CLM002', customer: 'Jane Smith', amount: 2000, status: 'Approved', priority: 'Medium' },
  { id: 3, claimNumber: 'CLM003', customer: 'Bob Johnson', amount: 1000, status: 'Rejected', priority: 'Low' },
  // Add more sample data as needed
]

export default function ClaimsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')

  const filteredClaims = claims.filter(claim =>
    claim.claimNumber.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (statusFilter === 'all' || claim.status === statusFilter) &&
    (priorityFilter === 'all' || claim.priority === priorityFilter)
  )

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Claims List</h1>
      <div className="flex space-x-2">
        <Input
          placeholder="Search claims..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Approved">Approved</SelectItem>
            <SelectItem value="Rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="High">High</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Low">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Claim Number</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredClaims.map((claim) => (
            <TableRow key={claim.id}>
              <TableCell>{claim.claimNumber}</TableCell>
              <TableCell>{claim.customer}</TableCell>
              <TableCell>${claim.amount.toFixed(2)}</TableCell>
              <TableCell>
                <Badge variant={claim.status === 'Approved' ? 'success' : claim.status === 'Rejected' ? 'destructive' : 'default'}>
                  {claim.status}
                </Badge>
              </TableCell>
              <TableCell>{claim.priority}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/claims/${claim.id}`}>View Details</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

