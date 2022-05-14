import { Request, Response } from "express";
import nodeCache from "node-cache";

const cache = new nodeCache();

export const verifyCache = (req: Request, res: Response, next: any) => {
  const { id } = req.params;
  if (cache.has(id)) {
    return res.status(200).json(cache.get(id));
  }
  next();
};
