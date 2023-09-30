import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Project, Task } from '../../../types/types';
import './Project.scss'
import { Reorder, AnimatePresence } from 'framer-motion';

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
    }
}

const ProjectPage = () => {
    const projects: Project[] = JSON.parse(localStorage.getItem('ObjectsKey') as string);
    let storage: Project[] = JSON.parse(localStorage.getItem('ObjectsKey') as string);
    console.log(storage)
    const { id }  = useParams();
    const project: Project = projects.filter(item => item.projectId === parseInt(id as string))[0];
    const [tasks, setTask] = useState<Task[]>(project.tasks);  

    const removeF = (e: React.MouseEvent<HTMLDivElement>) => {
        const id = parseInt(e.currentTarget.id);
        setTask(prev => prev.filter(item => item.taskId !== id));
    }

    useEffect(() => {
        localStorage.setItem('ObjectsKey', JSON.stringify([...storage.filter(item => item.projectId !== project.projectId), {...project, tasks: tasks}]))
    }, [tasks])

  return (
    <div className='project-page'>
        <p className='project-page__title'>{project.title}</p>
        <p className='project-page__description'>{project.description}</p>
        <div className='project-page__pillars'>
            <div className='project-page__pillar project-page__queue'>
                <Reorder.Group as="ul" axis='y' values={tasks} onReorder={setTask}>
                    <AnimatePresence>
                        {
                            tasks.map(item => (
                                <Reorder.Item {...variants} id={`${item.taskId}`} onDoubleClick={(e: React.MouseEvent<HTMLDivElement>) => removeF(e)} whileDrag={{scale: 1.02}} key={item.taskId} value={item}>
                                    <div className='prokect-page-pillar__task'>
                                        <p key={item.taskId}>{item.taskId}</p>
                                    </div>
                                </Reorder.Item>
                            ))
                        }
                    </AnimatePresence>
                </Reorder.Group>
            </div>
            <div className='project-page__pillar project-page__development'>
                <div className='prokect-page-pillar__task'>

                </div>
            </div>
            <div className='project-page__pillar project-page__done'>
                <div className='prokect-page-pillar__task'>

                </div>
            </div>
        </div>
    </div>
  )
}

export default ProjectPage;