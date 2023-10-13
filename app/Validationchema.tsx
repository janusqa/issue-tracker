'use client';
import { z } from 'zod';

export const IssueValidationSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1),
});
