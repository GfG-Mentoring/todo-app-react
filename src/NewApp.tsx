import { useEffect, useState } from 'react';

export const App = () => {
  const [todos, setTodos] = useState(null);

  const [isLoading, setLoading] = useState(true);

  const [onlyShowCompleted, setOnlyShowCompleted] = useState(false);

  const [searchValue, setSearchValue] = useState('');

  const getTodos = () => {
    const todos = localStorage.getItem('todos');

    if (!todos) {
      fetch('https://dummyjson.com/todos')
        .then((res) => res.json())
        .then((data) => {
          setTodos(data);
          localStorage.setItem('todos', JSON.stringify(data));
          setLoading(false);
        });
    } else {
      setTodos(JSON.parse(todos));
      setLoading(false);
    }
  };

  useEffect(() => {
    // inside use effect
    getTodos();
  }, []);

  const todoList =
    todos?.todos.filter(
      (todo) =>
        todo.todo.toLowerCase().includes(searchValue.toLowerCase()) &&
        todo.completed === onlyShowCompleted
    ) ?? [];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      Todo App
      <AddTodo refreshTodo={getTodos} />
      <input
        type="search"
        placeholder="search for todo..."
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
      />
      <div>
        <input
          type="checkbox"
          checked={onlyShowCompleted}
          onChange={(e) => {
            setOnlyShowCompleted(e.target.checked);
          }}
        />{' '}
        <span>
          {onlyShowCompleted
            ? 'Showing completed todos'
            : 'Showing incomplete todos'}
        </span>
      </div>
      {isLoading ? (
        <span>loading todos for you....</span>
      ) : (
        todoList.map((todo) => <Card key={todo.id} {...todo} />)
      )}
    </div>
  );
};

const Card = (props: {
  completed: boolean;
  id: number;
  todo: string;
  userId: number;
}) => {
  useEffect(() => {
    console.log('this component has mounted.');

    return () => {
      console.log('this component is being unmounted');
    };
  }, []);

  if (!props.todo) {
    return null;
  }

  return (
    <div
      style={{
        padding: '0.5rem',
        border: '1px solid white',
        display: 'flex',
        gap: '0.5rem',
        alignItems: 'center',
      }}
    >
      <input type="checkbox" checked={props.completed} />
      <span
        style={{
          fontSize: '0.5rem',
          color: 'white',
          textDecoration: props.completed ? 'line-through' : 'auto',
        }}
      >
        <a
          href={`/todo/${props.id}`}
          style={{
            color: 'whitesmoke',
          }}
        >
          {props.todo}
        </a>
      </span>
    </div>
  );
};

const AddTodo = (props: any) => {
  const [todoValue, setTodoValue] = useState('');

  const addTodo = () => {
    // saving logic
    const todos = JSON.parse(localStorage.getItem('todos'));

    todos.todos.push({
      id: Math.random() * 10,
      todo: todoValue,
      completed: false,
      userId: 152,
    });

    localStorage.setItem('todos', JSON.stringify(todos));

    // perform cleanup
    setTodoValue('');
    props.refreshTodo();
  };

  return (
    <div style={{ display: 'flex', gap: '0.2rem' }}>
      <input
        value={todoValue}
        placeholder="add a todo"
        onChange={(e) => setTodoValue(e.target.value)}
      />
      <button onClick={addTodo}>Save</button>
    </div>
  );
};
