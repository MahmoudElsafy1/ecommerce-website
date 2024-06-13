import {
  faCartShopping,
  faPlus,
  faTruckFast,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
export const links = [
  {
    path: "users",
    name: "Users",
    icon: faUsers,
    role: "1995",
  },
  {
    path: "user/add",
    name: "Add User",
    icon: faPlus,
    role: "1995",
  },
  {
    path: "categories",
    name: "Categories",
    icon: faCartShopping,
    role: ["1999", "1995"],
  },
  {
    path: "category/add",
    name: "Add Category",
    icon: faPlus,
    role: ["1999", "1995"],
  },
  {
    path: "products",
    name: "Products",
    icon: faTruckFast,
    role: ["1999", "1995"],
  },
  {
    path: "product/add",
    name: "Add Product",
    icon: faPlus,
    role: ["1999", "1995"],
  },
  {
    path: "writer",
    name: "Writer",
    icon: faPlus,
    role: ["1995", "1996"],
  },
];
