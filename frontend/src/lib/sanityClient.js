import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

// Client configuration
export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION,
  useCdn: true,
  perspective: 'published',
});

// Image URL builder
const builder = createImageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);

// GROQ Queries
export const queries = {
  // ✅ ১. এখানে 'email' এবং 'address' যোগ করা হয়েছে
  about: `*[_type == "about"][0]{
    name,
    role,
    profileImage,
    heroImage,
    bio,
    phone,
    email,    
    address,  
    "resume": resume.asset->url
  }`,

  skills: `*[_type == "skill"] | order(title asc){
    _id,
    title,
    logo,
    proficiency
  }`,

  projects: `*[_type == "project"] | order(_createdAt desc){
    _id,
    title,
    slug,
    mainImage,
    description,
    projectLink,
    githubLink,
    dashboardLink,
    tags[],
    toolsUsed[]
  }`,

  posts: `*[_type == "post"] | order(publishedAt desc){
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    "excerpt": body[0..2]
  }`,
  socials: `*[_type == "socialMedia"][0]{
    github,
    linkedin,
    instagram,
    facebook,
    twitter
  }`,

  certifications: `*[_type == "certification"] | order(issuedDate desc){
    _id,
    title,
    provider,
    image,
    issuedDate,
    credentialLink
  }`

};