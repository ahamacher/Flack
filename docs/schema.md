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

### `channels`

| column name    | data type | details                        |
|:---------------|:----------|:-------------------------------|
| `id`           | integer   | not null, primary key          |
| `user_id`      | integer   | not null, indexed, foreign key |
| `is_dm`        | boolean   | not null, default: false       |
| `default`      | boolean   | not null, default: false       |
| `created_at`   | datetime  | not null                       |
| `updated_at`   | datetime  | not null                       |

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

### `dm_joins`
| column name    | data type | details                        |
|:---------------|:----------|:-------------------------------|
| `id`           | integer   | not null, primary key          |
| `user_id`      | integer   | not null, indexed, foreign key |
| `channel_id`   | integer   | not null, indexed, foreign key |
| `created_at`   | datetime  | not null                       |
| `updated_at`   | datetime  | not null                       |

* index on `user_id`
* index on `channel_id`
* `user_id` references `users`
* `channel_id` references `channel`
* `users` to `channel` has a `many to many` relationship