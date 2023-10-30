import { useEffect, useState } from "react";
import {TareaFormulario} from './componentes/TareaFormulario';
import {ListaTareas} from './componentes/ListaTareas';

const LOCAL_STORAGE_KEY = 'todo:tareas';

function App() {
  const [tareas, setTareas] = useState([]);

  function cargarTareas (){
    const guardar = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (guardar) {
      setTareas(JSON.parse(guardar));
    }
  }
  
  function setTareaAndSave (nuevasTareas){
    setTareas(nuevasTareas);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(nuevasTareas));
  }

  useEffect(() => {
    cargarTareas();
  }, [])

  function addTarea (tareaTitle){
    setTareaAndSave([...tareas, {
      id: crypto.randomUUID(),
      title: tareaTitle,
      isCompleted: false
    }]);
  }
  function deleteTareaById(tareaId){
    const nuevasTareas = tareas.filter(tarea => tarea.id !== tareaId);
    setTareaAndSave(nuevasTareas);    
  }

  function toggleTareaCompletedById(tareaId) {
    const nuevasTareas = tareas.map(tarea => {
      if(tarea.id === tareaId) {
        return {
          ...tarea,
          isCompleted: !tarea.isCompleted
        }
      }
      return tarea;
    });
    setTareaAndSave(nuevasTareas);
  }

  return (
    <>
    <TareaFormulario handleAddTarea = {addTarea} />
    <ListaTareas 
    tareas = {tareas}
    onDelete = {deleteTareaById}
    onComplete = {toggleTareaCompletedById}
    />
    </>
  )
}

export default App
