import { checkboxClasses } from "@mui/material/Checkbox";
import { iconButtonClasses } from "@mui/material/IconButton";
import { listClasses } from "@mui/material/List";
import { listItemIconClasses } from "@mui/material/ListItemIcon";
import { menuItemClasses } from "@mui/material/MenuItem";
import { paperClasses } from "@mui/material/Paper";
import { alpha, Theme } from "@mui/material/styles";
import type { DataGridProComponents } from "@mui/x-data-grid-pro/themeAugmentation";
// import { gridClasses } from '@mui/x-data-grid';
import { tablePaginationClasses } from "@mui/material/TablePagination";
import { gray } from "../themePrimitives";

const gridClasses = {
  columnHeader: "MuiDataGrid-columnHeader",
  footerContainer: "MuiDataGrid-footerContainer",
};

/* eslint-disable import/prefer-default-export */
export const dataGridCustomizations: DataGridProComponents<Theme> &
  DataGridProComponents<Theme> = {
  MuiDataGrid: {
    styleOverrides: {
      root: ({ theme }: any) => ({
        "--DataGrid-overlayHeight": "300px",
        overflow: "clip",
        borderColor: (theme.vars || theme).palette.divider,
        backgroundColor: (theme.vars || theme).palette.background.default,
        [`& .${gridClasses.columnHeader}`]: {
          backgroundColor: (theme.vars || theme).palette.background.paper,
        },
        [`& .${gridClasses.footerContainer}`]: {
          backgroundColor: (theme.vars || theme).palette.background.paper,
        },
        [`& .${checkboxClasses.root}`]: {
          padding: theme.spacing(0.5),
          "& > svg": {
            fontSize: "1rem",
          },
        },
        [`& .${tablePaginationClasses.root}`]: {
          marginRight: theme.spacing(1),
          "& .MuiIconButton-root": {
            maxHeight: 32,
            maxWidth: 32,
            "& > svg": {
              fontSize: "1rem",
            },
          },
        },
      }),
      cell: ({ theme }: any) => ({
        borderTopColor: (theme.vars || theme).palette.divider,
      }),
      menu: ({ theme }: any) => ({
        borderRadius: theme.shape.borderRadius,
        backgroundImage: "none",
        [`& .${paperClasses.root}`]: {
          border: `1px solid ${(theme.vars || theme).palette.divider}`,
        },

        [`& .${menuItemClasses.root}`]: {
          margin: "0 4px",
        },
        [`& .${listItemIconClasses.root}`]: {
          marginRight: 0,
        },
        [`& .${listClasses.root}`]: {
          paddingLeft: 0,
          paddingRight: 0,
        },
      }),

      row: ({ theme }: any) => ({
        "&:last-of-type": {
          borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`,
        },
        "&:hover": {
          backgroundColor: (theme.vars || theme).palette.action.hover,
        },
        "&.Mui-selected": {
          background: (theme.vars || theme).palette.action.selected,
          "&:hover": {
            backgroundColor: (theme.vars || theme).palette.action.hover,
          },
        },
      }),
      iconButtonContainer: ({ theme }: any) => ({
        [`& .${iconButtonClasses.root}`]: {
          border: "none",
          backgroundColor: "transparent",
          "&:hover": {
            backgroundColor: alpha(theme.palette.action.selected, 0.3),
          },
          "&:active": {
            backgroundColor: gray[200],
          },
          ...theme.applyStyles("dark", {
            color: gray[50],
            "&:hover": {
              backgroundColor: gray[800],
            },
            "&:active": {
              backgroundColor: gray[900],
            },
          }),
        },
      }),
      menuIconButton: ({ theme }: any) => ({
        border: "none",
        backgroundColor: "transparent",
        "&:hover": {
          backgroundColor: gray[100],
        },
        "&:active": {
          backgroundColor: gray[200],
        },
        ...theme.applyStyles("dark", {
          color: gray[50],
          "&:hover": {
            backgroundColor: gray[800],
          },
          "&:active": {
            backgroundColor: gray[900],
          },
        }),
      }),
      filterForm: ({ theme }: any) => ({
        gap: theme.spacing(1),
        alignItems: "flex-end",
      }),
      columnsManagementHeader: ({ theme }: any) => ({
        paddingRight: theme.spacing(3),
        paddingLeft: theme.spacing(3),
      }),
      columnHeaderTitleContainer: {
        flexGrow: 1,
        justifyContent: "space-between",
      },
      columnHeaderDraggableContainer: { paddingRight: 2 },
    },
  },
};
