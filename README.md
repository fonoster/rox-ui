# Roxanne Assistant

Roxanne is a voice assistant fully capable of interpreting human requests and processing them as intentions.

Roxanne will take her audios through her microphone and send them to the [Fonoster APIs](https://fonoster.com/) to get a pre-programmed intent.

### Overview - How to use

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
| [Preact](https://preactjs.com/)     | Lighter React alternative with the same modern API.         |
| [Parcel](https://v2.parceljs.org/)  | Blazing fast, zero configuration web application bundler.   |
| TypeScript                          | Types reduce bugs and increases reliability.                |

#### DOM Events

Roxanne Assistant provides custom events for most widget actions. Generally, these are loaded with data related to the event and the current state of the widget.


| Event                   | Description                                                                             |
|-------------------------|-----------------------------------------------------------------------------------------|
| `pf.widget.visibility`  | This event fires immediately when the widget is open or close.                          |
| `pf.widget.listening`   | This event fires immediately when the widget is listening or stops.                     |
| `pf.widget.waiting`     | This event fires immediately when the widget is waiting for data.                       |
| `pf.widget.greeted`     | This event fires when the user hasn't interacted with Roxanne after a while on website. |

Example:

```javascript
const widget = document.getElementById("__pf_assistant_widget__");

widget.addEventListener("pf.widget.visibility", e => console.log(e.detail));
```

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


#### Notes

> ##### Patch lines
> If you encounter some lines with the following comment:
> 
>     // @patch-line
> 
> You can read the file [patch-line](.scripts/commands/patch-line) that explains the meaning of these comments.

### Contributors

- [Efra Peralta](https://github.com/Efraa)

### License

Copyright (C) 2021 by [Fonoster Inc.](https://fonoster.com/) MIT License.
