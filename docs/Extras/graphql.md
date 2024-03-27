---
title: 'GraphQL'
---

## Schema

```graphql title="schema.graphql"
#1 Interface
interface Node {
  id: ID! # "!" -> non null
}

type Product implements Node {
  # type `Product` phải có `id` vì implements từ interface `Node`
  id: ID!
  title: String!
  vendor: String!
  description: String
}

type Collection implements Node {
  id: ID!
  # "first" là 1 arg của `products`, có `type` là "Product"; "3" là `default value`
  products(first: Int! = 3): [Product]
}

#1 GraphQL Types
#2 "Scalar Type": String, Int, Float, Boolean, ID -> can't have sub-fields like Array or Object.
# Chúng ta có thể tự khai báo Scalar Type ví dụ ntn:
scalar Episode

#2 "Object Type": Object, Interface, Union, Enum, INPUT TYPE (below)
#3 Input type: Giống với object bình thường, chỉ khác là dc dùng trong các `Operation` (ở đây ReviewInput dc dùng ở `createReview` ở dưới cùng)
input ReviewInput {
  stars: Int!
  commentary: String
}

#1 Operations: Query, Mutation, Subscription
type Query {
  # Trong Query có `node` -> Có thể dùng khi `query` - Xem file `operation.graphql` (line 13)
  node(id: ID!): Node
}
type Mutation {
  # Trong Mutation có `createReview` -> Có thể dùng khi `mutation` - Xem file `operation.graphql` (line 4)
  createReview(episode: Episode!, review: ReviewInput!): String
}
```

## Operation

```graphql title="operation.graphql"
#1 query, mutation, subscription là các `operation type`, tiếp theo là `operation name` (OPTIONAL) "createReviewForEpisode"
mutation createReviewForEpisode($ep: Episode!, $rv: ReviewInput!) {
  # operation có `createReview` trong một `mutation` -> ở schema cũng phải có `createReview` trong `type Mutation`
  createReview(episode: $ep, review: $review) {
    # Tương tự `query`, `mutation` sau khi update cũng có thể return data, ta có thể check new state sau khi update.
    stars
    commentary
  }
}

# Fragment `CollectionProducts`: Its field must available in the `Collection` type
fragment CollectionProducts on Collection {
  # fragment có thể access variable trong query dùng nó.
  # Here `first` ở fragment dc lấy từ variable `first` in the `collectionComparison` query below
  products(first: $first) {
    title
    vendor
  }
}

query collectionComparison($first: Int! = 3) {
  # Alias: Dùng khi muốn trả về nhiều field giống nhau từ nhiều `node` khác nhau
  c1: node(id: "collection-1") {
    ...CollectionProducts
  }
  c2: node(id: "collection-2") {
    ...CollectionProducts
  }
}

query getProductsFromCollection($categoryId: ID!, $first: Int = 250) {
  #1 query `node` có arg là `id`, khi ta truyền vào có thể là bất kỳ `id` nào (productId, collectionId, ...)
  node(id: $categoryId) {
    #2 query `node` trả về `Node` nên chắc chắn sẽ có id...
    id
    #3. ... và vì `Product` và `Colllection` all IMPLEMENTs `Node`
    #4. -> Dùng `inline fragment` (Relay called this `type refinement`) để trả về thêm các field khác nhau tuỳ trường hợp (Product thì trả về `title`, còn Collection thì trả về `products`).
    #5 Lý do là vì ở Collection ko có field `title` nên ko thể lấy dc, tương tự như Product ko có field `products`
    ... on Product {
      title
    }
    ... on Collection {
      products(first: $first) {
        title
      }
    }
  }
}
```

## Apollo Client

```jsx title="Apollo.jsx"
import { gql, useQuery } from '@apollo/client'

const getDogPhotoQuery = gql`
  query Dog($breed: String!) {
    dog(breed: $breed) {
      id
      displayImage
    }
  }
`

function DogPhoto({ breed }) {
  const { loading, error, data, refetch } = useQuery(getDogPhotoQuery, {
    variables: { breed },
  })

  if (loading) return null
  if (error) return `Error! ${error}`
  return (
    <>
      <button
        onClick={() =>
          refetch({
            breed: 'dalmatian', // Always refetches the query with "dalmatian" as the arg, instead of `breed` variable
          })
        }
      >
        Refetch!
      </button>
      <img src={data.dog.displayImage} />
    </>
  )
}
```
