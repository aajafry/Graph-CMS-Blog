import { gql, request } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

// fatch get all posts
export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          node {
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            author {
              bio
              name
              slug
              photo {
                url
              }
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const results = await request(graphqlAPI, query);

  return results.postsConnection.edges;
};

// fatch get post details
export const getPostDetails = async (slug) => {
  const query = gql`
    query getPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
        createdAt
        title
        slug
        excerpt
        featuredImage {
          url
        }
        content {
          html
        }
        author {
          name
          slug
          bio
          photo {
            url
          }
        }
        categories {
          name
          slug
        }
      }
    }
  `;

  const results = await request(graphqlAPI, query, { slug });

  return results.post;
};

// fatch get recent posts
export const getRecentPosts = async () => {
  const query = gql`
    query getPostDetails() {
      posts(orderBy: createdAt_ASC, last: 3) {
        createdAt
        title
        slug
        featuredImage {
          url
        }
      }
    }
  `;
  const results = await request(graphqlAPI, query);

  return results.posts;
};

// fatch get related posts
export const getRelatedPosts = async (categories, slug) => {
  const query = gql`
    query getPostDetails($categories: [String!], $slug: String!) {
      posts(
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
        last: 3
      ) {
        createdAt
        title
        slug
        featuredImage {
          url
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query, { categories, slug });

  return result.posts;
};

//post comment data.
export const submitComment = async (object) => {
  const result = await fetch("/api/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(object),
  });

  return result.json();
};

// fatch vget all comment data.
export const getcomments = async (slug) => {
  const query = gql`
    query getComments($slug: String!) {
      comments(where: { post: { slug: $slug } }) {
        createdAt
        name
        email
        comment
      }
    }
  `;
  const results = await request(graphqlAPI, query, { slug });

  return results.comments;
};

// fatch get all categories
export const getCategories = async () => {
  const query = gql`
    query getCategories {
      categories {
        name
        slug
      }
    }
  `;
  const results = await request(graphqlAPI, query);

  return results.categories;
};

// fatch get categories post.
export const getCategoriesPost = async (slug) => {
  const query = gql`
    query getCategoriesPost($slug: String!) {
      postsConnection(where: { categories_some: { slug: $slug } }) {
        edges {
          node {
            createdAt
            title
            slug
            excerpt
            featuredImage {
              url
            }
            author {
              name
              slug
              bio
              photo {
                url
              }
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;
  const results = await request(graphqlAPI, query, { slug });
  return results.postsConnection.edges;
};

// fatch get all authors.
export const getAuthors = async () => {
  const query = gql`
    query getAuthors {
      authors {
        name
        slug
        bio
        photo {
          url
        }
      }
    }
  `;
  const results = await request(graphqlAPI, query);

  return results.authors;
};

// fatch get authors post.
export const getAuthorsPost = async (slug) => {
  const query = gql`
    query getAuthorsPost($slug: String!) {
      postsConnection(where: { author: { slug: $slug } }) {
        edges {
          node {
            createdAt
            title
            slug
            excerpt
            featuredImage {
              url
            }
            author {
              name
              slug
              bio
              photo {
                url
              }
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;
  const results = await request(graphqlAPI, query, { slug });
  return results.postsConnection.edges;
};
