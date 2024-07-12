import BookOnlineIcon from "@mui/icons-material/BookOnline";
import CategoryIcon from "@mui/icons-material/Category";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import GroupIcon from "@mui/icons-material/Group";
const routes = [
  {
    path: "/",
    content: "Category",
    icon: <CategoryIcon />,
  },
  {
    path: "/products",
    content: "Products",
    icon: <ProductionQuantityLimitsIcon />,
  },
  {
    path: "/workers",
    content: "Workers",
    icon: <GroupIcon />,
  },
];

export default routes;
