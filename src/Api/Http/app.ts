import "reflect-metadata";
import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import * as dotenv from 'dotenv';
dotenv.config();
import { router } from "./router";
import { AppError } from "@Domain/Exceptions/Shared/AppError";
import { checkDatabaseConnection } from "@Infra/Data/database";
import { Configuration } from "@Domain/Config";


export const app = express();

app.use(express.json());
app.use(router);

new Configuration();

checkDatabaseConnection();

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }
    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  },
);

