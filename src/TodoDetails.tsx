import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const TodoDetails = () => {
  const { todoId } = useParams();

  const [todoData, setTodoData] = useState(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/todos/${todoId}`)
      .then((res) => res.json())
      .then(setTodoData);
  }, []);

  console.log(todoId);

  return <div>{JSON.stringify(todoData)}</div>;
};

export { TodoDetails };
