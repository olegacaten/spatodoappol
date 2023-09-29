export {}; 
// TypeComment type
export type TypeComment = {
    commentId: number;
    text: string;
    userId: number;
    timestamp: Date;
    replies: TypeComment[]; // Reference the TypeComment type itself for replies
  };
  
  // Task type
  export type Task = {
    taskId: number;
    title: string;
    description: string;
    creationDate: Date;
    timeSpent: number;
    endDate: Date | null;
    priority: 'Low'|'Middle'|'High';
    attachments: string[];
    status: string;
    subtasks: Task[];
    comments: TypeComment[]; // Use the TypeComment type here
  };
  
  // Project type
  export type Project = {
    projectId: number;
    title: string;
    description: string;
    tasks: Task[];
  };
  
  // Example usage:
  const project: Project = {
    projectId: 1,
    title: "Sample Project",
    description: "Its todo list project",
    tasks: [
      {
        taskId: 1,
        title: "Task 1",
        description: "Task description",
        creationDate: new Date(),
        timeSpent: 0,
        endDate: null,
        priority: "High",
        attachments: [],
        status: "Open",
        subtasks: [],
        comments: [
          {
            commentId: 1,
            text: "This is a comment",
            userId: 2,
            timestamp: new Date(),
            replies: [
              {
                commentId: 2,
                text: "Reply to comment 1",
                userId: 3,
                timestamp: new Date(),
                replies: [],
              },
            ],
          },
        ],
      },
      // Add more tasks here
    ],
  };
  