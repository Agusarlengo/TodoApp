import styles from './tarea.module.css'
import {BsFillCheckCircleFill} from 'react-icons/bs';
import {VscTrash} from 'react-icons/vsc';

export function Tarea({tarea, onDelete, onComplete}){
    return (
        <div className = {styles.task}>
            <button className = {styles.checkContainer} onClick = {() => onComplete(tarea.id)}>
                {tarea.isCompleted ? <BsFillCheckCircleFill /> : <div />}
            </button>

            <p className = {tarea.isCompleted ? styles.textCompleted : ""}>
                {tarea.title}
            </p>

            <button className = {styles.deleteButton} onClick={() => onDelete(tarea.id)}>
                <VscTrash size ={20}/>
            </button>
        </div>
    )
}