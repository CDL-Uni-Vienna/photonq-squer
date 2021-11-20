import React, { useEffect, useState } from "react";
import {
  Experiment,
  ExperimentResult,
  ExperimentWithConfigs,
} from "../model/types/type.experiment";
import {
  filterSingleCircuitConfigClusterState,
  filterSingleCircuitConfigQubitComputing,
  getDefaultExperimentConfig,
} from "../model/model.experiment";
import { CircuitConfig, circuitConfigs } from "../circuitConfig/circuits4Dv004";
import { getExperiment } from "../model/model.api";

/**
 * This hook is used to get the experiment from the server.
 *
 * @param id
 */
export function useSelectedExperiment(id: string) {
  const getDefaultData = (): ExperimentWithConfigs => ({
    ...getDefaultExperimentConfig("Experiment"),
    withQubitConfig: true,
  });

  const [experimentResult, setExperimentResult] = useState<ExperimentResult>();
  const [experiment, setExperiment] = useState<ExperimentWithConfigs>(
    getDefaultData()
  );
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    const res = await getExperiment(id);
    setExperiment((prev) => ({ ...prev, ...res.experimentConfiguration }));
    setExperimentResult(res.experimentResult);
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return {
    experiment,
    experimentResult,
    setExperiment,
    isLoading,
  };
}

/**
 * This hook returns all possible configs for the preset settings section.
 * The experiment that is passed as prop is updated accordingly.
 *
 * @param experiment
 * @param setExperiment
 */
export function usePossibleClusterConfigsPresetSettings(
  experiment: ExperimentWithConfigs,
  setExperiment: React.Dispatch<React.SetStateAction<ExperimentWithConfigs>>
) {
  const [currentCircuitConfigs, setCurrentCircuitConfigs] = useState<
    CircuitConfig[]
  >([]);

  useEffect(() => {
    const filteredConfigs = circuitConfigs.filter((config) =>
      filterSingleCircuitConfigClusterState(config, experiment)
    );
    setCurrentCircuitConfigs(filteredConfigs);
    if (filteredConfigs.length) {
      setExperiment((prev) => ({ ...prev, config: filteredConfigs[0] }));
    }
  }, [
    experiment.clusterState.amountQubits,
    experiment.clusterState.presetSettings,
  ]);

  return { currentCircuitConfigs };
}

/**
 * This hook returns all possible configs for the qubit computing section.
 * The experiment that is passed as prop is updated accordingly.
 *
 * @param experiment
 * @param setExperiment
 */
export function usePossibleClusterConfigsQubitComputing(
  experiment: ExperimentWithConfigs,
  setExperiment: React.Dispatch<React.SetStateAction<ExperimentWithConfigs>>
) {
  const { currentCircuitConfigs } = usePossibleClusterConfigsPresetSettings(
    experiment,
    setExperiment
  );

  const [currentConfigs, setCurrentConfigs] = useState(currentCircuitConfigs);

  const adaptData = () => {
    const filteredConfigs = currentCircuitConfigs.filter((config) =>
      filterSingleCircuitConfigQubitComputing(config, experiment, true)
    );
    setCurrentConfigs(filteredConfigs);
    setExperiment((prev) => ({
      ...prev,
      config: filteredConfigs.find((config) =>
        filterSingleCircuitConfigQubitComputing(config, experiment, false)
      ),
    }));
  };

  useEffect(() => {
    adaptData();
  }, [currentCircuitConfigs, experiment.withQubitConfig]);

  return { currentConfigs };
}