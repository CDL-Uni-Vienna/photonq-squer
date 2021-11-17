import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { BaseProviderType } from "../model/types/type.provider";
import { CircularProgress } from "@mui/material";
import { Experiment } from "../model/types/type.experiment";
import { getExperiments } from "../model/model.api";

export interface ProjectExperimentDataProviderProps<
  P extends Array<any>,
  E extends Array<any>
> {
  projects: BaseProviderType<P>;
  experiments: BaseProviderType<E>;
}

export const ProjectExperimentDataContext = createContext<
  // TODO: REPLACING ANY WITH REAL TYPE
  ProjectExperimentDataProviderProps<any, Experiment[]>
>({
  experiments: { value: [], setValue: () => {} },
  projects: { value: [], setValue: () => {} },
});

interface Props {
  children: ReactNode;
}

export default function ProjectExperimentDataContextProvider({
  children,
}: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [experiments, setExperiments] = useState<Experiment[]>([]);

  const getData = async () => {
    const res = await getExperiments();
    setExperiments(res);
    setIsLoading(() => false);
  };

  useEffect(() => {
    getData();
  }, []);

  if (isLoading) {
    return (
      <div className={"flex justify-center items-center"}>
        <CircularProgress size={50} />
      </div>
    );
  }

  return (
    <ProjectExperimentDataContext.Provider
      value={{
        projects: { value: projects, setValue: setProjects },
        experiments: { value: experiments, setValue: setExperiments },
      }}
    >
      {children}
    </ProjectExperimentDataContext.Provider>
  );
}
