import React, { useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, useSubscription, useMutation, gql } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { Container, Row, Col, FormInput, Button } from 'shards-react';

const link = new WebSocketLink({
  uri: `ws://localhost:4000/`,
  options: {
    reconnect: true
  }
});

const client = new ApolloClient({
  link,
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache()
});

const GET_MESSAGES = gql`
subscription {
  messages {
    id
    user
    content
  }
}
`;

const POST_MESSAGE = gql`
mutation ($user:String!, $content:String!) {
	postMessage(user: $user, content: $content)
}
`;

const Messages = ({ user }) => {
  const { data } = useSubscription(GET_MESSAGES);
  if (!data) {
    return null;
  }

  return (
    <>
      {data.messages.map(({ id, user: messageUser, content }) => (
        <div style={{
          display: 'flex',
          justifyContent: user === messageUser ? 'flex-end' : 'flex-start',
          padding: '1em 0',
        }}>
          {user !== messageUser && (
            <div
              style={{
                marginRight: '0.5em',
                height: 60,
                width: 60,
                border: '2px solid #C7C7C1',
                borderRadius: 30,
                textAlign: 'center',
                fontSize: '1.4em',
                paddingTop: 12
              }}
            >
              {messageUser.slice(0, 3).toUpperCase()}
            </div>
          )}
          <div
            style={{
              background: user === messageUser ? '#0DB572' : '#C7C7C1',
              color: user === messageUser ? '#fdfdfd' : '#111',
              padding: '1em',
              borderRadius: '1em',
              maxWidth: '60%',
              fontSize: '1.1em'
            }}
          >
            {content}
          </div>
        </div>
      ))}
    </>
  );
}

const Chat = () => {
  const [state, setState] = useState({
    user: 'Ripley',
    content: ''
  });

  const [postMessage] = useMutation(POST_MESSAGE);

  const onSend = () => {
    state.content.length > 0 && postMessage({ variables: state });

    setState({
      ...state,
      content: ''
    });
  };

  return (
    <Container>
      <Messages user={state.user} />
      <Row className="mb-4">
        <Col xs={2} style={{ padding: 0 }}>
          <FormInput label='User' value={state.user} onChange={e => setState({
            ...state,
            user: e.target.value
          })} />
        </Col>
        <Col xs={8}>
          <FormInput label='Content' value={state.content} onChange={e => setState({
            ...state,
            content: e.target.value
          })}
            onKeyUp={e => e.keyCode === 13 && onSend()}
          />
        </Col>
        <Col xs={2} style={{ padding: 0 }}>
          <Button onClick={() => onSend()} style={{ width: '100%' }}>Send</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default () => (
  <ApolloProvider client={client}>
    <Chat />
  </ApolloProvider>
)