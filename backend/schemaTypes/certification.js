export default {
    name: 'certification',
    title: 'Certifications',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Certificate Title',
            type: 'string',
        },
        {
            name: 'provider',
            title: 'Provider (e.g. Coursera, Google)',
            type: 'string',
        },
        {
            name: 'image',
            title: 'Certificate/Badge Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'issuedDate',
            title: 'Issued Date',
            type: 'date',
        },
        {
            name: 'credentialLink',
            title: 'Credential URL',
            type: 'url',
        }
    ]
}