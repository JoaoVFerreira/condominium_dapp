import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import { StatusCodes } from 'http-status-codes';
import { keccak256, toUtf8Bytes } from 'ethers';

export interface ITopicFileController {
  getTopicFile(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | void>
  getTopicFiles(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>
  addTopicFile(req: Request, res: Response, next: NextFunction): Promise<any>
  deleteTopicFile(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>
  deleteAllTopicFiles(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>
}

function checkTitleOrHash(hashOrTitle: string): string {
  if (!hashOrTitle) throw new Error(`The hash or title is required.`);
  const regex = /^[a-f0-9]{64}$/gi;
  if (!regex.test(hashOrTitle)) return keccak256(toUtf8Bytes(hashOrTitle));
  return hashOrTitle;
}

export class TopicFileController implements ITopicFileController {

  public async getTopicFile(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | void> {
    const hash = checkTitleOrHash(req.params.hash);
    const fileName = req.params.fileName;
    const filePath = path.resolve(__dirname, '..', '..', 'files', hash, fileName);
    if (!fs.existsSync(filePath)) return res.sendStatus(StatusCodes.NOT_FOUND);
  
    return res.download(filePath);
  }

  public async getTopicFiles(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>> {
    const hash = checkTitleOrHash(req.params.hash);
    const folder = path.resolve(__dirname, '..', '..', 'files', hash);
    if (fs.existsSync(folder)) {
      const files = fs.readdirSync(folder);
      return res.json(files);
    }
  
    return res.json([]);
  }

  public async addTopicFile(req: Request, res: Response, next: NextFunction): Promise<any> {
    const hash = checkTitleOrHash(req.params.hash);
    const file = req.file;
    if (!file) return next(new Error(`No file found`));
    const folder = path.resolve(__dirname, '..', '..', 'files');
    const oldPath = path.join(folder, file.filename);
  
    const newFolder = path.join(folder, hash);
    if (!fs.existsSync(newFolder)) fs.mkdirSync(newFolder);
  
    const newPath = path.join(newFolder, file.originalname);
    fs.renameSync(oldPath, newPath);
  
    return res.sendStatus(StatusCodes.CREATED);
  }

  public async deleteTopicFile(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>> {
    const hash = checkTitleOrHash(req.params.hash);
    const fileName = req.params.fileName;
    const filePath = path.resolve(__dirname, '..', '..', 'files', hash, fileName);
    if (!fs.existsSync(filePath)) return res.sendStatus(StatusCodes.NOT_FOUND);
    fs.unlinkSync(filePath);
    
    return res.sendStatus(StatusCodes.NO_CONTENT);
  }

  public async deleteAllTopicFiles(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>> {
    const hash = checkTitleOrHash(req.params.hash);
    const folder = path.resolve(__dirname, '..', '..', 'files', hash);
    const files = fs.readdirSync(folder);
    files.map(file => fs.unlinkSync(path.join(folder, file)));
    fs.rmdirSync(folder);

    return res.sendStatus(StatusCodes.NO_CONTENT);
  }
}
