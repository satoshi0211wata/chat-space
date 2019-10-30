# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
## userテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null:false, add_index|
|email|string|null:false|
|password|string|null:false|
|group_users_id|integer|

### Association
- has_many :group through : groups_users
- has_many :messages

## groupテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, add_index|
|groups_users_id|integer|foreign_key: true|

### Association
- has_many :user through : groups_users
- has_many :messages


## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|null:false|
|image|string|
|group_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user