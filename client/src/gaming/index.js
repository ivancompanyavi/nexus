import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const GET_GAMES = gql`
  query {
    allGames {
      edges {
        node {
          name
        }
      }
    }
  }
`

const Gaming = () => {
  const { loading, error, data } = useQuery(GET_GAMES)
  if (loading) return <p>loading...</p>
  if (error) return <p>Error...</p>
  const games = data.allGames.edges.map(e => e.node)
  return games.map(({ name }) => <div>{name}</div>)
}

export default Gaming
