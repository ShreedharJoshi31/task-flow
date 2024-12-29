"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TaskList } from "@/components/scheduler/task-list";

interface Task {
  id: string;
  title: string;
  priority: "low" | "medium" | "high";
  status: "pending" | "in-progress" | "completed";
  assignedTo: string;
  dueDate: Date;
  notes?: string;
  claimNumber?: string;
}

export default function SchedulerPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [taskTitle, setTaskTitle] = useState("");
  const [taskPriority, setTaskPriority] = useState<"low" | "medium" | "high">(
    "medium"
  );
  const [tasks, setTasks] = useState<Task[]>([]);
  const { toast } = useToast();
  const searchParams = useSearchParams();

  // Check if we're coming from a claim detail page
  const date = searchParams.get("date");

  useEffect(() => {
    if (date) {
      setSelectedDate(new Date(date));
    }

    // Load tasks from localStorage
    const storedTasks = JSON.parse(
      localStorage.getItem("scheduledTasks") || "[]"
    );
    setTasks(
      storedTasks.map((task: Task) => ({
        ...task,
        dueDate: new Date(task.dueDate),
      }))
    );
  }, [date]);

  const handleScheduleTask = () => {
    if (!taskTitle || !taskPriority || !selectedDate) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title: taskTitle,
      priority: taskPriority,
      status: "pending",
      assignedTo: "Current User", // In a real app, this would be the logged-in user
      dueDate: selectedDate,
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem("scheduledTasks", JSON.stringify(updatedTasks));

    toast({
      title: "Task Scheduled",
      description: `Task "${taskTitle}" has been scheduled for ${selectedDate.toDateString()}.`,
    });

    // Clear the form
    setTaskTitle("");
    setTaskPriority("medium");
  };

  const handleStatusChange = (taskId: string, newStatus: Task["status"]) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("scheduledTasks", JSON.stringify(updatedTasks));

    toast({
      title: "Task Updated",
      description: `Task status has been updated to ${newStatus}.`,
    });
  };

  const filteredTasks = tasks.filter(
    (task) => task.dueDate.toDateString() === selectedDate?.toDateString()
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Follow-Up Scheduler</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Schedule Task</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="task-title">Task Title</Label>
                <Input
                  id="task-title"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  placeholder="Enter task title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="task-priority">Priority</Label>
                <Select
                  value={taskPriority}
                  onValueChange={(value: "low" | "medium" | "high") =>
                    setTaskPriority(value)
                  }
                >
                  <SelectTrigger id="task-priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleScheduleTask} className="w-full">
                Schedule Task
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <TaskList tasks={filteredTasks} onStatusChange={handleStatusChange} />
    </div>
  );
}
