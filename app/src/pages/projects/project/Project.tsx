import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Project, Task } from "../../../types/types";
import InfoButtonTodo from "../../../layouts/btns/InfoButtonTodo/InfoButtonTodo";
import "./Project.scss";
import {
  Reorder,
  AnimatePresence,
  useDragControls,
  motion,
} from "framer-motion";
import ProjectAddTask from "./project_add_task/ProjectAddTask";

const variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    scale: 0.8,
    opacity: 0,
    height: 0,
  },
};

const ProjectPage = () => {
  const projects: Project[] = JSON.parse(
    localStorage.getItem("ObjectsKey") as string
  );
  let storage: Project[] = JSON.parse(
    localStorage.getItem("ObjectsKey") as string
  );
  const { id } = useParams();
  const project: Project = projects.filter(
    (item) => item.projectId === parseInt(id as string)
  )[0];
  const [tasks, setTask] = useState<Task[]>(project.tasks);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  const handleDragStart = (item: Task) => {
    setDraggedTask(item);
  };

  
  const handleDragEnd = () => {
    if (draggedTask) {
      // Determine the source and destination columns
      const sourceStatus = draggedTask.status;
      const destinationStatus =
        draggedTask.status === "QUEUE" ? "DEVELOPMENT" : "DONE";
  
      // Calculate the task's position within the current group
      const taskIndex = tasks.findIndex((task) => task.taskId === draggedTask.taskId);
      const taskElement = document.getElementById(`${draggedTask.taskId}`);
      const taskRect = taskElement?.getBoundingClientRect();
      
      // Calculate the position of the group
      const groupElement = document.querySelector(".project-page__queue"); // Adjust the selector for each group
      const groupRect = groupElement?.getBoundingClientRect();
  
      // Check if the task was dragged out of the group's zone
      if (taskRect && groupRect && (taskRect.bottom < groupRect.top || taskRect.top > groupRect.bottom)) {
        // Update the status of the dragged task
        const updatedTask: Task = { ...draggedTask, status: destinationStatus };
  
        // Check if the task was moved to a different group
        if (sourceStatus !== destinationStatus) {
          const updatedTasks: Task[] = tasks.filter(
            (task) => task.taskId !== draggedTask.taskId
          );
          setTask([...updatedTasks, updatedTask]);
        } else {
          // If the task is still within the same group, reorder it
          const updatedTasks: Task[] = tasks.map((task) =>
            task.taskId === draggedTask.taskId ? updatedTask : task
          );
          setTask(updatedTasks);
        }
      }
      
      setDraggedTask(null);
    }
  };
  

  

  const handleTaskStatusToggle = (taskId: number) => {
    const updatedTasks: Task[] = tasks.map((task) => {
      if (task.taskId === taskId) {
        const newStatus = task.status === "DONE" ? "QUEUE" : "DONE";
        return { ...task, status: newStatus };
      }
      return task;
    });
    setTask(updatedTasks);
  };

  const groupStyles = {
    QUEUE: {
      backgroundColor: "lightblue",
    },
    DEVELOPMENT: {
      backgroundColor: "lightgreen",
    },
    DONE: {
      backgroundColor: "lightgray",
    },
  };

  const [LockDrag, LockDragF] = useState(true);

  const maxTaskId = project.tasks.reduce((maxId, task) => {
    return task.taskId > maxId ? task.taskId : maxId;
  }, -1);

  useEffect(() => {
    console.log(tasks);
    localStorage.setItem(
      "ObjectsKey",
      JSON.stringify([
        ...storage.filter((item) => item.projectId !== project.projectId),
        { ...project, tasks: tasks },
      ])
    );
  }, [tasks]);

  const LockElements = (data: boolean) => {
    LockDragF(data);
  };

  return (
    <div className="project-page">
      <p className="project-page__title">{project.title}</p>
      <p className="project-page__description">{project.description}</p>


      <div className="project-page__pillars">
        <ProjectAddTask
          setTasks={(e) => setTask((prev) => [...prev, e])}
          Project_Id_add={project.projectId}
          maxTaskId_prop={maxTaskId}
        />
        {/* Columns for 'QUEUE', 'DEVELOPMENT', and 'DONE' */}
      <div
    className="buffer-zone"
    style={{ height: '20px' }} // Increase the height to create a buffer zone
  > </div>
        <h3>QUEUE:</h3>
        <div className="project-page__pillar project-page__queue">
          <Reorder.Group
            as="ul"
            axis="y"
            values={tasks.filter((item) => item.status === "QUEUE")}
            onReorder={(newTasks) =>
              setTask([
                ...newTasks,
                ...tasks.filter((item) => item.status !== "QUEUE"),
              ])
            }
          >
            <AnimatePresence>
              {tasks
                .filter((item) => item.status === "QUEUE")
                .map((item) => (
                  <Reorder.Item
                    dragListener={LockDrag}
                    dragConstraints={{ top: 0, bottom: 0 }}
                    {...variants}
                    id={`${item.taskId}`}
                    onDragStart={() => handleDragStart(item)}
                    onDragEnd={() => handleDragEnd()}


                    whileDrag={{ scale: 1}}
                    key={item.taskId}
                    value={item}
                  >
                    <div className="project-page-pillar__task">
                      <input
                        type="radio"
                        checked={item.status === "DONE"}
                        onClick={() => handleTaskStatusToggle(item.taskId)}
                      />

                      <p key={item.title}>{item.title}</p>
                      <InfoButtonTodo
                        task={item}
                        stateofopentodo={LockElements}
                      />
                    </div>
                  </Reorder.Item>
                ))}
            </AnimatePresence>
          </Reorder.Group>
        </div>

        <div
    className="buffer-zone"
    style={{ height: '20px' }} // Increase the height to create a buffer zone
  ></div>
        <h3>DEVELOPMENT:</h3>
        <div className="project-page__pillar project-page__development">
          <Reorder.Group
            as="ul"
            axis="y"
            values={tasks.filter((item) => item.status === "DEVELOPMENT")}
            onReorder={(newTasks) =>
              setTask([
                ...newTasks,
                ...tasks.filter((item) => item.status !== "DEVELOPMENT"),
              ])
            }
          >
            <AnimatePresence>
              {tasks
                .filter((item) => item.status === "DEVELOPMENT")
                .map((item) => (
                  <Reorder.Item
                    dragListener={LockDrag}
                    dragConstraints={{ top: 0, bottom: 0 }}
                    {...variants}
                    id={`${item.taskId}`}
                    onDragStart={() => handleDragStart(item)}
                    onDragEnd={() => handleDragEnd()}

                    whileDrag={{ scale: 1}}
                    key={item.taskId}
                    value={item}
                  >
                    <div className="project-page-pillar__task">
                        
                      <input
                        type="radio"
                        checked={item.status === "DONE"}
                        onClick={() => handleTaskStatusToggle(item.taskId)}
                      />

                      <p key={item.title}>{item.title}</p>
                      <InfoButtonTodo
                        task={item}
                        stateofopentodo={LockElements}
                      />
                    </div>
                  </Reorder.Item>
                ))}
            </AnimatePresence>
          </Reorder.Group>
        </div>

        <div
    className="buffer-zone"
    style={{ height: '20px' }} // Increase the height to create a buffer zone
  ></div>
        <h3> DONE:</h3>
        <div className="project-page__pillar project-page__done">
          <Reorder.Group
            as="ul"
            axis="y"
            values={tasks.filter((item) => item.status === "DONE")}
            onReorder={(newTasks) =>
              setTask([
                ...newTasks,
                ...tasks.filter((item) => item.status !== "DONE"),
              ])
            }
          >
            <AnimatePresence>
              {tasks
                .filter((item) => item.status === "DONE")
                .map((item) => (
                  <Reorder.Item
                    dragListener={LockDrag}
                    dragConstraints={{ top: 0, bottom: 0 }}
                    {...variants}
                    id={`${item.taskId}`}
                    onDragStart={() => handleDragStart(item)}
                    onDragEnd={() => handleDragEnd()}

                    whileDrag={{ scale: 1}}
                    key={item.taskId}
                    value={item}
                  >
                    <div className="project-page-pillar__task">
                        
                      <input
                        type="radio"
                        checked={item.status === "DONE"}
                        onClick={() => handleTaskStatusToggle(item.taskId)}
                      />

                      <p key={item.title}>{item.title}</p>
                      <InfoButtonTodo
                        task={item}
                        stateofopentodo={LockElements}
                      />
                    </div>
                  </Reorder.Item>
                ))}
            </AnimatePresence>
          </Reorder.Group>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
