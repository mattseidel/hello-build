import useApiData from "./useMemorizedData";

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const MyComponent = () => {
  const { data, isLoading } = useApiData<Todo>("https://jsonplaceholder.typicode.com/todos");

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return <pre>{JSON.stringify(data, null, 2)}</pre>;
  }
};

export default MyComponent;
