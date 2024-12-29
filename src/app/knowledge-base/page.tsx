'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'

const articles = [
  {
    id: 1,
    title: 'How to Process a Basic Claim',
    content: 'This article explains the step-by-step process of handling a basic insurance claim. First, gather all necessary information from the claimant, including policy number, date of incident, and description of the claim. Next, verify the policy details and coverage. Then, assess the claim based on the provided information and policy terms. If additional information is needed, contact the claimant. Finally, make a decision on the claim and communicate it to the claimant.',
    category: 'Claims Processing',
  },
  {
    id: 2,
    title: 'Understanding Policy Exclusions',
    content: 'Policy exclusions are specific situations or circumstances that are not covered by an insurance policy. Common exclusions include intentional acts, wear and tear, and certain natural disasters. It\'s crucial to thoroughly review policy documents to understand these exclusions. When processing claims, always check if any exclusions apply. If an exclusion does apply, clearly explain this to the claimant, referencing the specific policy language.',
    category: 'Policy Information',
  },
  {
    id: 3,
    title: 'Dealing with Difficult Customers',
    content: 'When dealing with difficult customers, remain calm and professional at all times. Listen actively to their concerns without interrupting. Acknowledge their feelings and show empathy. Avoid becoming defensive, even if the customer is upset. Focus on finding solutions rather than placing blame. If needed, escalate the issue to a supervisor. Always document the interaction thoroughly for future reference.',
    category: 'Customer Service',
  },
]

export default function KnowledgeBasePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedArticle, setSelectedArticle] = useState<typeof articles[0] | null>(null)

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.content.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Knowledge Base</h1>
      <div className="flex space-x-2">
        <Input
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button>Search</Button>
      </div>
      <Tabs defaultValue="articles" className="space-y-4">
        <TabsList>
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>
        <TabsContent value="articles" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map(article => (
              <Card key={article.id} className="cursor-pointer hover:bg-accent" onClick={() => setSelectedArticle(article)}>
                <CardHeader>
                  <CardTitle>{article.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-3">{article.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="categories" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {['Claims Processing', 'Policy Information', 'Customer Service'].map(category => (
              <Card key={category}>
                <CardHeader>
                  <CardTitle>{category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{articles.filter(a => a.category === category).length} articles</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      {selectedArticle && (
        <Card>
          <CardHeader>
            <CardTitle>{selectedArticle.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] w-full rounded-md border p-4">
              <p>{selectedArticle.content}</p>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

