# Roxanne Assistant

Roxanne is a voice assistant fully capable of interpreting human requests and processing them as intentions.

Roxanne will take her audios through her microphone and send them to the [Fonoster APIs](https://fonoster.com/) to get a pre-programmed intent.

### Overview - How to use

You just need to add the script on your website or app with the `key` provided by Fonoster.

> It is important not to remove the `id` from the script as it is used as an identity in the DOM.

```javascript
  <script
    id="PF-widget"
    src="https://assistant.fonoster.com/widget.js?key=1413d7-031-13bWa28"
  />
```

### Technical details

| Environment       | Deployed version | Link                                       |
|-------------------|------------------|--------------------------------------------|
| Development       | v1.0.0           | [Go to](http://localhost:3080/)            |
| Staging           | v1.0.0           | [Go to](https://efraa.github.io/assistant) |
| Production        | v0.0.0           | N/A                                        |

#### Technologies stack

| Name                                | Description                                                 |
|-------------------------------------|-------------------------------------------------------------|
| [Preact](https://preactjs.com/)     | Lighter React alternative with the same modern API.         |
| [Parcel](https://v2.parceljs.org/)  | Blazing fast, zero configuration web application bundler.   |
| TypeScript                          | Types reduce bugs and increases reliability.                |

### Development

> These instructions will get you a copy of the project up and
> running on your local machine for development and testing purposes.

#### Requirements

The following tools should be installed before starting:

- Yarn package manager
- Node <=14

#### Getting Started

- Install deps `yarn install`
- Run `yarn start`
- Done!

### Contributors

- [Efra Peralta](https://github.com/Efraa)

### License

Copyright (C) 2021 by [Fonoster Inc.](https://fonoster.com/) MIT License.
