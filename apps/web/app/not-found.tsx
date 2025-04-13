import { Routes } from '@/constant/routes';
import { redirect } from 'next/navigation';

export default function NotFound() {
  redirect(Routes.Home);
}
