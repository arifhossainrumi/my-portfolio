export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: Rule => Rule.required(),
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required(),
    },
    {
      name: 'projectLink',
      title: 'Live Project Link',
      type: 'url',
    },
    {
      name: 'githubLink',
      title: 'GitHub Link',
      type: 'url',
    },
    {
      name: 'dashboardLink',
      title: 'Dashboard Link (Optional)',
      type: 'url',
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'toolsUsed',
      title: 'Tools Used',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'SQL', value: 'SQL' },
          { title: 'Python', value: 'Python' },
          { title: 'Power BI', value: 'Power BI' },
          { title: 'Excel', value: 'Excel' },
          { title: 'Tableau', value: 'Tableau' },
          { title: 'R', value: 'R' },
        ],
      },
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
    },
  },
};
