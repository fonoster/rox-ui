# Roxanne Assistant

Roxanne is a voice assistant fully capable of interpreting human requests and processing them as intentions.

Roxanne will take her audios through her microphone and send them to the [Fonoster APIs](https://fonoster.com/) to get a pre-programmed intent.

### How to use

You just need to add the script on your website or app with the `key` provided by Fonoster.

> It is important not to remove the `id` from the script as it is used as an identity in the DOM.

```html
  <!-- Fonoster assistant begin -->
  <script
    id="rox-script"
    type="text/javascript"
    src="https://efraa.github.io/assistant/web.js?key=1413d7-031-13bWa28"
  >
  </script>
  <!-- Fonoster assistant end -->
```

### Technical details

| Environment       | Deployed version | Link                                                   |
|-------------------|------------------|--------------------------------------------------------|
| Development       | v1.0.0           | [Go to](http://localhost:3080/)                        |
| Staging           | v1.0.0           | [Go to](https://efraa.github.io/assistant) |
| Production        | v0.0.0           | N/A                                                    |

#### Technologies stack

| Name                                | Description                                                 |
|-------------------------------------|-------------------------------------------------------------|
| [Preact](https://preactjs.com/)     | Lighter React alternative with the same modern API          |
| TypeScript                          | Types reduce bugs and increases reliability                 |
| EsLint and Prettier                 | Code style enforcer                                         |
| Sass                                | CSS with superpowers                                        |
| [Parcel](https://v2.parceljs.org/)  | Bundler and development environment runner                  |
| Bash scripts                        | Used for development management                             |

### Development

> These instructions will get you a copy of the project up and
> running on your local machine for development and testing purposes.

#### Requirements

The following tools should be installed before starting:

- Yarn package manager
- Node <=14

#### Getting Started - Initial setup

```sh
yarn setup
```

> Now you can use `fonos` and `ngrok`, previously installed in the setup command.

**Fonoster credentials**

Obtain a set of credentials from here: [Github Auth.](https://github.com/login/oauth/authorize?client_id=176eada057a4bbd96736)

**Fonos login**

Login using the fonos credentials with:

```sh
fonos auth:login
```

**Google Credentials**

Update `apps/voice/google_credentials.json` with your Google TTS credentials.

**Voice Server**

Start Voice server and ngrok.

```sh
yarn start:voice
```

**Update the Fonos webhook**

Open [Ngrok Inspector](http://localhost:4040/) and use Ngrok's url to update the webhook in your Fonos number using:

```sh
# List your fonos numbers and copy the 'Ref ID'
fonos numbers:list

# Use the 'Ref ID' to update the webhook with the ngrok URL
fonos numbers:update $REF_ID
```

**Roxanne assistant - Web**

Start Web assistant in a separate console.

```sh
yarn start:web
```

**Done! ✅**

### Contributors

- [Pedro Sanders](https://github.com/psanders)
- [Efra Peralta](https://github.com/Efraa)

### License

Copyright (C) 2021 by [Fonoster Inc.](https://fonoster.com/)
