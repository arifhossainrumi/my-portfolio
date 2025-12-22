export default {
  name: 'skill',
  title: 'Skill',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required(),
    },
    {
      name: 'proficiency',
      title: 'Proficiency (%)',
      type: 'number',
      validation: Rule => Rule.min(0).max(100),
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'logo',
    },
  },
};