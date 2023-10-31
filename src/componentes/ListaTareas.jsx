import { Tarea } from "./Tarea"
import styles from './listaTareas.module.css'


export function ListaTareas ({tareas, onDelete, onComplete}){
    const cantidadTareas = tareas.length;
    const tareasCompletas = tareas.filter(tarea => tarea.isCompleted).length;

    return (
        <section className = {styles.tasks}>
            <header className = {styles.header}>
                <div>
                    <p>Tareas Creadas</p>
                    <span>{cantidadTareas}</span>
                </div>

                <div>
                    <p className ={styles.textPink}>Tareas Completas</p>
                    <span>{tareasCompletas} de {cantidadTareas}</span>
                </div>
            </header>

            <div className = {styles.list}>
                {tareas.map((tarea) => (
                    <Tarea key={tarea.id} tarea={tarea} onDelete = {onDelete} onComplete = {onComplete} />
                ))}
            </div>
        </section>      
    )
}