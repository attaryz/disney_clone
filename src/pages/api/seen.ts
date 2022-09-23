import { GraphQLClient } from "graphql-request"

export default async ({ body }: any, res: any) => {
  const endpoint: string = process.env.NEXT_PUBLIC_ENDPOINT as string
  const graphcms = new GraphQLClient(endpoint, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPH_CMS_TOKEN}`,
    },
  })

  await graphcms.request(
    `mutation($slug: String!){
      updateVideo(where: {slug: $slug},
      data: {seen: true}
      ){
        id,
        title,
        seen,

      }
    }
    
    `,
    { slug: body.slug }
  )

  await graphcms.request(
    `mutation publishVideo($slug: String){
      publishVideo(where:{slug: $slug}, to:PUBLISHED) {
          slug
        }
    }`,
    { slug: body.slug }
  )

  res.status(201).json({ slug: body.slug })
}
