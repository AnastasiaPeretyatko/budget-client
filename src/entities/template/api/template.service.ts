import { createCrudApi } from '@/shared/api';
import { BaseTemplateType, TemplateType } from '../types/template.type';

export const templateApi = {
  ...createCrudApi<TemplateType, BaseTemplateType, BaseTemplateType>('/templates'),
}
