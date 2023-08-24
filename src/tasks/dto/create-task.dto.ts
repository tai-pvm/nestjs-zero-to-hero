import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const createTaskSchema = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty()
});

export class CreateTaskDto extends createZodDto(createTaskSchema) {}
