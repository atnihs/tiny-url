import express, { Request, Response } from "express";
import nodeCache from "node-cache";

const cache = new nodeCache();

export const verifyCache = (req: Request, res: Response, next: any) => {
  const { tiny_url } = req.params;
  if (cache.has(tiny_url)) {
    return res.status(200).json(cache.get(tiny_url));
  }
  next();
};
