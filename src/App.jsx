import { useEffect, useState } from "react";
import {TareaFormulario} from './componentes/TareaFormulario';
import {ListaTareas} from './componentes/ListaTareas';

//constante para acceder a las tareas almacenadas localmente
const LOCAL_STORAGE_KEY = 'todo:tareas';

function App() {
  // utilizamos useState para crear un array vacío con el valor tarea el cual actualiza a traves de la función set, guardando el nuevo valor en el array antes vacío.
  const [tareas, setTareas] = useState([]);

  //se recuperan los datos desde el almacenamiento local y se convierte en objeto mediante método JSON.parse
  function cargarTareas (){
    const guardar = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (guardar) {
      setTareas(JSON.parse(guardar));
    }
  }
  //funcion para guardar tareas nuevas en el almacenamiento local.
  function setTareaAndSave (nuevasTareas){
    setTareas(nuevasTareas);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(nuevasTareas));
  }

  //useEffect mostrara las tareas cuando el componente se monte por primera vez. El array vacío pasado como segundo argumento indica que el efecto solo se ejecutará una vez.
  useEffect(() => {
    cargarTareas();
  }, [])

  //función para añadir nuevas tareas a la lista de tareas existentes- con el método de propagación se copian los datos del array tareas a un array nuevo.se crea objeto que cuenta con las propiedades ida, title, isCompleted.
  function addTarea (tareaTitle){
    setTareaAndSave([...tareas, { 
      id: crypto.randomUUID(), 
      title: tareaTitle,      
      isCompleted: false
    }]);
  }
  function deleteTareaById(tareaId){ //se crea constante con el metodo filter que crea nuevo array con todas las tareas que no coincidan con tareaId
    const nuevasTareas = tareas.filter(tarea => tarea.id !== tareaId);
    setTareaAndSave(nuevasTareas);  //se llama a la función con el nuevo array que contiene las tareas restantes. se actualiza el estado de las tareas en la aplicación y se guardan en el almacenamiento local.  
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
