# Roxanne Assistant

Roxanne is a voice assistant fully capable of interpreting human requests and processing them as intentions.

Roxanne will take her audios through her microphone and send them to the [Fonoster APIs](https://fonoster.com/) to get a pre-programmed intent.

### How to use

You just need to add the script on your website or app with the `key` provided by Fonoster.

> It is important not to remove the `id` from the script as it is used as an identity in the DOM.

```html
  <!-- Fonoster widget begin -->
  <script
    id="pf-widget"
    type="text/javascript"
    src="https://efraa.github.io/assistant/widget.js?key=1413d7-031-13bWa28"
  >
  </script>
  <!-- Fonoster widget end -->
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

#### DOM Events

Roxanne Assistant provides custom events for most widget actions. Generally,
these are loaded with data related to the event and the current state of the widget.


| Event                   | Description                                                                             |
|-------------------------|-----------------------------------------------------------------------------------------|
| `pf.widget.visibility`  | This event fires immediately when the widget is open or close.                          |
| `pf.widget.speech`      | This event fires immediately when the widget is listening or stops.                     |
| `pf.widget.waiting`     | This event fires immediately when the widget is waiting for data.                       |
| `pf.widget.greeted`     | This event fires when the user hasn't interacted with Roxanne after a while on website. |

Example:

```javascript
const widget = document.getElementById("__pf_assistant_widget__");

widget.addEventListener("pf.widget.visibility", e => console.log(e.detail));
```

#### Supported Browsers

Roxanne supports most modern browsers on mobile and desktop.

> This represents only a general part of the supported and tested browsers.

In general, any browser that supports the necessary APIs that Roxanne uses
is supported but unknown. We did a great job with polyfills to support
their majority, but this will depend on the available APIs.

| Browser                                       | Version | Supported              |
|-----------------------------------------------|---------|:----------------------:|
| Chrome                                        | 53+     | ✅                     |
| Edge                                          | 12+     | ✅                     |
| Firefox                                       | 42+     | ✅                     |
| Safari                                        | 11+     | ✅                     |
| IE                                            | ALL     | `Not supported`        |
| Opera Mini                                    | ALL     | `Not supported`        |
| Baidu Browser, Alibaba Browser, Others.       | ALL     | `Unknown`              |

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
