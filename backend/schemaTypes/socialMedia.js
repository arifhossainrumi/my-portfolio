export default {
    name: 'socialMedia',
    title: 'Social Media Links',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'Keep it simple, e.g., "My Social Links"',
            initialValue: 'My Social Links'
        },
        {
            name: 'github',
            title: 'GitHub URL',
            type: 'url',
        },
        {
            name: 'linkedin',
            title: 'LinkedIn URL',
            type: 'url',
        },
        {
            name: 'instagram',
            title: 'Instagram URL',
            type: 'url',
        },
        {
            name: 'facebook',
            title: 'Facebook URL',
            type: 'url',
        },
        {
            name: 'twitter',
            title: 'Twitter / X URL',
            type: 'url',
        }
    ]
}