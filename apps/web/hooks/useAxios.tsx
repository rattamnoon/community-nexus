import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect, useMemo } from 'react';

export const useAxios = () => {
  const { data: session, status } = useSession();

  const instance = useMemo(() => {
    return axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
    });
  }, []);

  useEffect(() => {
    const interceptorId = instance.interceptors.request.use((config) => {
      if (status === 'authenticated' && session?.accessToken) {
        config.headers.Authorization = `Bearer ${session.accessToken}`;
      }
      return config;
    });

    const responseInterceptorId = instance.interceptors.response.use(
      (response) => response,
      (error) => {
        return Promise.reject(error);
      },
    );

    return () => {
      instance.interceptors.request.eject(interceptorId);
      instance.interceptors.response.eject(responseInterceptorId);
    };
  }, [instance, status, session]);

  return { instance };
};
