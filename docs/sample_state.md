### Slice of State

```js
{
  entities: {
    users: {
      id: 6,
      email: "MarioM@gmail.com",
      username: "mister mario" 
    },
    workspaces: {
      id: 3,
      name: "Nintendo Fan",
      url: "https://nintendo-fan.flack.com"
    },
    channels: {
      id: 325,
      workspace_id: 3,
      default: true,
      message_ids: [3, 4, 6, 17, 19]
    },
    messages: {
      3: {
        id: 3,
        parent_id: null,
        body: "Does anyone know where I can get some coins?",
        author_id: 6
      },
      4: {
        id: 4,
        parent_id: 3,
        body: "Have you checked in the '?' box?",
        author_id: 21
      },
      6: {
        id: 6,
        parent_id: 3,
        body: "Just checked and found some, thanks!",
        author_id: 6
      },
      17: {
        id: 17,
        parent_id: null,
        body: "@bowser where are those TPS reports?",
        author_id: 7
      },
      19: {
        id: 19,
        parent_id: null,
        body: "Anyone know where Peach went?",
        author_id: 11
      }
    }
  },
  ui: {
    loading: false
  },
  errors: {
    session: ["User with that username / password doesnt not exist"],
    user: ["Invalid username / password"],
    workspace: ["You do not have access to this Workspace"],
  },
  session: { currentUser: 6 }
}
```