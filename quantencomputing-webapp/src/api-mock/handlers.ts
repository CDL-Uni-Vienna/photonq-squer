import { rest, RestRequest } from "msw";
import { getDefaultExperimentConfig } from "../model/model.experiment";
import { Experiment } from "../model/types/type.experiment";

export const handlers = [
  rest.get("/experiment/:experimentId", (req, res, context) => {
    return res(
      context.delay(500),
      context.status(201),
      context.json({
        experimentConfiguration: getDefaultExperimentConfig("Experiment"),
        experimentResult: {
          startTime: new Date().toISOString(),
          totalCounts: 400,
          numberOfDetectors: 7,
          singlePhotonRate: 50000,
          totalTime: 2999,
        },
      })
    );
  }),
  rest.get("/experiments", (req, res, context) => {
    return res(
      context.delay(500),
      context.status(201),
      context.json([
        getDefaultExperimentConfig("A"),
        getDefaultExperimentConfig("B"),
        getDefaultExperimentConfig("C"),
      ])
    );
  }),
  rest.post("/experiment", (req: RestRequest<any>, res, context) => {
    console.warn(req);
    return res(
      context.delay(500),
      context.status(201),
      context.json({
        ...req.body,
        id: "jdfklsalfjaklsjdlflsak",
        status: "RUNNING",
      })
    );
  }),
  rest.delete("/experiment/:experimentId", (req, res, context) => {
    return res(context.delay(500), context.status(201));
  }),
  rest.post("/login", (req: RestRequest<any>, res, context) => {
    return res(
      context.delay(500),
      context.status(200),
      context.json({
        expires: new Date().toISOString(),
        token: "jdfklsjdflashdflaksj",
        id: 1,
        ...req.body,
      })
    );
  }),
];
