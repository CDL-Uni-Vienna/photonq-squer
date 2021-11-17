import React, { useState } from "react";
import { CustomTableCellProps } from "./type.customTableCells";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton } from "@mui/material";
import ContextMenu from "../ContextMenu";
import { RouteComponentProps, withRouter } from "react-router";
import { AddExperimentDialogProps } from "../../../model/types/type.experiment";

enum ProjectActions {
  AddNewExperiment = "Add new Experiment",
  Run = "Run",
  Download = "Download",
  Delete = "Delete",
  Share = "Share",
}

interface ActionCellProps
  extends CustomTableCellProps<any>,
    RouteComponentProps<any> {
  setData: React.Dispatch<React.SetStateAction<any>>;
  setAddExperimentDialogProps: React.Dispatch<
    React.SetStateAction<AddExperimentDialogProps>
  >;
}

export default withRouter(function ActionCell({
  row,
  setData,
  history,
  setAddExperimentDialogProps,
}: ActionCellProps) {
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleOnClick = (
    e: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    setAnchorEl(anchorEl ? null : e.currentTarget);
    setIsContextMenuOpen((prev) => !prev);
  };

  const getBaseActions = () => {
    return [
      {
        label: ProjectActions.Run,
        action: () => {},
      },
      {
        label: ProjectActions.Download,
        action: () => {},
      },
      {
        label: ProjectActions.Delete,
        action: () => {},
      },
      {
        label: ProjectActions.Share,
        action: () => {},
      },
    ];
  };

  const getActions = () => {
    if ("projectId" in row.original) {
      return getBaseActions();
    }
    return [
      {
        label: ProjectActions.AddNewExperiment,
        action: () =>
          setAddExperimentDialogProps({ open: true, projectId: "projectId" }),
      },
      ...getBaseActions(),
    ];
  };

  return (
    <React.Fragment>
      <IconButton onClick={handleOnClick}>
        <MoreVertIcon />
      </IconButton>
      <ContextMenu
        actions={getActions()}
        isOpen={isContextMenuOpen}
        setIsOpen={setIsContextMenuOpen}
        anchorEl={anchorEl}
      />
    </React.Fragment>
  );
});
