import { TALK_TITLE_MAX_LENGTH } from '@/modules/core/constants/validation';
import { z } from 'zod';

export const createArticleSchema = z.object({
  title: z
    .string()
    .min(1, 'Veuillez remplir ce champ')
    .max(TALK_TITLE_MAX_LENGTH, '300 caractères maximum'),
  content: z.string().refine(
    (value) => {
      const isEmpty =
        value.trim() === '' || value.replace(/<p><\/p>/g, '').trim() === '' || value === '<p></p>';
      return !isEmpty;
    },
    {
      message: 'Veuillez remplir ce champ',
    },
  ),
  imageUrl: z.string().url().nullable(),
  excerpt: z.string().nullable(),
  published: z.boolean().default(false),
  articleTags: z
    .array(
      z.object({
        id: z.string().cuid(),
        name: z.string(),
      }),
    )
    .max(3, 'Vous ne pouvez pas choisir plus de 3 tags'),
});

export type CreateArticleInputs = z.infer<typeof createArticleSchema>;
