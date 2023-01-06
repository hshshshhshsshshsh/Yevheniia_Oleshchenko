# Yevheniia_Oleshchenko

Refer to this API: https://www.dropbox.com/developers/documentation/http/documentation

Scenario:

- Upload
- GetFileMetadata
- Delete file

Use `npm test` to launch test.

## How to get access token?

- go to https://www.dropbox.com/developers/
- sign in for an account
- create new app, go to permissions and allow files.metadata.write, files.content.write and files.content.read
- generate token in settings
- paste it into access_token property of dropbox instance
