### `users`

| column name      | data type | details                        |
|:-----------------|:----------|:-------------------------------|
| `id`             | integer   | not null, primary key          |
| `email`          | string    | not null, indexed, unique      |
| `username`       | string    |                                |
| `password_digest`| string    |                                |
| `session_token`  | string    | not null, indexed, unique      |
| `created_at`     | datetime  | not null                       |
| `updated_at`     | datetime  | not null                       |

* index on `email, unique: true`
* index on `session_token, unique: true`
* has_many `workspaces` relationship through `channels`

### `workspaces`

| column name        | data type | details                        |
|:-------------------|:----------|:-------------------------------|
| `id`               | integer   | not null, primary key          |
| `name`             | string    | not null                       |
| `primary_owner_id` | integer   | not null, indexed, foreign key |
| `url`              | string    | not null, indexed, unique      |
| `created_at`       | datetime  | not null                       |
| `updated_at`       | datetime  | not null                       |

* index on `email, unique: true`
* index on `primary_owner_id, unique: true`
* index on `url, unique: true`
* `primary_owner_id` references `users`
* has_many `users` relationship through `channels` 

### `channels`

| column name    | data type | details                        |
|:---------------|:----------|:-------------------------------|
| `id`           | integer   | not null, primary key          |
| `workspace_id` | integer   | not null, indexed, foreign key |
| `user_id`      | integer   | not null, indexed, foreign key |
| `default`      | boolean   | not null, default: false       |
| `created_at`   | datetime  | not null                       |
| `updated_at`   | datetime  | not null                       |

* index on `workspace_id, unique: true`
* index on `user_id, unique: true`
* `workspace_id` references `workspaces`
* `user_id` references `users`

### `messages`

| column name         | data type | details                        |
|:--------------------|:----------|:-------------------------------|
| `id`                | integer   | not null, primary key          |
| `channel_id`        | integer   | not null, indexed, foreign key |
| `parent_id`         | integer   | indexed, foreign key           |
| `author_id`         | integer   | not null, indexed, foreign key |
| `body`              | text      | not null                       |
| `created_at`        | datetime  | not null                       |
| `updated_at`        | datetime  | not null                       |

* index on `channel_id`
* index on `parent_id`
* index on `author_id`
* `author_id` references `users`
* `parent_id` references `messages`
* `channel_id` references `channel`
