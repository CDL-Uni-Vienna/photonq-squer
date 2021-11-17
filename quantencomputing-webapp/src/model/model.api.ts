import {
  BaseApiFetchPayload,
  GetExperimentResponse,
  Method,
  MockEndpoint,
} from "./types/type.api";
import { CreateExperimentPayload, Experiment } from "./types/type.experiment";

/**
 *
 * @param params
 * @param method
 * @param endpoint
 * @param stringifiedBody
 */
async function baseApiFetch<T>({
  params,
  method,
  endpoint,
  body,
}: BaseApiFetchPayload<T>) {
  return fetch(`${endpoint}${params ? "/" + params : ""}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method,
    body: JSON.stringify(body),
  });
}

/**
 *
 * @param id
 */
export async function getExperiment(
  id: string
): Promise<GetExperimentResponse> {
  const response = await baseApiFetch({
    method: Method.GET,
    params: id,
    endpoint: MockEndpoint.Experiment,
  });
  if (!response.ok) throw new Error("Could not get Experiment " + id);
  return response.json();
}

/**
 *
 */
export async function getExperiments(): Promise<Experiment[]> {
  const response = await baseApiFetch({
    method: Method.GET,
    endpoint: MockEndpoint.Experiments,
  });
  if (!response.ok) throw new Error("Could not get Experiments");
  return response.json();
}

/**
 *
 * @param id
 * @param newExperiment
 */
export async function updateExperiment(
  id: string,
  newExperiment: CreateExperimentPayload
): Promise<Experiment> {
  await deleteExperiment(id);
  return createExperiment(newExperiment);
}

/**
 *
 * @param id
 */
export async function deleteExperiment(id: string) {
  const response = await baseApiFetch({
    method: Method.DELETE,
    params: id,
    endpoint: MockEndpoint.Experiment,
  });
  if (!response.ok) throw new Error("Could not delete Experiment: " + id);
  return response;
}

/**
 *
 * @param experimentPayload
 */
export async function createExperiment(
  experimentPayload: CreateExperimentPayload
): Promise<Experiment> {
  const response = await baseApiFetch<CreateExperimentPayload>({
    method: Method.POST,
    endpoint: MockEndpoint.Experiment,
    body: experimentPayload,
  });
  if (!response.ok) {
    throw new Error("Could not create Experiment: " + experimentPayload);
  }
  return response.json();
}
