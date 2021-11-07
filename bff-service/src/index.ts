import express, { json, Request } from "express";
import cors from "cors";
import axios, { AxiosPromise, AxiosRequestConfig, Method } from "axios";
import dotenv from "dotenv";
import NodeCache from "node-cache";

dotenv.config();
const PORT = process.env.PORT ?? 8081;
const HOSTNAME = process.env.HOSTNAME ?? "http://localhost";
const EXPIRED_TIME = 60 * 2;
const PRODUCT_RECIPIENT = "products";
const GET_METHOD = "GET";
const All_PRODUCTS = "all_products";

const app = express();
app.use(cors());
app.use(json());

const cache = new NodeCache({ stdTTL: EXPIRED_TIME });

app.all("*", async (req, res) => {
  const { originalUrl, method, body } = req;
  console.log(`originalUrl: ${originalUrl}, method: ${method}, body: ${body}`);

  const [, recipient, id] = originalUrl.split("/");
  console.log({ recipient });

  const recipientURL = process.env[recipient];
  console.log({ recipientURL });

  try {
    if (!recipientURL) {
      return res.sendStatus(404);
    }

    if (recipient === PRODUCT_RECIPIENT && !id && method === GET_METHOD) {
      const cachedData = cache.get(All_PRODUCTS);
      if (cachedData) {
        console.log({ cachedData });
        return res.status(200).send(cachedData);
      }

      const { data, status } = await getDataFromAxios(req, recipientURL);
      console.log({ data });
      cache.set(All_PRODUCTS, data);

      return res.status(Number(status)).send(data);
    }

    const { data, status } = await getDataFromAxios(req, recipientURL);
    console.log({ data });

    return res.status(Number(status)).send(data);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

const getDataFromAxios = (req: Request, recipientURL: string): AxiosPromise => {
  const { originalUrl, method, body } = req;
  const axiosConfig: AxiosRequestConfig = {
    method: method as Method,
    url: `${recipientURL}${originalUrl}`,
    ...(Object.keys(body || {}).length > 0 && { data: body }),
  };
  console.log({ axiosConfig });

  return axios(axiosConfig);
};

app.listen(PORT, () => {
  console.log(`Running at ${HOSTNAME}:${PORT}`);
});
