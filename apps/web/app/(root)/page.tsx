import { Routes } from '@/constant/routes';
import { redirect } from 'next/navigation';

const HomePage = () => {
  redirect(Routes.Blog);
};

export default HomePage;
