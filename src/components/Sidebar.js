import React, { useState } from "react";
import { List, ListItem, Divider, Collapse, Typography } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

function SidebarItem({ depthStep = 15, depth = 0, expanded, item, ...rest }) {
  const [collapsed, setCollapsed] = useState(true);
  const { label, items, Icon, onClick: onClickProp } = item;

  function toggleCollapse() {
    setCollapsed((prevValue) => !prevValue);
  }

  function onClick(e) {
    if (Array.isArray(items)) {
      toggleCollapse();
    }
    if (onClickProp) {
      onClickProp(e, item);
    }
  }

  let expandIcon;

  if (Array.isArray(items) && items.length) {
    expandIcon = !collapsed ? <ArrowDropDownIcon /> : <ArrowRightIcon />;
  }

  return (
    <>
      <ListItem
        className="sidebar-item"
        onClick={onClick}
        button={true}
        dense
        {...rest}
      >
        {expandIcon ? (
          <Typography style={{ paddingLeft: depth * depthStep}}>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                fontSize: "16px",
                fontWeight: "bold",
                color: "#05579f",
              }}
            >
              {expandIcon} {label}
            </span>
          </Typography>
        ) : (
          <Typography style={{ paddingLeft: depth * depthStep }}>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                fontSize: "14px",
                fontWeight: "bold",
                color: "#0C89CB",
              }}
            >
              {expandIcon} {label}
            </span>
          </Typography>
        )}
      </ListItem>
      <Collapse in={!collapsed} timeout="auto" unmountOnExit>
        {Array.isArray(items) ? (
          <List disablePadding dense>
            {items.map((subItem, index) => (
              <div key={`${subItem.name}${index}`}>
                {subItem === "divider" ? (
                  <Divider style={{ margin: "6px 0" }} />
                ) : (
                  <SidebarItem
                    depth={depth + 1}
                    depthStep={depthStep}
                    item={subItem}
                  />
                )}
              </div>
            ))}
          </List>
        ) : null}
      </Collapse>
    </>
  );
}

function Sidebar({ items, depthStep, depth, expanded }) {
  return (
    <div className="sidebar">
      <List disablePadding dense>
        {items.map((sidebarItem, index) => (
          <div key={`${sidebarItem.name}${index}`}>
            {sidebarItem === "divider" ? (
              <Divider style={{ margin: "6px 3px" }} />
            ) : (
              <SidebarItem
                depthStep={depthStep}
                depth={depth}
                expanded={expanded}
                item={sidebarItem}
              />
            )}
          </div>
        ))}
      </List>
    </div>
  );
}

export default Sidebar;
