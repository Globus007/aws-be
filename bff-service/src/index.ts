import express, { json } from "express";
import cors from "cors";
import axios, { AxiosRequestConfig, Method } from "axios";
import dotenv from "dotenv";

dotenv.config();
export const PORT = process.env.PORT ?? 8081;
export const HOSTNAME = process.env.HOSTNAME ?? "http://localhost";

const app = express();
app.use(cors());
app.use(json());
console.log(process.env.PORT);

app.all("*", async (req, res) => {
  console.log("originalUrl", req.originalUrl);
  console.log("method", req.method);
  console.log("body", req.body);

  const [, recipient] = req.originalUrl.split("/");
  console.log({ recipient });

  const recipientURL = process.env[recipient];
  console.log({ recipientURL });
  try {
    if (recipientURL) {
      const axiosConfig: AxiosRequestConfig = {
        method: req.method as Method,
        url: `${recipientURL}${req.originalUrl}`,
        ...(Object.keys(req.body || {}).length > 0 && { data: req.body }),
      };
      console.log({ axiosConfig });

      const { data, status } = await axios(axiosConfig);
      console.log({ data });

      res.status(Number(status)).send(data);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`Running at ${HOSTNAME}:${PORT}`);
});
