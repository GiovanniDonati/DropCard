import z from "zod";

export const CardSchema = z.object({
  frontside: z.string(),
  backside: z.string(),
});