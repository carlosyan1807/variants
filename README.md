# [WIP] VariantComponents

![WIP](https://img.shields.io/badge/-WIP-red)
[![Vue](https://img.shields.io/npm/v/vue/next?color=41B883&label=Vue&logo=vue.js)](https://github.com/vuejs/vue-next)
[![Typescript](https://img.shields.io/badge/Typescript-informational?logo=Typescript&color=3178c6&logoColor=white)](https://github.com/microsoft/TypeScript)
[![vite](https://img.shields.io/npm/v/vite?label=Vite&color=41B883)](<(https://github.com/vitejs/vite)>)

### 💡 Original intention

The styles of all component libraries is too difficult to customize, and we have to follow the technology stack used by its respectable maintainers. Whether to integrate various pre-processor, modify the value of variables, overwrite deep styles, or consider possibility of reuse, which are very bad experience. I just want to try to implement a component library that has nothing to do with CSS technology stack. I also can learn Vue@3 and Typescript in depth through this project.

### 🚨 Possible problems:

- Components design is more complicated than before, In addition to general attributes such as binding-data and events, there will be more style attributes for layout, response, partial styles and so on. It's terrible just to name and remember them.

- Composite components are even more difficult. For example, Table component with sorter, filter and searcher functions, it needs to assign many style attributes to each of its sub-components, like `headerCell`, `headerColumn`, `bodyRow`, `bodyCell`, `sorterLabel`, `sorterLabelStyle`, `filterIconName`, `filterIconWrapperStyle` etc. Even if use imported sub-components, still need to add at least one attribute indicating the variant to this sub-component.

- Need a configuration and preview component styles operation interface, it can export JSON or other formats imported by the application.

- I feel it is complicated and difficult for my level of coding. Maybe I can only implement some basic components first.
