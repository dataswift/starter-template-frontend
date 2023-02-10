import { A, H1, P, Text, TextLink } from 'app/design/typography'
import { Row } from 'app/design/layout'
import { View } from 'app/design/view'

import { MotiLink } from 'solito/moti'
import { Pressable, TextInput } from 'react-native';
import { styled } from 'nativewind';
import { useDSAuth } from 'app/provider/auth/ds-auth-provider';
import { useEffect, useState } from 'react';
import { addTodo, deleteAllTodos, getTodos, TodoResponse, updateTodos } from 'app/pda/pda';

const StyledPressable = styled(Pressable);

export function HomeScreen() {

  const { isAuthenticated, logout } = useDSAuth();

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
      <H1>Welcome to Solito.</H1>
      <View className="max-w-xl">
        <P className="text-center">
          Here is a basic starter to show you how you can navigate from one
          screen to another. This screen uses the same code on Next.js and React
          Native.
        </P>
        <P className="text-center">
          Solito is made by{' '}
          <A
            href="https://twitter.com/fernandotherojo"
            hrefAttrs={{
              target: '_blank',
              rel: 'noreferrer',
            }}
          >
            Fernando Rojo
          </A>
          .
        </P>
        <P className="text-center">
          NativeWind is made by{' '}
          <A
            href="https://twitter.com/mark__lawlor"
            hrefAttrs={{
              target: '_blank',
              rel: 'noreferrer',
            }}
          >
            Mark Lawlor
          </A>
          .
        </P>
      </View>
      <View className="h-[32px]" />
      <Row className="space-x-8">
        <TextLink href="/user/fernando">Regular Link</TextLink>
        <MotiLink
          href="/user/fernando"
          animate={({ hovered, pressed }) => {
            'worklet'

            return {
              scale: pressed ? 0.95 : hovered ? 1.1 : 1,
              rotateZ: pressed ? '0deg' : hovered ? '-3deg' : '0deg',
            }
          }}
          transition={{
            type: 'timing',
            duration: 150,
          }}
        >
          <Text selectable={false} className="text-base font-bold">
            Moti Link
          </Text>
        </MotiLink>
      </Row>
      <Text className="mb-3 mt-6">{"Authenticated: " + isAuthenticated.toString()}</Text>
      <StyledPressable className='bg-blue-700 rounded-lg text-sm px-5 py-2.5 mt-3 mb-3' onPress={logout}>
        <Text className='text-white'>Sign out</Text>
      </StyledPressable>
      <View>
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
                <StyledPressable className='bg-blue-700 rounded-lg text-sm px-4 py-2 items-center' onPress={() => handleUpdateTodo(todo.recordId)}>
                  <Text className='text-white'>{todo.data.done ? "Done" : "Not Done"}</Text>
                </StyledPressable>
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
      <StyledPressable className='bg-blue-700 rounded-lg text-sm px-4 py-2 mt-3 mb-3 items-center' onPress={handleAddTodo}>
          <Text className='text-white'>Add Todo</Text>
      </StyledPressable>
      <StyledPressable className='bg-blue-700 rounded-lg text-sm px-4 py-2 mt-3 mb-6 items-center' onPress={handleDeleteAllTodos}>
          <Text className='text-white'>Delete All Todos</Text>
      </StyledPressable>
      </View>
    </View>
  )
}