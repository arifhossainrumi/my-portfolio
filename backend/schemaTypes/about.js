export default {
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'role',
      title: 'Role',
      type: 'string',
      validation: Rule => Rule.required(),
    },

    {
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    },

    // ✅ নতুন ফিল্ড: ইমেইল
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: Rule => Rule.required().email(), // ইমেইল ভ্যালিডেশন সহ
    },
    // ✅ নতুন ফিল্ড: লোকেশন (অপশনাল, চাইলে রাখতে পারেন)
    {
      name: 'address',
      title: 'Address',
      type: 'string', // যেমন: "Dhaka, Bangladesh"
    },
    {
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required(),
    },
    {
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [{ type: 'block' }],
      validation: Rule => Rule.required(),
    },
    {
      name: 'resume',
      title: 'Resume PDF',
      type: 'file',
      options: { accept: '.pdf' },
      validation: Rule => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'profileImage',
    },
  },
};