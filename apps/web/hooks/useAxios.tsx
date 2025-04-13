import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect, useMemo } from 'react';

export const useAxios = () => {
  const { data: session, status } = useSession();

  const instance = useMemo(() => {
    return axios.create({
      baseURL: `${process.env!.NEXT_PUBLIC_API_URL}`,
    });
  }, []);

  useEffect(() => {
    if (status === 'authenticated') {
      instance.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${session?.accessToken}`;
        return config;
      });

      instance.interceptors.response.use(
        (response) => response,
        (error) => {
          return Promise.reject(error);
        },
      );
    }
  }, [status, session]);

  return { instance };
};
