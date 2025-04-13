export const Routes = {
  Home: '/',
  SignIn: '/sign-in',
  SignUp: '/sign-up',
  Profile: '/profile',
  Blog: '/blog',
  OurBlog: '/our-blog',
  BlogDetail: (blogId: number) => `/blog/${blogId}`,
};
