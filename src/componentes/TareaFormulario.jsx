import styles from './tareaFormulario.module.css'
import logo from '..//assets/logo.png';
import {MdAddTask} from 'react-icons/md';
import { useState } from 'react';

export function TareaFormulario ({handleAddTarea}){
    const [title, setTitle] = useState ('');

    function handleSubmit (event) {
        event.preventDefault();

        handleAddTarea(title);
        setTitle('');
    }

    function onChangeTitle (event) {
        setTitle(event.target.value);
    }

    return (
        
        <header className = {styles.header}>
            <span className={styles.titulo}>To Do App</span>
            <img src = {logo} />
            
            

        <form onSubmit={handleSubmit} className = {styles.newTaskForm} >
            <input placeholder = 'Añadir una nueva tarea' type = 'text' onChange={onChangeTitle} value={title} required />
            <button> Añadir <MdAddTask size ={20} /></button>
            </form>    
        </header>
        
    )
}

