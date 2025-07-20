import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AnalyticsRoundedIcon from "@mui/icons-material/AnalyticsRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import GroupsIcon from "@mui/icons-material/Groups";
import PaymentIcon from "@mui/icons-material/PaymentSharp";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import DatasetIcon from "@mui/icons-material/Dataset";
import InventoryIcon from "@mui/icons-material/Inventory";

const mainListItems = [
  { text: "Home", icon: <HomeRoundedIcon /> },
  { text: "Analytics", icon: <AnalyticsRoundedIcon /> },
  { text: "Projects", icon: <AssignmentRoundedIcon /> },
  { text: "Accounting", icon: <PeopleRoundedIcon /> },
  { text: "Buying", icon: <ShoppingBagIcon /> },
  { text: "Selling", icon: <AttachMoneyIcon /> },
  { text: "Stock", icon: <InventoryIcon /> },
  { text: "Assets", icon: <DatasetIcon /> },
  { text: "HR", icon: <GroupsIcon /> },
  { text: "Payroll", icon: <PaymentIcon /> },
  { text: "CRM", icon: <AutoAwesomeMotionIcon /> },
  { text: "Support", icon: <PsychologyAltIcon /> },
];

const secondaryListItems = [
  { text: "Settings", icon: <SettingsRoundedIcon /> },
  { text: "About", icon: <InfoRoundedIcon /> },
  { text: "Feedback", icon: <HelpRoundedIcon /> },
];

export default function SideMenuContent() {
  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <ListItemButton selected={index === 0}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
