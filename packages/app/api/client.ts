import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const PDAClient = axios.create();

PDAClient.interceptors.request.use(async config => {
  try {
    const token = await AsyncStorage.getItem('access-token');
    const issuer = await AsyncStorage.getItem('issuer');

    //process.env.NAMESPACE - create your own .env file with a value for NAMESPACE
    const namespace = config.params && config.params.namespace ? config.params.namespace : process.env.NAMESPACE;
      
    if (config.method === 'put') {
      config.url = `https://${issuer}/api/v2.6/data`;
    } else {
      config.url = `https://${issuer}/api/v2.6/data/${namespace}/${config.url}`;
    }

    config.headers.Accept = 'application/json';
    config.headers['Content-Type'] = 'application/json';
    config.headers['x-auth-token'] = token;
    delete config.params.namespace;

    return config;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
});

PDAClient.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);


export default PDAClient;
