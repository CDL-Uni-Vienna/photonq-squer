import React from "react";
import PageLayout from "../components/Layout/PageLayout";
import NavbarPadding from "../components/Layout/NavbarPadding";
import ExperimentNavbar from "../components/Experiment/ExperimentNavbar";
import ExperimentEditor from "../components/Experiment/Editor/ExperimentEditor";

export default function EditorPage() {
  return (
    <div style={{ backgroundColor: "#222328" }}>
      <ExperimentNavbar />
      <PageLayout>
        <NavbarPadding />
        <ExperimentEditor />
      </PageLayout>
    </div>
  );
}
