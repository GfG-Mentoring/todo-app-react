import { useContext, useEffect, useMemo, useState } from 'react';
import { TodoContext } from './store/todoContext';
import { postTodo } from './apis/todo';
import { toast } from 'react-toastify';

const getUrlWithPagination = (searchParams?: Record<string, string>) => {
  const url = new URL('https://dummyjson.com/todos');

  if (searchParams) {
    Object.entries(searchParams).forEach((entry) =>
      url.searchParams.append(entry[0], entry[1])
    );
  }

  return url.toString();
};

export const App = () => {
  const { todos, addBulkTodos } = useContext(TodoContext);

  const [isLoading, setLoading] = useState(true);

  const [onlyShowCompleted, setOnlyShowCompleted] = useState(false);

  const [searchValue, setSearchValue] = useState('');

  const [paginationData, setPaginationData] = useState<{
    limit: number;
    skip: number;
  }>({
    limit: 20,
    skip: 0,
  });

  const getTodos = () => {
    fetch(getUrlWithPagination(paginationData))
      .then((res) => res.json())
      .then((data) => {
        addBulkTodos(data.todos);
      });

    setLoading(false);
  };

  useEffect(() => {
    // inside use effect
    getTodos();
  }, [paginationData]);

  const todoList =
    todos.filter(
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
      <AddTodo />
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
        <button
          onClick={() => {
            setPaginationData((prev) => ({
              ...prev,
              skip: prev.skip - prev.limit,
            }));
          }}
        >
          prev
        </button>
        <button
          onClick={() => {
            console.log('clicked');
            setPaginationData((prev) => ({
              ...prev,
              skip: prev.skip + prev.limit,
            }));
          }}
        >
          next
        </button>
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
  const { addTodo: addTodoToStore } = useContext(TodoContext);

  const [todoValue, setTodoValue] = useState<string>('');

  const addTodo = async () => {
    const addedTodo = await postTodo({
      todo: todoValue,
      completed: false,
      // userId: 152,
    });
    if (!addedTodo) {
      toast.error('Error occurred. Cannot save todo.');
      return;
    }

    console.log(addedTodo, 'adadasd');
    addTodoToStore(addedTodo);

    // clean the input
    setTodoValue('');
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
