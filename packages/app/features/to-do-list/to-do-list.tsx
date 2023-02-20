import { Pressable } from "app/design/pressable";
import { Text } from "app/design/typography";
import { View } from "app/design/view";
import { addTodo, deleteAllTodos, getTodos, TodoResponse, updateTodos } from "app/pda/pda";
import { useEffect, useState } from "react";
import { TextInput } from "react-native";

export function TodoList() {

    const [todos, setTodos] = useState<TodoResponse[]>([]);
    const [isLoadingTodos, setIsLoadingTodos] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [newTodo, setNewTodo] = useState('');

    useEffect(() => {
    const fetchTodos = async () => {
      setIsLoadingTodos(true);
      setError(null);
      try {
        const todos = await getTodos();
        setTodos(todos.data);
      } catch (error) {
        setError(error);
      }
      finally {
        setIsLoadingTodos(false);
      }
    };
    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    setError(null);
    try {

      const todo = await addTodo(false, newTodo);
      setTodos([...todos, todo.data]);
    } catch (error) {
      setError(error);
    }
    finally {
      setNewTodo('');
    }
  };

  const handleUpdateTodo = async (recordId: string) => {
    setError(null);
    try {
      const updatedTodos = todos.map(todo => {
        if (todo.recordId === recordId) {
          return { ...todo, data: { ...todo.data, done: !todo.data.done } };
        }
        return todo;
      });
      await updateTodos(updatedTodos);
      setTodos(updatedTodos);
    } catch (error) {
      setError(error);
    }
  };

  const handleDeleteAllTodos = async () => {
    setError(null);
    try {
      await deleteAllTodos();
      setTodos([]);
    } catch (error) {
      setError(error);
    }
  }
    
    return (
    <View className="flex-1 items-center justify-center p-3">
      <Text className='mt-3 mb-3 font-bold'>To-do list</Text>
      {isLoadingTodos ? (
        <Text className='mt-3 mb-3'>Loading...</Text>
      ) : error ? (
        <Text>{`Error: ${error}`}</Text>
      ) : (
        <View className='mt-3 mb-3'>
            {todos.map(todo => (
              <View key={todo.recordId} className="flex-row justify-between items-center py-2">
                <Text className='flex-grow text-center mx-2'>{todo.data.description}</Text>
                <Pressable className='bg-blue-700 rounded-lg text-sm px-4 py-2 items-center' onPress={() => handleUpdateTodo(todo.recordId)}>
                  <Text className='text-white'>{todo.data.done ? "Done" : "Not Done"}</Text>
                </Pressable>
            </View>
          ))}
        </View>
      )}
      <View className='mt-3 mb-3'>
          <TextInput
          value={newTodo}
          onChangeText={text => setNewTodo(text)}
          placeholder="Enter new to-do"
          onSubmitEditing={handleAddTodo}
          blurOnSubmit={false}
          />
      </View>
      <Pressable className='bg-blue-700 rounded-lg text-sm px-4 py-2 mt-3 mb-3 items-center' onPress={handleAddTodo}>
          <Text className='text-white'>Add Todo</Text>
      </Pressable>
      <Pressable className='bg-blue-700 rounded-lg text-sm px-4 py-2 mt-3 mb-6 items-center' onPress={handleDeleteAllTodos}>
          <Text className='text-white'>Delete All Todos</Text>
      </Pressable>
        </View>
    )
}