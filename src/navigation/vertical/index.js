import { Mail, Home, Image, List } from 'react-feather'

export default [
  {
    id: 'home',
    title: 'Home',
    icon: <Home size={20} />,
    navLink: '/home'
  },
  {
    id: 'secondPage',
    title: 'Second Page',
    icon: <Mail size={20} />,
    navLink: '/second-page'
  },
  {
    id: 'gallery',
    title: 'Gallery',
    icon: <Image size={20} />,
    children: [
      {
        id: 'galleryList',
        title: 'List',
        icon: <List size={20} />,
        navLink: '/gallery/list'
      }
    ]
  }
]
