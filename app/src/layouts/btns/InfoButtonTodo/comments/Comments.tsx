import { FC, useEffect, useState } from "react"
import { Project, Task } from "../../../../types/types";
import './Comments.scss'


type Id = {task:Task}; 

const Comments: FC<Id> = ({ task }) => {
  const replies = (e: React.MouseEvent<HTMLLIElement>) => {
    let targetEl = e.target as HTMLParagraphElement;
    const targetId = targetEl.dataset.id;
    let parentEl = targetEl.parentNode as HTMLParagraphElement;
    let parentId = parentEl.dataset.id;
    console.log(targetEl.dataset.id);
    // console.log(e.currentTarget);
  }
  
  const recurse = (arr: any[]): any => {
    return arr.map((item, index) => (
        <li onClick={(e) => replies(e)} data-id={item.commentId} className="replies-comment" style={{marginLeft: `10px`, borderLeft: '1px solid black'}}>
          {item.text ? item.text : 'Text'}
          {item.replies.length ? recurse(item.replies) : null}
        </li>
    ))
  }

  return (
    <div className="popup-content__comments">
      <ul className="comments-container">
        {
          task.comments.map(item => (
            <li onClick={(e) => replies(e)} data-id={item.commentId} className="comment" key={item.commentId}>
              {item.text}
              {recurse(item.replies)}
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default Comments;