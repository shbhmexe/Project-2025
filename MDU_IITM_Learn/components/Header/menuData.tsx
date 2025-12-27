import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    path: "/",
    newTab: false,
  },
  {
    id: 2,
    title: "Notes",
    path: "/notes",
    newTab: true,
  },
  {
    id: 3,
    title: "Syllabus",
    path: "/Syllabus",
    newTab: true,
  },

  {
    id: 5,
    title: "PYQ's",
    path: "/pyqs",
    newTab: true,
  },
  {
    id: 6,
    title: "Youtube Video's",
    path: "/youtube-explanation/semester",
    newTab: false,
  },
  {
    id: 4,
    title: "CGPA Calculator",
    path: "/cgpa",
    newTab: true,
  },
  {
    "id": 7,
    "title": "Pages",
    "newTab": false,
    "submenu": [
      {
        "id": 8,
        "title": "About Page",
        "path": "/about",
        "newTab": false
      },
      {
        "id": 9,
        "title": "Contact Page",
        "path": "/contact",
        "newTab": false
      },
      {
        "id": 10,
        "title": "Blog",
        "path": "/blog",
        "newTab": true
      }
    ]
  }
];
export default menuData;
