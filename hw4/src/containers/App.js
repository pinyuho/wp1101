import React, { useState } from 'react';
import './App.css';
import Header from '../components/Header';
import Submit from '../components/Submit';
import Todo from '../components/Todo';
import Footer from '../components/Footer';
import FilterButton from '../components/FilterButton';


const FILTER_MAP = {
    'All': () => true,
    'Active': task => !task.completed,
    'Completed': task => task.completed
}
const FILTER_NAMES = Object.keys(FILTER_MAP);



function App () {

    const [tasks, setTasks] = useState([]);

    const [filter, setFilter] = useState('All');

    const taskList = tasks.map(task => (
        <Todo id={task.id} 
              name={task.name} 
              completed={task.completed} 
              key={task.id}
              toggleTaskCompleted={toggleTaskCompleted}
              removeTask={removeTask}
        />)
    );

    const filterList = FILTER_NAMES.map(name => 
        <FilterButton 
            key={name} 
            name={name}
            isPressed={name === filter}
            setFilter={setFilter}
        />
    );


    const filteredTasks = tasks.filter(FILTER_MAP[filter])
    .map(task => (
        <Todo id={task.id} 
              name={task.name} 
              completed={task.completed} 
              key={task.id}
              toggleTaskCompleted={toggleTaskCompleted}
              removeTask={removeTask}
        />)
    );

    const activeCnt = tasks.filter(task => !task.completed).length;
    const completeCnt = tasks.filter(task => task.completed).length;

    function toggleTaskCompleted(id) {
        const updatedTasks = tasks.map( task => {
            if (task.id === id) {
                return {...task, completed: !task.completed}
            }
            return task;
        });

        setTasks(updatedTasks);
    }

    function addTask(name) {
        const newTask = {
            id: Date.now(),
            name: name,
            completed: false
        };
        setTasks([...tasks, newTask]);
    }

    function removeTask(id) {
        const remainTasks = tasks.filter(task => task.id !== id);

        setTasks(remainTasks);
    }

    function clearCompletedTasks () {
        const remainTasks = tasks.filter(task => !task.completed);

        setTasks(remainTasks);
    }

    
    return (
        <div id="root" className="todo-app__root">
            <Header text="todos" />

            <section className="todo-app__main">
                <Submit className="todo-app__input" 
                        placeholder="What needs to be done?" 
                        addTask={addTask}/>
                <ul className="todo-app__list" id="todo-list">
                    {filteredTasks} 
                </ul>
            </section>

            <Footer 
                text={`${activeCnt} left`}
                filterList={filterList}
                isDisplay={tasks.length !== 0}
                showClearButton={completeCnt > 0} 
                clearCompleted={clearCompletedTasks}
            />
            
        </div>
    );
}

export default App;
