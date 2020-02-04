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
  let component = null
  if (loading) component = <p>loading...</p>
  else if (error) component = <p>Error...</p>
  else {
    const games = data.allGames.edges.map(e => e.node)
    component = games.map(({ name }) => <div>{name}</div>)
  }

  return <>{component}</>
}

export default Gaming
