import { RouteInfo } from "./sidebar.metadata";

export const ROUTES: RouteInfo[] = [
  {
    path: "",
    title: "Overview",
    icon: "mdi mdi-dots-horizontal",
    class: "nav-small-cap",
    extralink: true,
    submenu: [],
  },
  {
    path: "/admin/dashboard",
    title: "Overview",
    icon: "mdi mdi-gauge",
    class: "",
    extralink: false,
    submenu: [],
  },
  {
    path: "",
    title: "Components",
    icon: "mdi mdi-dots-horizontal",
    class: "nav-small-cap",
    extralink: true,
    submenu: [],
  },
  {
    path: "/admin/component/setting",
    title: "Setting",
    icon: "mdi mdi-settings",
    class: "",
    extralink: false,
    submenu: [],
  },
  {
    path: "/admin/component/user",
    title: "User",
    icon: "mdi mdi-account",
    class: "",
    extralink: false,
    submenu: [],
  },
  {
    path: "/admin/component/device",
    title: "Device",
    icon: "mdi mdi-deskphone",
    class: "",
    extralink: false,
    submenu: [],
  },
  // {
  //   path: "/component/carousel",
  //   title: "Carousel",
  //   icon: "mdi mdi-view-carousel",
  //   class: "",
  //   extralink: false,
  //   submenu: [],
  // },
  // {
  //   path: "/component/dropdown",
  //   title: "Dropdown",
  //   icon: "mdi mdi-arrange-bring-to-front",
  //   class: "",
  //   extralink: false,
  //   submenu: [],
  // },
  // {
  //   path: "/component/modal",
  //   title: "Modal",
  //   icon: "mdi mdi-tablet",
  //   class: "",
  //   extralink: false,
  //   submenu: [],
  // },
  // {
  //   path: "/component/pagination",
  //   title: "Pagination",
  //   icon: "mdi mdi-backburger",
  //   class: "",
  //   extralink: false,
  //   submenu: [],
  // },
  // {
  //   path: "/component/poptool",
  //   title: "Popover & Tooltip",
  //   icon: "mdi mdi-image-filter-vintage",
  //   class: "",
  //   extralink: false,
  //   submenu: [],
  // },
  // {
  //   path: "/component/progressbar",
  //   title: "Progressbar",
  //   icon: "mdi mdi-poll",
  //   class: "",
  //   extralink: false,
  //   submenu: [],
  // },
  // {
  //   path: "/component/rating",
  //   title: "Ratings",
  //   icon: "mdi mdi-bandcamp",
  //   class: "",
  //   extralink: false,
  //   submenu: [],
  // },
  // {
  //   path: "/component/tabs",
  //   title: "Tabs",
  //   icon: "mdi mdi-sort-variant",
  //   class: "",
  //   extralink: false,
  //   submenu: [],
  // },
  // {
  //   path: "/component/timepicker",
  //   title: "Timepicker",
  //   icon: "mdi mdi-calendar-clock",
  //   class: "",
  //   extralink: false,
  //   submenu: [],
  // },
  // {
  //   path: "/component/buttons",
  //   title: "Button",
  //   icon: "mdi mdi-toggle-switch",
  //   class: "",
  //   extralink: false,
  //   submenu: [],
  // },
  // {
  //   path: "/component/toast",
  //   title: "Toast",
  //   icon: "mdi mdi-alert",
  //   class: "",
  //   extralink: false,
  //   submenu: [],
  // },
];
