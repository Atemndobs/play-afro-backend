import express from "express";
import path from "path";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import { apiBaseUrl, managerApiBaseUrl } from "./constants/config-constant";

const swaggerDocument = YAML.load(path.join(__dirname, "../swagger.yml"));
const swaggerDocumentForManager = YAML.load(
  path.join(__dirname, "../swagger-manager.yml")
);

const router = express.Router();

if (process.env.NODE_ENV !== "production") {
  router.use(
    "/api/documentation",
    (req, res, next) => {
      swaggerDocument.info.title = process.env.APP_NAME;
      swaggerDocument.servers = [
        {
          url: apiBaseUrl(),
          description: "Base url for API's",
        },
      ];
      req.swaggerDoc = swaggerDocument;
      next();
    },
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, {
      swaggerOptions: {
        persistAuthorization: true,
      },
    })
  );
}

if (process.env.NODE_ENV !== "production") {
  router.use(
    "/manager/api/documentation",
    (req, res, next) => {
      swaggerDocumentForManager.info.title = `${process.env.APP_NAME} - Manager`;
      swaggerDocumentForManager.servers = [
        {
          url: managerApiBaseUrl(),
          description: "Base url for API's",
        },
      ];
      req.swaggerDoc = swaggerDocumentForManager;
      next();
    },
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, {
      swaggerOptions: {
        persistAuthorization: true,
      },
    })
  );
}

module.exports = router;
