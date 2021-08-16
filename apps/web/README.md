# Roxanne Assistant - Web

Roxanne is a voice assistant fully capable of interpreting human requests and processing them as intentions.

#### DOM Events

Roxanne Assistant provides custom events for most assistant actions. Generally,
these are loaded with data related to the event and the current state of the assistant.

> To view all available events, see: [Roxanne - DOM Events](/apps/web/src/services/event-bus/EventName.ts)

Example:

```javascript
const assistant = document.getElementById("__rox_assistant__");

assistant.addEventListener("rox.assistant.start", e => console.log(e.detail));
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
