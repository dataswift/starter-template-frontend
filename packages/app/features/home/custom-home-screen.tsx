import { H1, Text } from "app/design/typography";
import { View } from "app/design/view";
import { ScrollView } from "moti";
import { Fragment, useState } from "react";
import { TouchableOpacity, Modal, Button, Platform } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { styled } from "nativewind";
import { Image } from "app/design/image";
import { Pressable } from "app/design/pressable";

import { Disclosure, Menu, Transition } from '@headlessui/react'




const StyledModal = styled(Modal);
const StyledButton = styled(Button)

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}

const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
  { name: 'Reports', href: '#', current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function MyButton() {
  if (Platform.OS === 'web') {
    return (
      <button>
        <Text>Hello World</Text>
      </button>
    );
  } else {
    return (
      <TouchableOpacity>
        <Text>Hello World</Text>
      </TouchableOpacity>
    );
  }
}

function WebMenu() {
  if (Platform.OS === 'web') {
    
    return (
      <Menu as="div" className="relative ml-3">
        <div>
          <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
            <span className="sr-only">Open user menu</span>
            <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {userNavigation.map((item) => (
              <Menu.Item key={item.name}>
                {({ active }) => (
                  <a
                    href={item.href}
                    className={classNames(
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700'
                    )}
                  >
                    {item.name}
                  </a>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    )
  } else {
    return (<></>)
  }
}

export function CustomHomeScreen() {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isProfileIconFocused, setIsProfileIconFocused] = useState(false);

    const toggleModal = () => {    
      setIsModalVisible(!isModalVisible);
    };
  
  const handleProfileIconBlur = () => {
  if (isModalVisible) {
    setIsModalVisible(false);
  }
  setIsProfileIconFocused(false);
};

    return (
      <View className="min-h-full">
        {/* Navbar starts here */}
        <MyButton/>
            <View className="bg-gray-800">
                <View className="max-w-8xl px-4 sm:px-6 lg:px-8">
                    <View className="flex flex-row h-16 items-center justify-between">
                        <View className="flex flex-row items-center">
                           <View className="flex-shrink-0">
                                <Image
                                    className="h-8 w-8"
                                    source={{ uri: "https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" }}
                                    accessibilityLabel="Your Company"
                                />
                            </View>
                            <View className="hidden md:block">
                                <View className="ml-10 flex flex-row items-baseline space-x-4">
                                    {navigation.map((item) => (
                                        <Text
                                            key={item.name}
                                            href={item.href}
                                            className={classNames(
                                                item.current
                                                    ? 'bg-gray-900 text-white'
                                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'px-3 py-2 rounded-md text-sm font-medium'
                                                )}
                                            // aria-current={item.current ? 'page' : undefined}
                                        >
                                            {item.name}
                                        </Text>
                                ))}
                                </View>
                            </View>
                        </View>
                        {/* Bell icon and profile icon */}
                        <View className="hidden md:block">
                            <View className="ml-4 flex flex-row items-center md:ml-6">
                                <Pressable accessibilityLabel="View notifications" className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <View accessibilityElementsHidden={true} importantForAccessibility="no-hide-descendants">
                                        {/* <BellIcon className="h-6 w-6" /> */}
                                    </View>
                                </Pressable>
                                {/* Profile dropdown */}
                  {/* <View className="relative ml-3">
                    <Pressable accessibilityLabel="Open user menu"
                      className={classNames('flex max-w-xs items-center rounded-full bg-gray-800 text-sm', (!isProfileIconFocused) ? 'focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800' : '')}  
                      onBlur={handleProfileIconBlur}
                      onPress={() => {
                        toggleModal();
                        setIsProfileIconFocused(prevState => !prevState);
                      }}
                    >
                                          <Image
                                            source={{ uri: user.imageUrl }}
                        className="h-8 w-8 rounded-full"
                                    />
                      </Pressable>                                   
                  </View> */}
                  <WebMenu/>
                </View>
                 {isModalVisible &&
                                        <View className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                {userNavigation.map((item) => (
                                                    <Pressable key={item.name} onPress={() => console.log(item.name)}>
                                                    <View>
                                                      <Text className={classNames(
                                                                          true ? 'bg-gray-100' : '',
                                                                          'block px-4 py-2 text-sm text-gray-700'
                                                            )}>
                                                                {item.name}
                                                      </Text>
                                                    </View>
                                                  </Pressable>
                                                ))}
                                        </View>
                                    }
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

// border border-solid border-red-500
