import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { Project } from '../../../types/types';
import './Project.scss'

const ProjectPage = () => {
    const projects: Project[] = JSON.parse(localStorage.getItem('ObjectsKey') as string);
    console.log(projects)
    const { id }  = useParams();
    const project: Project = projects.filter(item => item.projectId === parseInt(id as string))[0];

  return (
    <div className='project-page'>
        <p className='project-page__title'>{project.title}</p>
        <p className='project-page__description'>{project.description}</p>
        <ul>
            {
                project.tasks.map(item => (
                    <li>{item.title}</li>
                ))
            }
        </ul>
    </div>
  )
}

export default ProjectPage;