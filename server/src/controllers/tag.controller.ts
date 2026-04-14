import { Request, Response } from 'express';
import { TagSchema } from '../domain/schemas/tag.schema';
import { TagService } from '../services/tag.service';

export class TagController {
  public tagService = new TagService();

  getAllTags = async (req: Request, res: Response) => {
    const tags = await this.tagService.getAllTags();
    res.json({ tags });
  };

  getTagById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const tag = await this.tagService.getTagById(id as string);
    res.json(tag);
  };

  createTag = async (req: Request, res: Response) => {
    TagSchema.parse(req.body);
    const tag = await this.tagService.createTag(req.body);
    res.status(201).json({ tag });
  };

  updateTag = async (req: Request, res: Response) => {
    const { id } = req.params;
    const tag = await this.tagService.updateTag(id as string, req.body);
    res.json({ tag });
  };

  deleteTag = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.tagService.deleteTag(id as string);
    res.status(200).send("Tag deleted successfully");
  };
}
