import {
  CreateExperimentPayload,
  EncodedQubitMeasurement,
  Experiment,
  ExperimentState,
  ExperimentWithConfigs,
  PresetSetting,
} from "./types/type.experiment";
import { CircuitConfig, circuitConfigs } from "../circuitConfig/circuits4Dv004";

/**
 * Returns an Experiment with default configuration
 *
 * @param experimentName
 */
export function getDefaultExperimentConfig(experimentName: string): Experiment {
  return {
    createdAt: Date.now(),
    clusterState: {
      amountQubits: 3,
      presetSettings: PresetSetting.Linear,
    },
    qubitComputing: {
      circuitConfiguration: "horseshoe",
      circuitAngles: [
        {
          circuitAngleName: "alpha",
          circuitAngleValue: 0,
        },
        {
          circuitAngleName: "beta",
          circuitAngleValue: 0,
        },
      ],
    },
    encodedQubitMeasurements: [],
    circuitId: 3,
    experimentName,
    projectId: "",
    maxRuntime: 120,
    id: "615c5752d99d8706d46409f9",
    status: ExperimentState.Running,
  };
}

/**
 *
 * @param experiment
 */
export function getConfig(experiment: Experiment) {
  return circuitConfigs.find((config) => {
    return config.circuit_id === experiment.circuitId;
  });
}

/**
 *
 * @param circuitConfig
 * @param experiment
 */
export function filterSingleCircuitConfigClusterState(
  circuitConfig: CircuitConfig,
  experiment: ExperimentWithConfigs
) {
  if (
    circuitConfig.csp_number_of_qubits !== experiment.clusterState.amountQubits
  ) {
    return false;
  }
  if (
    circuitConfig.csp_preset_settings_name !==
    experiment.clusterState.presetSettings
  ) {
    return false;
  }
  return true;
}

/**
 *
 * @param circuitConfig
 * @param experiment
 * @param list
 */
export function filterSingleCircuitConfigQubitComputing(
  circuitConfig: CircuitConfig,
  experiment: ExperimentWithConfigs,
  list?: boolean
) {
  if (!experiment.withQubitConfig) {
    return true;
  }
  if (!circuitConfig.qm_circuit_model || !circuitConfig.qc_circuit_model) {
    return false;
  }
  if (!experiment.config?.qc_circuit_model || list) {
    return true;
  }
  if (
    experiment.config &&
    experiment.config.qc_encoded_onoff !== circuitConfig.qc_encoded_onoff
  ) {
    return false;
  }
  if (
    experiment.config &&
    experiment.config.qm_circuit_model === circuitConfig.qm_circuit_model
  ) {
    return false;
  }
  return true;
}

/**
 *
 * @param index
 */
export function getEmptyEncodedQubitMeasurement(
  index: number
): EncodedQubitMeasurement {
  return {
    encodedQubitIndex: index,
    phi: 0,
    theta: 0,
  };
}
