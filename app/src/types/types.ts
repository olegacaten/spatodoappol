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
    endDate: string;
    priority: 'Low'|'Middle'|'High';
    attachments: string[];
    previousStatus: 'QUEUE'|'DEVELOPMENT'|'DONE';
    status: 'QUEUE'|'DEVELOPMENT'|'DONE';
    subtasks?: Task[];
    comments: TypeComment[] | []; // Use the TypeComment type here
  };
  
  // Project type
  export type Project = {
    projectId: number;
    title: string;
    description: string;
    tasks: Task[];
  };