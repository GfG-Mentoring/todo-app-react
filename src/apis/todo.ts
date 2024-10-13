const BASE_URL = 'https://dummyjson.com';

export const postTodo = async (data) => {
  try {
    /* updating completed status of todo with id 1 */
    const response = await fetch(BASE_URL + '/todos/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const jsonData = await response.json();
    if (response.status !== 201) {
      throw new Error(jsonData.message);
    }
    return jsonData;
  } catch (err) {
    console.error('err');
    return undefined;
  }
};

// TODO: create a update todo method
export const updateTodo = async (data) => {};
